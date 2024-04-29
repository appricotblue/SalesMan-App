import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { height } from '../Theme/Constants';

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
  isRequired = false
}) {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectOption = shop => {
    onSelect(shop);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
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
        <ScrollView style={styles.optionsContainer}>
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
    minHeight: height * 0.2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
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
