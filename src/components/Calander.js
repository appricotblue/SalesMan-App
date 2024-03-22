import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {height} from '../Theme/Constants';
import CalendarSVG from '../assets/svg/CalendarSVG';

function Calander({date, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.dateText}>{date}</Text>
      <CalendarSVG />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.05,
    width: '105%',
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 5,
  },
  dateText: {
    fontSize: 15,
    color: 'black',
  },
});

export default Calander;
