import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
import {ListItem, Avatar} from '@rneui/themed';
import {useSelector} from 'react-redux';
import {COLORS} from '../../helper/color';
import {FONTS} from '../../helper/font';
import DashboardHeader from '../../components/DashboardHeader';
import database from '@react-native-firebase/database';

export default function Dashboard({navigation}) {
  const {User} = useSelector(state => state.login);

  const [chatList, setchatList] = useState([]);

  useEffect(() => {
    getChatlist();
  }, []);

  const getChatlist = async () => {
    database()
      .ref('/chatlist/' + User?.id)
      .on('value', snapshot => {
        // console.log('User data: ', Object.values(snapshot.val()));
        if (snapshot.val() != null) {
          setchatList(Object.values(snapshot.val()));
        }
      });
  };

  const renderItem = ({item}) => (
    <ListItem
      containerStyle={{paddingVertical: 8, marginVertical: 0}}
      onPress={() => navigation.navigate('Chat', {data: item})}>
      <Avatar
        source={{uri: item.img}}
        rounded
        // title={item.name.charAt(0)}
        size="medium"
      />
      <ListItem.Content>
        <ListItem.Title style={{fontFamily: FONTS.Medium, fontSize: 14}}>
          {item.username ?? item.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{fontFamily: FONTS.Regular, fontSize: 12}}
          numberOfLines={1}>
          {item.lastMsg}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <DashboardHeader />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={chatList}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.but}
        onPress={() => navigation.navigate('Contact')}>
        <MaterialCommunityIcons
          name="chat-plus"
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
