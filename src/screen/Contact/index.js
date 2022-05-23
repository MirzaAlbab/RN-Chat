import {FlatList, StatusBar, StyleSheet, View, Image, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ListItem, Avatar} from '@rneui/themed';
import {SearchBar} from '@rneui/themed';
import {COLORS} from '../../helper/color';
import {FONTS} from '../../helper/font';
import database from '@react-native-firebase/database';

import uuid from 'react-native-uuid';

export default function Contact({navigation}) {
  const {User} = useSelector(state => state.login);
  const [search, setsearch] = useState('');
  const [allUser, setallUser] = useState('');
  const [allUserBackup, setallUserBackup] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    database()
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log('All User', snapshot.val());
        setallUser(
          Object.values(snapshot.val()).filter(it => it.id != User.id),
        );
        setallUserBackup(
          Object.values(snapshot.val()).filter(it => it.id != User.id),
        );
        console.log('All User set');
      });
  };
  const searchuser = val => {
    setsearch(val);
    const searchval = val.toLowerCase();
    setallUser(allUserBackup.filter(it => it.username.match(searchval)));
  };

  const createChatList = data => {
    database()
      .ref('/chatlist/' + User.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId,
            id: User.id,
            name: User.username,
            img: User.img,
            email: User.email,
            lastMsg: '',
          };
          database()
            .ref('/chatlist/' + data.id + '/' + User.id)
            .update(myData)
            .then(() => console.log('Data updated.'));

          delete data['password'];
          data.lastMsg = '';
          data.roomId = roomId;
          database()
            .ref('/chatlist/' + User.id + '/' + data.id)
            .update(data)
            .then(() => console.log('Data updated.'));

          navigation.navigate('Chat', {receiverData: data});
        } else {
          navigation.navigate('Chat', {receiverData: snapshot.val()});
        }
      });
  };
  const UserContact = ({item}) => (
    <ListItem
      onPress={() => createChatList(item)}
      bottomDivider
      containerStyle={styles.listStyle}>
      <Avatar
        source={{uri: item.img}}
        rounded
        title={item.name}
        size="medium"
      />
      <ListItem.Content>
        <ListItem.Title style={{fontFamily: FONTS.Medium, fontSize: 14}}>
          {item.email}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{fontFamily: FONTS.Regular, fontSize: 12}}
          numberOfLines={1}>
          {item.username}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <SearchBar
        lightTheme
        placeholder="Search by username..."
        onChangeText={val => searchuser(val)}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={UserContact}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    elevation: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
    opacity: 0.7,
  },
  listStyle: {paddingVertical: 7, marginVertical: 2},
});
