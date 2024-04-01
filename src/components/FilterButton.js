import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const FilterButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.searchBar} onPress={onPress}>
      <Text style={styles.textStyle}>Filter</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 8,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    paddingTop: 7,
    paddingBottom: 7,
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

export default FilterButton;
