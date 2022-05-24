//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../helper/color';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const TimeDelivery = props => {
  const {sender, item} = props;
  return (
    <View
      style={[
        styles.mainView,
        {
          justifyContent: 'flex-end',
          flexDirection: 'row',
        },
      ]}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 7,
          color: sender ? COLORS.white : COLORS.black,
        }}>
        {item.time}
        {moment(item.send_time).format('LLL')}
      </Text>

      <Ionicons
        style={{
          marginHorizontal: 10,
          color: sender ? COLORS.white : COLORS.black,
        }}
        name="checkmark-done"
        size={12}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});

//make this component available to the app
export default TimeDelivery;
