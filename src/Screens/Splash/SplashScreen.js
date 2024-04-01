import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Colors from '../../Theme/Colors';
import {height, width} from '../../Theme/Constants';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen'); // Replace 'LoginScreen' with the actual name of your login screen
    }, 2000); // Adjust the time (in milliseconds) as needed

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/png/SplashPNGG.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  image: {
    resizeMode: 'cover',
    height: height * 0.12,
    width: width * 0.32,
  },
});

export default SplashScreen;
