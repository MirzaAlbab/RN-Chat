import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../helper/color';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});

export default TimeDelivery;
