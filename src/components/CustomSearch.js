import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import images from './../assets/Images';

const CustomSearch = ({ value, onChangeText, onClear }) => {
  return (
    <View style={styles.searchBar}>
      <Image source={images.GraySearch} style={{ height: 30, width: 30, marginLeft: 10 }} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          {/* <Image source={images.Cross} style={{ height: 30, width: 30, marginLeft: 10 }} /> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth:1,
    borderColor:'grey'
  },
  input: {
    flex: 1,
    padding: 10,
  },
});

export default CustomSearch;
