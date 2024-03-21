import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Colors from '../Theme/Colors';
import OrdersFSVG from '../assets/svg/OrdersFSVG';
import OrdersTSVG from '../assets/svg/OrdersTSVG';
import ShopsFSVG from '../assets/svg/ShopsFSVG';
import ShopsTSVG from '../assets/svg/ShopsTSVG';

import ItemsFSVG from '../assets/svg/ItemsFSVG';
import ItemsTSVG from '../assets/svg/ItemsTSVG';

import UserFSVG from '../assets/svg/UserFSVG';
import UserTSVG from '../assets/svg/UserTSVG';

import ReelsTSVG from '../assets/svg/ReelsTSVG';
import ReelsFSVG from '../assets/svg/ReelsFSVG';
import Reels from '../Screens/Reels/ReelScreen';
import ShopsScreen from '../Screens/Shops/ShopsScreen';
import ItemsScreen from '../Screens/Items/ItemsScreen';
import UserScreen from '../Screens/User/UserScreen';
import {Image} from 'react-native';
import images from '../assets/Images';
import {height, width} from '../Theme/Constants';

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
          // tabBarLabel: '',
          tabBarStyle: {paddingVertical: 10},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => {
              if (focused) {
                // return <OrdersFSVG height={30} width={30} />;
                return (
                  <Image
                    source={images.ordersSelected}
                    style={{height: height * 0.04, width: width * 0.067}}
                  />
                );
              }
              return <OrdersFSVG height={30} width={30} />;
            },
            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="shops"
          component={ShopsScreen}
          options={{
            title: 'Shops',
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              if (focused) {
                // return <ShopsFSVG height={30} width={30} color={color} />;
                return (
                  <Image
                    source={images.shopSelected}
                    style={{height: height * 0.04, width: width * 0.067}}
                  />
                );
              }
              return <ShopsFSVG height={30} width={30} color={color} />;
            },

            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="items"
          component={ItemsScreen}
          options={{
            title: 'Items',
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              if (focused) {
                // return <ItemsFSVG height={30} width={30} color={color} />;
                return (
                  <Image
                    source={images.itemSelected}
                    style={{height: height * 0.04, width: width * 0.067}}
                  />
                );
              }
              return <ItemsFSVG height={30} width={30} color={color} />;
            },

            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="user"
          component={UserScreen}
          options={{
            title: 'User',
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              if (focused) {
                // return <UserFSVG height={30} width={30} color={color} />;
                return (
                  <Image
                    source={images.accountSelected}
                    style={{height: height * 0.04, width: width * 0.067}}
                  />
                );
              }
              return <UserFSVG height={30} width={30} color={color} />;
            },

            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
          }}
        />
        {/* <Tab.Screen
          name="Reels"
          component={Reels}
          options={{
            title: 'Reels',
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              if (focused) {
                return <ReelsTSVG height={30} width={30} color={color} />;
              }
              return <ReelsFSVG height={30} width={30} color={color} />;
            },

            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
          }}
        /> */}
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;
