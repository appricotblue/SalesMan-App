import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const CommonButton = props => {
  const buttonColors = props?.color ? props?.color : ['blue'];
  return (
    <TouchableOpacity
      style={[styles.saveButton, {backgroundColor: props?.color,width: props?.width}]}
      onPress={() => props?.onPress()}>
        {/* <LinearGradient   start={{x: 0, y: 0.5}} 
        end={{x: 1, y: 0.5}} colors={buttonColors} style={[styles.saveButton, { width: props?.width },]}> */}
      <Text style={{fontWeight: 'bold', color: props?.texttitle, justifyContent:'center',alignItems:'center',fontSize:18}}>
        {props?.title}
      </Text>
    
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 50,
    borderRadius: 7,
    marginTop: height / 50,
    marginBottom: height / 50,
    fontFamily:'Jost',
    fontWeight:'500'
  },
});
export default CommonButton;