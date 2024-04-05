

import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLogin = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing login token:', error);
    // Handle error if necessary
  }
};
const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving login token:', error);
    return null;
  }
};
const storeUserId = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing login token:', error);
    // Handle error if necessary
  }
};

const getUserId = async () => {
  try {
    const token = await AsyncStorage.getItem('UserId');
    return token;
  } catch (error) {
    console.error('Error retrieving login token:', error);
    return null;
  }
};

const Local = {
  storeLogin,
  getStoredToken,
  storeUserId,
  getUserId
};

export default Local;