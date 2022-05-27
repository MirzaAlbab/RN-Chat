import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';
import MsgComponent from '../../components/MsgComponent';
import SimpleToast from 'react-native-simple-toast';
import {COLORS} from '../../helper/color';
import ChatHeader from '../../components/ChatHeader';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

export default function Chat(props) {
  const {User} = useSelector(state => state.login);
  const {data} = props.route.params;

  const [msg, setMsg] = useState('');
  const [disabled, setdisabled] = useState(false);
  const [allChat, setallChat] = useState([]);

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + data.roomId)
      .on('child_added', snapshot => {
        setallChat(state => [snapshot.val(), ...state]);
      });

    return () =>
      database()
        .ref('/messages' + data.roomId)
        .off('child_added', onChildAdd);
  }, [data.roomId]);

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

  const sendMsg = () => {
    if (msg == '' || msgvalid(msg) == 0) {
      SimpleToast.show('Enter something....');
      return false;
    }
    setdisabled(true);
    let msgData = {
      roomId: data.roomId,
      message: msg,
      from: User?.id,
      to: data.id,
      sendTime: moment().format(''),
      msgType: 'text',
    };

    const newReference = database()
      .ref('/messages/' + data.roomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      database()
        .ref('/chatlist/' + data?.id + '/' + User?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));
      // console.log("'/chatlist/' + User?.id + '/' + data?.id", data);
      database()
        .ref('/chatlist/' + User?.id + '/' + data?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));

      setMsg('');
      setdisabled(false);
    });
  };

  return (
    <View style={styles.container}>
      <ChatHeader data={data} />
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/originals/79/5c/ab/795cabc4647f73b365e2e6eabd0f34dc.png',
        }}
        style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return <MsgComponent sender={item.from == User.id} item={item} />;
          }}
        />
      </ImageBackground>

      <View
        style={{
          backgroundColor: COLORS.theme,
          elevation: 5,
          // height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 7,
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          style={{
            backgroundColor: COLORS.white,
            width: '80%',
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: COLORS.white,
            paddingHorizontal: 15,
            color: COLORS.black,
          }}
          placeholder="type a message"
          placeholderTextColor={COLORS.black}
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />

        <TouchableOpacity disabled={disabled} onPress={sendMsg}>
          <Ionicon name="ios-send" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
