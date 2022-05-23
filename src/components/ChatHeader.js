//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, StatusBar, Platform} from 'react-native';
import {COLORS} from '../helper/color';
import {FONTS} from '../helper/font';
import {Avatar} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const ChatHeader = (props, {navigation}) => {
  const {data} = props;
  // console.log("cht saa",data);

  const [lastSeen, setlastSeen] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.theme}
        translucent={false}
      />
      <Ionicons
        style={{marginRight: 8}}
        name="arrow-back"
        size={24}
        color={COLORS.theme}
        onPress={() => navigation.goBack()}
      />
      <Avatar source={{uri: data.avatar_url}} rounded size="small" />

      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.white,
            fontSize: 16,
            fontFamily: FONTS.SemiBold,
            textTransform: 'capitalize',
          }}>
          {data.name}
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

      {/* <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.themeColor
                }}
                name="videocam-outline"
                type="Ionicons"
            /> */}
    </View>
  );
};

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
