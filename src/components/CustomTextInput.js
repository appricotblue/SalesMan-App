import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { height, width } from '../Theme/Constants';

function CustomTextInput({
  title,
  onChangeText,
  value,
  placeholder,
  keyboardType,
  placeholderTextColor,
  errorText,
  multiline
}) {
  return (
    <View style={[styles.container,   {
      minHeight: multiline
        ? height / 6
        : height / 28,
      justifyContent: multiline ? 'flex-start' : 'center',
    },]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.inputStyle,  errorText != '' && styles.errorInput,
        {
          minHeight: multiline
            ? height / 8
            : height / 28,
          justifyContent: multiline ? 'flex-start' : 'center',
        },]}
        onChangeText={text => onChangeText(text)}
        value={value}
        // placeholder={placeholder}
        keyboardType={keyboardType}
        // placeholderTextColor={placeholderTextColor}
        placeholderTextColor={errorText == '' ? 'gray' : '#ff6666'}
        placeholder={
          errorText != '' ? errorText : placeholder
        }
      />
       {errorText != '' && value != '' ? (
            <Text style={{top: 5, left: 10, color: '#ff6666'}}>
              * {errorText}
            </Text>
          ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputStyle: {
    height: height * 0.06,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // Add any other styles you need for the input
  },
  errorInput: {
    shadowColor: 'trasnparant',
    borderWidth: 1,
    borderColor: '#ff6666',
  },
});

export default CustomTextInput;
