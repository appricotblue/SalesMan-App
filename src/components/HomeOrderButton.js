import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {height, width} from '../Theme/Constants';
import PlusSVG from '../assets/svg/PlusSVG';

const HomeOrderButton = () => {
  return (
    <TouchableOpacity style={[styles.searchBar]}>
      <PlusSVG />
      <Text style={styles.textStyle}>{'New Orders'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: height * 0.065,
    width: width * 0.45,
    borderRadius: 10,
    backgroundColor: '#005A8D',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    padding: 4,
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeOrderButton;
