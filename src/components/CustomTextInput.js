import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {height, width} from '../Theme/Constants';

function CustomTextInput({
  onChangeText,
  value,
  placeholder,
  keyboardType,
  placeholderTextColor,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.06,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: width * 0.8,
    height: height * 0.05,
    // backgroundColor: 'pink',
    color: 'black',
  },
});

export default CustomTextInput;
