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
  multiline,
  inputwidth = width * 0.9,
  isRequired = false
}) {
  return (
    <View style={[styles.container,   {
      minHeight: multiline
        ? height / 6
        : height / 28,
      justifyContent: multiline ? 'flex-start' : 'center',
    },]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {isRequired && <Text style={styles.requiredText}>*</Text>}
      </View>

      <TextInput
        style={[styles.inputStyle, { width: inputwidth }, errorText != '' && styles.errorInput,
        {
          minHeight: multiline
            ? height / 8
            : height / 28,
          color: 'black',
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
    color:'black'
  },
  inputStyle: {
    height: height * 0.05,

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
  requiredText: {
    color: 'red',
    marginLeft: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default CustomTextInput;
