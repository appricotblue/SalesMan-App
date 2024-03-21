import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {height, width} from '../Theme/Constants';

const HomeScreenSelectable = ({containerStyle, title}) => {
  return (
    <TouchableOpacity style={[styles.searchBar, containerStyle]}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: height * 0.045,
    minWidth: width * 0.26,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    paddingHorizontal: 12,
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
