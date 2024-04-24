import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import images from './../assets/Images';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const CustomSearch = ({value, onChangeText, onClear, placeholder,onSubmit}) => {
  return (
    <View style={styles.searchBar}>
      <Image
        source={images.GraySearch}
        style={{height: 20, width: 20, marginLeft: 10}}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}></TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 8,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    height: height * 0.05,
  },
  input: {
    flex: 1,
    padding: 4,
    color: 'black',
  },
});

export default CustomSearch;
