import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/Login/LoginScreen';
import SplashScreen from '../Screens/Splash/SplashScreen';
import HomeStack from './HomeStack';

const Stack = createStackNavigator();

const Authstack = () => {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeftLabelVisible: false,
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name="splash"
        options={{headerShown: false}}
        component={SplashScreen}
      />

      <Stack.Screen
        name="LoginScreen"
        options={{headerShown: false}}
        component={LoginScreen}
      />

      <Stack.Screen
        name="home"
        options={{headerShown: false}}
        component={HomeStack}
      />
    </Stack.Navigator>
  );
};

export default Authstack;
