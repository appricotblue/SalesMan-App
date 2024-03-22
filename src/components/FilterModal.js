import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../Theme/Constants';
import CustomSearch from './CustomSearch';
import Calander from './Calander';

const transparent = 'rgba(0,0,0,0.5)';

function FilterModal({visible, onClose}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
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
              <Calander date={'March 12'} />
            </View>
            <View style={styles.toView}>
              <Text style={styles.toText}>To</Text>
              <Calander date={'March 12'} />
            </View>
          </View>
          <View style={styles.height10} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: transparent,
  },
  modalStyle: {
    height: height * 0.37,
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
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

export default FilterModal;
