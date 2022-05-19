import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import React from 'react';
import Home from '../screen/Home';
import QRCode from '../screen/QRCode';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 2,
          backgroundColor: '#fff',
          borderRadius: 25,
          height: 60,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return <Feather name="home" size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="QR"
        component={QRCode}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={40}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
