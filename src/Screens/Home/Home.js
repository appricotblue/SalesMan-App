import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

const Home = ({navigation: {navigate}}) => {
  const OnHomePress = () => {
    navigate('cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => OnHomePress()}>
        <Text style={styles.text}>Home Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFDB71',
  },
  text: {
    color: 'black',
  },
});

export default Home;
