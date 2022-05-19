import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import TouchID from 'react-native-touch-id';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TouchAuth({navigation}) {
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  const testHandler = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          Alert.alert('FaceID is supported.');
        } else if (biometryType === 'TouchID') {
          Alert.alert('TouchID is supported.');
        } else if (biometryType === true) {
          Alert.alert('TouchID is supported.');
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };

  const pressHandler = () => {
    TouchID.authenticate(
      'Scan your fingerprint to get access',
      optionalConfigObject,
    )
      .then(success => {
        // Success code
        navigation.navigate('Main');
      })
      .catch(error => {
        // Failure code
      });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          pressHandler();
        }}
        style={{
          marginTop: 50,
          backgroundColor: '#FFB600',
          width: 50,
          borderRadius: 10,
        }}>
        <MaterialIcons name="fingerprint" size={50} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
