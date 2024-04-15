import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { height, width } from '../Theme/Constants';

function CustomSelectionBox({
  title,
  onChangeText,
  value,
  placeholder,
  keyboardType,
  placeholderTextColor,
  onSelect,
  options,
  displayProperty
}) {
  const [showOptions, setShowOptions] = useState(false);

  // const handleSelectOption = option => {
  //   console.log(option, 'selectiom')
  //   onSelect(option);
  //   setShowOptions(false);
  //   console.log(option,'==========')
  // };
  // const handleSelectOption = option => {
  //   console.log(option, 'selectiom')
  //   onSelect(option); // Pass the entire shop object
  //   setShowOptions(false);
  //   console.log(option,'==========')
  // };


  const handleSelectOption = shop => {
    onSelect(shop); // Pass the entire shop object to onSelect
    setShowOptions(false);
    console.log(shop, '==========')
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowOptions(!showOptions)}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderTextColor}
          editable={false}
        />
        <Text style={styles.dropdownIcon}>{showOptions ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
            {options.map(shop => (
            <TouchableOpacity
              key={shop?.id}
              style={styles.option}
              onPress={() => handleSelectOption(shop)}>
              <Text>{shop[displayProperty]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputStyle: {
    flex: 1,
    height: height * 0.05,
    color:'black'
   
  },
  dropdownIcon: {
    fontSize: 16,
    marginLeft: 5,
    color:'black'
  },
  optionsContainer: {
    position: 'absolute',
    top: height * 0.1,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    maxHeight: height * 0.3,
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    backgroundColor:'pink',

  },
  optionText:{
    fontSize:20,
    color:'black',

  }
});

export default CustomSelectionBox;
