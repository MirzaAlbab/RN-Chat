//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  SectionList,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MsgComponent from '../../components/MsgComponent';
import {COLORS} from '../../helper/color';
import ChatHeader from '../../components/ChatHeader';

const Data = [
  {
    massage: 'Yes Ofcourse..',
    type: 'sender',
  },
  {
    massage: 'How are You ?',
    type: 'sender',
  },
  {
    massage: 'How Your Opinion about the one done app ?',
    type: 'sender',
  },
  {
    massage:
      'Well i am not satisfied with this design plzz make design better ',
    type: 'receiver',
  },
  {
    massage: 'could you plz change the design...',
    type: 'receiver',
  },
  {
    massage: 'How are You ?',
    type: 'sender',
  },
  {
    massage: 'How Your Opinion about the one done app ?',
    type: 'sender',
  },
  {
    massage:
      'Well i am not satisfied with this design plzz make design better ',
    type: 'receiver',
  },
  {
    massage: 'could you plz change the design...',
    type: 'receiver',
  },
  {
    massage: 'How are You ?',
    type: 'sender',
  },
  {
    massage: 'How Your Opinion about the one done app ?',
    type: 'sender',
  },
];

export default function Chat({props}) {
  console.log('props', props);
  const {data} = props.route.params;

  // console.log("token",token)

  const [msg, setMsg] = React.useState('');
  const [update, setupdate] = React.useState(false);
  const [disabled, setdisabled] = React.useState(false);
  const [allChat, setallChat] = React.useState([]);

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
          data={Data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return (
              <MsgComponent
                sender={item.type == 'sender'}
                massage={item.message}
                item={item}
              />
            );
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

        <TouchableOpacity
          disabled={disabled}
          //    onPress={sendMsg}
        >
          <Icon
            style={{
              // marginHorizontal: 15,
              color: COLORS.white,
            }}
            name="paper-plane-sharp"
            type="Ionicons"
          />
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
