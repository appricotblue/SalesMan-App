import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Colors from '../Theme/Colors';
import HomeFSVG from '../assets/svg/HomeFSVG';
import HomeTSVG from '../assets/svg/HomeTSVG';
import ReelsTSVG from '../assets/svg/ReelsTSVG';
import ReelsFSVG from '../assets/svg/ReelsFSVG';
import Reels from '../Screens/Reels/ReelScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: Colors.primary,
          tabBarActiveBackgroundColor: Colors.white,
          tabBarInactiveBackgroundColor: Colors.white,
          tabBarLabel: '',
          tabBarStyle: {paddingVertical: 12},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              if (focused) {
                return <HomeTSVG height={40} width={40} color={color} />;
              }
              return <HomeFSVG height={40} width={40} color={color} />;
            },
            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="Reels"
          component={Reels}
          options={{
            title: 'Reels',
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              if (focused) {
                return <ReelsTSVG height={40} width={40} color={color} />;
              }
              return <ReelsFSVG height={40} width={40} color={color} />;
            },

            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;
