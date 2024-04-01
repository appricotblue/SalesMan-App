import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import TextInputBox from '../../components/TextiputBox';
import CommonButton from '../../components/CommonButton';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setName, setDarkmode } from '../../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import local from '../../Storage/Local';
import images from '../../assets/Images';
import { height, width } from '../../Theme/Constants';
import Header from '../../components/Header';
import CustomSearch from '../../components/CustomSearch';

var windowWidth = Dimensions.get('window').width; //full width
var windowHeight = Dimensions.get('window').height; //full height

const LoginScreen = props => {
  const navigation = useNavigation();
  const [email, changeemail] = useState('jasna@aindria.com');
  const [checkEmail, changecheckEmail] = useState('');
  const [checkPassword, changecheckPassword] = useState('');
  const [password, changepassword] = useState('1234567');
  const [isLogin, changeIsLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isValidate = async () => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      changecheckEmail('Please enter Email id');
    } else if (!emailFormat.test(email)) {
      changecheckEmail('Please enter a valid email address');
    } else if (password == '') {
      changecheckPassword('Please enter password');
    } else if (password?.length < 6) {
      changecheckPassword('Password must be at least 6 characters long');
    } else {
      navigation.replace('home');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoview}>
        <Image source={images.Logo} style={styles.image} />
      </View>
      <Text style={styles.logotext}>LOGIN</Text>
      <TextInputBox
        value={email}
        errorText={checkEmail}
        onChangeText={text => {
          changeemail(text);
          changecheckEmail('');
        }}
        placeholder={'User Name'}
        width={width * 0.8}
        title={'Email ID'}
      />
      <TextInputBox
        value={password}
        errorText={checkPassword}
        onChangeText={text => {
          changepassword(text);
          changecheckPassword('');
        }}
        placeholder={'Password'}
        width={width * 0.8}
        title={'Password'}
      />
      <CommonButton
        onPress={() => isValidate()}
        // onPress={() => navigation.replace('Home')}
        color={'#003451'}
        title={'Login'}
        width={width * 0.8}
        texttitle={'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

    alignItems: 'center',
  },
  image: {
    width: width * 0.42,
    height: height * 0.12,
  },
  logoview: {
    width: width * 0.5,
    marginTop: 100,
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  TileTxt: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    paddingBottom: 5,
  },
  logotext: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  subTxt: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    width: width,
    fontFamily: 'Jost',
    fontWeight: '300',
    alignSelf: 'center',
  },
});
export default LoginScreen;
