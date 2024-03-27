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
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.inputStyle}
        onChangeText={text => onChangeText(text)}
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
});

export default CustomTextInput;
