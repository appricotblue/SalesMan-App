import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Colors from '../../Theme/Colors';
import {height, width} from '../../Theme/Constants';
import Local from '../../Storage/Local';

const SplashScreen = ({navigation}) => {

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace('LoginScreen'); // Replace 'LoginScreen' with the actual name of your login screen
  //   }, 2000); // Adjust the time (in milliseconds) as needed

  //   return () => clearTimeout(timer);
  // }, [navigation]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await Local.getStoredToken();
        const delay = 2000; // Delay in milliseconds
        console.log(token, 'token kitiyo ?')
        setTimeout(() => {
          if (token) {
            navigation.replace('home');
          } else {
            navigation.replace('LoginScreen');
          }
        }, delay);
      } catch (error) {
        console.error('Error checking token:', error);
        navigation.replace('LoginScreen');
      }
    };

    checkToken();
  }, []);

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
    width: 200,
    height: 150,
    // height: height * 0.15,
    // width: width * 0.32,
  },
});

export default SplashScreen;
