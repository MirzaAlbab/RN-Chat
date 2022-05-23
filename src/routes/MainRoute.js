import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BottomTabs from './BottomTabs';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Maps from '../screen/Maps';
import Chat from '../screen/Chat';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();

export default function MainRoute() {
  const {user} = useSelector(state => state.login);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="Chat" component={Chat} />

      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  );
}
