import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRoute from './MainRoute';
import {navigationRef} from '../helper/navigate';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

const Root = () => {
  return (
    <InternetConnectionAlert
      onChange={connectionState => {
        console.log('Connection State: ', connectionState);
      }}
      title="Internet Terputus"
      message="Periksa koneksi internet anda">
      <NavigationContainer ref={navigationRef}>
        <MainRoute />
      </NavigationContainer>
    </InternetConnectionAlert>
  );
};

export default Root;
