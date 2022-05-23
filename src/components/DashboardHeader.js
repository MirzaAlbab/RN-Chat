import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from '@rneui/themed';
import React from 'react';
import {useSelector} from 'react-redux';
import {COLORS} from '../helper/color';
import {FONTS} from '../helper/font';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DashboardHeader() {
  const {User} = useSelector(state => state.login);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white,
        elevation: 2,
        paddingVertical: 15,
      }}>
      <Text style={styles.logo}>Chat App</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          style={{marginRight: 8}}
          name="ios-notifications"
          size={24}
          color={COLORS.theme}
        />

        <Avatar source={{uri: User.img}} rounded size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: FONTS.Bold,
    color: COLORS.theme,
    fontSize: 22,
  },
});
