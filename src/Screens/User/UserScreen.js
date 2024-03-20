import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const UserScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Items Screen</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA860',
  },
  text: {
    color: 'black',
  },
});

export default UserScreen;
