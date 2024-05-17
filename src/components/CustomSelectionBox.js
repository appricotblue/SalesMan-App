import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
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
  displayProperty,
  isRequired = false,
  inputwidth = width * 0.9,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const scrollViewRef = useRef();

  // UseEffect to scroll to the selected option if it's not in the view
  useEffect(() => {
    if (showOptions && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }, 200);
    }
  }, [showOptions]);

  const handleSelectOption = shop => {
    onSelect(shop);
    setShowOptions(false);
  };

  return (
    <View style={[styles.container, { width: inputwidth }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {isRequired && <Text style={styles.requiredText}>*</Text>}
      </View>

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
        <ScrollView
          ref={scrollViewRef}
          style={styles.optionsContainer}
          contentContainerStyle={styles.optionsContent}>
          {options.map(shop => (
            <TouchableOpacity
              key={shop?.id}
              style={styles.option}
              onPress={() => handleSelectOption(shop)}>
              <Text style={{ color: 'black' }}>{shop[displayProperty]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputStyle: {
    flex: 1,
    height: height * 0.05,
    color: 'black',
  },
  dropdownIcon: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black',
  },
  optionsContainer: {
    maxHeight: height * 0.3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    zIndex: 1, // Ensure the dropdown appears above other elements
    position: 'absolute', // Position the dropdown absolutely
    width: '100%', // Make the dropdown take full width
    marginTop: Platform.OS === 'ios' ? 35 : 0, // Adjust marginTop based on platform
  },
  optionsContent: {
    flexGrow: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    backgroundColor: 'pink',
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

export default CustomSelectionBox;
