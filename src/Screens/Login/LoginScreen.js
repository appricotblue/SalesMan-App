import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';

const LoginScreen = ({navigation: {navigate}}) => {
  const [email, setEmail] = useState('');

  const OnLoginPress = () => {
    navigate('home');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => OnLoginPress()}>
        <Text style={{color: 'black'}}>Login Screen</Text>
      </TouchableOpacity>
      {/* <CustomTextInput
        onChangeText={value => {
          setEmail(value);
        }}
        value={email}
        keyboardType="email-address"
        placeholderTextColor={'black'}
        placeholder={'Email'}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoginScreen;
