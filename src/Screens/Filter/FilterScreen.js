import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../../Theme/Constants';
import CommonButton from '../../components/CommonButton';
import CustomSearch from '../../components/CustomSearch';
import Calander from '../../components/Calander';
import {useNavigation} from '@react-navigation/native';
import FilterModal from '../../components/FilterModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';

function FilterScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [calanderVisible, setCalanderVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFromDatePickerVisible, setFromDatePickerVisibility] =
    useState(false);
  const [fromDate, setFromDate] = useState('');

  const onShowCalander = () => {
    console.log('pressed----------')
    setDatePickerVisibility(true);
  };
  const onCloseCalander = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    console.log('A to date has been picked: ', date);
    onCloseCalander();
  };

  const handleFromConfirm = date => {
    console.log('A From date has been picked: ', date);
    setFromDate(date);
    onCloseCalander();
  };

  const onShowFromCalander = () => {
    setDatePickerVisibility(true);
  };
  const onCloseFromCalander = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalStyle}>
        <View>
          <Text style={styles.text}>Filter by Shop</Text>
        </View>
        <CustomSearch
          placeholder={'Search Shops'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
        <View style={styles.height10} />
        <View>
          <Text style={styles.text}>Filter by Date</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <View style={styles.fromView}>
            <Text style={styles.fromText}>From</Text>
            <Calander date={'March 12'} onPress={() => onShowFromCalander()} />
          </View>
          <View style={styles.toView}>
            <Text style={styles.toText}>To</Text>
            <Calander date={'March 12'} onPress={() => onShowCalander()} />
          </View>
        </View>
        <View style={styles.height10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CommonButton
            onPress={() => navigation.goBack()}
            color={'white'}
            title={'Cancel'}
            width={width * 0.35}
            texttitle={'#005A8D'}
          />
          <CommonButton
            onPress={() => navigation.goBack()}
            color={'#005A8D'}
            title={'Apply'}
            width={width * 0.35}
            texttitle={'white'}
          />
        </View>
      </View>
      {/* <FilterModal
        visible={calanderVisible}
        onPress={() => setCalanderVisible(false)}
        onApply={() => setCalanderVisible(false)}
      /> */}

      <DateTimePickerModal
        isVisible={isFromDatePickerVisible}
        mode="date"
        onConfirm={handleFromConfirm}
        onCancel={onCloseFromCalander}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={onCloseCalander}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalStyle: {
    height: height * 0.39,
    width: width * 0.95,
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 0.3,
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  height10: {
    height: 10,
  },
  fromView: {
    height: height * 0.1,
    width: width * 0.33,
    paddingTop: 8,
  },
  fromText: {
    color: 'black',
    fontSize: 14,
  },
  toView: {
    height: height * 0.1,
    width: width * 0.33,
    paddingTop: 8,
  },
  toText: {
    color: 'black',
    fontSize: 14,
  },
});

export default FilterScreen;
