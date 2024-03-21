import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import images from '../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {width} from '../Theme/Constants';

const Header = ({title, isBackArrow, isNotification}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row'}}>
        {isBackArrow ? (
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.goBack()}>
            <Image source={images.ArrowLeft} style={styles.arrowStyle} />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.titleStyle}>{title}</Text>
      </View>

      {isNotification ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.iconStyle}
            // onPress={() => navigation.navigate('')}
          >
            <Image
              style={{width: 18, height: 23, marginHorizontal: 10}}
              source={images.Notification}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#003451',
    width: width * 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowStyle: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  titleStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconStyle: {
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
