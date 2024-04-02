import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {height, width} from '../Theme/Constants';

const HomeScreenSelectable = ({containerStyle, isSelected,title, onPress, selectedBorderColor = 'blue',
selectedBackgroundColor = 'lightblue',
selectedTextColor = 'black',}) => {

 

 
  
  
  return (
    <TouchableOpacity
      style={[
        styles.searchBar,
        containerStyle,
        isSelected && {
          borderColor: selectedBorderColor,
          backgroundColor: selectedBackgroundColor,
        },
      ]}
      onPress={()=>onPress()}>
      <Text
        style={[
          styles.textStyle,
          isSelected && { color: selectedTextColor },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: height * 0.045,
    minWidth: width * 0.4,
    // borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
    paddingHorizontal: 12,
    // borderStyle: 'dashed',
  
  },
  input: {
    flex: 1,
    padding: 4,
  },
  textStyle: {
    fontSize: 16,
    color: 'grey',
  },
});

export default HomeScreenSelectable;
