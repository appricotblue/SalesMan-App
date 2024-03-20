import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Local = () => {
  const storeLogin = async value => {
    try {
      await AsyncStorage.setItem('isLogin', value);
    } catch (e) {
      // saving error
    }
  };
};
const local = new Local();
export default local;
