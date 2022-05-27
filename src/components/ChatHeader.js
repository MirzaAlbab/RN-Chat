//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar, Platform} from 'react-native';
import {COLORS} from '../helper/color';
import {FONTS} from '../helper/font';
import {Avatar} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigate} from '../helper/navigate';
import SimpleToast from 'react-native-simple-toast';
// create a component
const ChatHeader = props => {
  const {data} = props;
  // console.log('ini data header', data);
  // console.log('ini data header', data);

  const [lastSeen, setlastSeen] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.theme}
        translucent={false}
      />
      <Ionicons
        style={{marginLeft: 5, marginRight: 5}}
        name="arrow-back"
        size={24}
        color={COLORS.white}
        onPress={() => navigate('Dashboard')}
      />
      <Avatar source={{uri: data.img}} rounded size="small" />

      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.white,
            fontSize: 16,
            fontFamily: FONTS.SemiBold,
            textTransform: 'capitalize',
          }}>
          {data.username}
        </Text>

        {/* <Text
          style={{
            color: COLORS.primaryBackground,
            fontSize: 10,
            fontFamily: FONTS.Regular,
          }}>
          {lastSeen}
        </Text> */}
      </View>
      <Ionicons
        style={{marginRight: 10}}
        name="videocam"
        size={24}
        color={COLORS.white}
        onPress={() => SimpleToast.show('Coming Soon')}
      />
      <Ionicons
        style={{marginRight: 10}}
        name="md-call-sharp"
        size={22}
        color={COLORS.white}
        onPress={() => SimpleToast.show('Coming Soon')}
      />
      <Ionicons
        style={{marginRight: 15}}
        name="information-circle-outline"
        size={24}
        color={COLORS.white}
        onPress={() => SimpleToast.show('Coming Soon')}
      />
    </View>
  );
};

export default ChatHeader;

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: COLORS.theme,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
