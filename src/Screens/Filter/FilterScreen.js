import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import {height, width} from '../../Theme/Constants';
import CommonButton from '../../components/CommonButton';
import CustomSearch from '../../components/CustomSearch';
import Calander from '../../components/Calander';
import {useNavigation} from '@react-navigation/native';
import FilterModal from '../../components/FilterModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import Local from '../../Storage/Local';
import { getShopSearch, getOrderSearch, getShopLists, getOrderDetails, getOrderbyShopDate, } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelectionBox from '../../components/CustomSelectionBox';
import { setShops, setFilterOrder, setShopDetails, setShoporder, setShopList } from '../../redux/action';

function FilterScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [calanderVisible, setCalanderVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isFromDatePickerVisible, setFromDatePickerVisibility] =
    useState(false);
  const [fromDate, setFromDate] = useState('');
  const dispatch = useDispatch();
  const [toDate, setToDate] = useState('');
  const [selectedShop, setSelectedShop] = useState({ id: '', shopname: 'Select' });
  const { status, shops, searchshopitems } = useSelector((state) => state.global);

  '--------------------------------'

  const validateFilters = () => {
    if (!selectedShop) {
      Alert.alert('Error', 'Please select a shop.');
      return false;
    }

    if (!fromDate || !toDate) {
      Alert.alert('Error', 'Please select both From and To dates.');
      return false;
    }

    return true;
  };

  const applyFilters = () => {
    if (validateFilters()) {
      // If all validations pass, proceed to fetch orders
      GetOrderbyShopDate();
    }
  }


  const GetOrderbyShopDate = async () => {

    console.log('here search', selectedShop?.shopname,)
    try {
      const response = await getOrderbyShopDate(selectedShop?.shopname, fromDate, toDate);
      console.log(response, 'filter api response')
      dispatch(setFilterOrder(response?.OrdersShops))
      if (response.message = "Getting Orders data Successfully") {
        // dispatch(setOrders(response));
        navigation.navigate('OrderFilterScreen')
      } else {
        console.log('Error during login:',);
      }
    } catch (error) {
      console.error('Error during login:hwre', error?.message);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };

  useEffect(() => {

    GetShops(),
      console.log(shops, 'heree')
    // GetShopsItems()
  }, [])

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    GetItems();
  };

  const GetShops = async () => {
    try {
      const response = await getShopLists();
      dispatch(setShopList(response.shops));
    } catch (error) {
      console.log(error)
    }
  };


  const handleSearchSubmit = async () => {

    try {
      const response = await getShopSearch(searchQuery);
      console.log(response, 'search jkey api response')
      dispatch(setShops(response));
      if (response.message = "Getting Orders data Successfully") {
        navigation.navigate('OrderFilterScreen')
      } else {
        console.log('Error during login:',);
      }
    } catch (error) {
      console.error('Error during login:hwre', error?.message);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };

  const handleShopSelect = async (shop) => {
    await setSelectedShop(shop);
    console.log(selectedShop?.shopname, 'shop iddddd')
  };

  const onShowCalander = () => {
    setDatePickerVisibility(true);
  };

  const onCloseCalander = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log(date, 'from date ')
    const formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate, 'date from')
    setFromDate(formattedDate);
    onCloseCalander();
  };

  const handleFromConfirm = date => {
    console.log(date, 'to date ')
    const formattedDate = date.toISOString().split('T')[0];
    setToDate(formattedDate);

    onCloseFromCalander();
  };



  const onShowFromCalander = () => {
    setFromDatePickerVisibility(true);
  };
  const onCloseFromCalander = () => {
    setFromDatePickerVisibility(false);
  };

  return (

    <View style={styles.modalContainer}>
      <StatusBar />
      <View style={styles.modalStyle}>
        <View style={{ marginTop: 25 }}> 
          <Text style={styles.text}>Filter by Shop</Text>
        </View>

        <CustomSelectionBox
          title={''}
          value={selectedShop ? selectedShop.shopname : 'Select'}
          options={shops}
          onSelect={handleShopSelect}
          displayProperty="shopname" // Specify the property to display as shop name
        />
        {/* <CustomSearch
          placeholder={'Search Shops'}
          value={searchQuery}
          onChangeText={handleSearchChange}
          onClear={handleClearSearch}
          onSubmit={handleSearchSubmit}
        /> */}
        {/* <CustomSearch
          placeholder={'Search Shops'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        /> */}
        {/* <View style={styles.height10} />
        <View style={styles.searchView}>
          <Text style={styles.searchStoreText}>Kalarikal Stores</Text>
          <Text style={styles.searchLocText}>Kakkanad</Text>

        </View>
        <View style={styles.height10} />


        <View>
          <Text style={styles.text}>Filter by Date</Text>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <View style={styles.fromView}>
            <Text style={styles.fromText}>From</Text>
            {/* <Calander date={fromDate} onPress={() => { handleFromConfirm(), onShowFromCalander() }} /> */}
            <Calander date={fromDate} onPress={() => onShowCalander()} />
          </View>
          <View style={styles.toView}>
            <Text style={styles.toText}>To</Text>
            {/* <Calander date={toDate} onPress={() => { handleConfirm(), onShowCalander() }} /> */}
            <Calander date={toDate} onPress={() => onShowFromCalander()} />
          </View>
        </View>
        <View style={styles.height10} />
       
      </View>
      <View
          style={styles.buttonWrapperView}>
          <CommonButton
            onPress={() => navigation.goBack()}
            color={'white'}
            title={'Cancel'}
            width={width * 0.35}
            texttitle={'#005A8D'}
          />
          <CommonButton
          onPress={() => applyFilters()}
            color={'#005A8D'}
            title={'Apply'}
            width={width * 0.35}
            texttitle={'white'}
          />

      </View>

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
    height: height * 0.28,
    width: width * 0.95,
    padding: 15,
    marginTop: 10,
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
  searchStoreText:{
    fontSize: 15,
    color:'#005A8D',
    fontWeight:"bold"
  },
  searchLocText:{
    fontSize: 13,
    color:'grey',
  },
  searchView:{
    height:height*.08,
    width:width*.87,
    borderBottomWidth:.5,
    borderColor:'grey',
    justifyContent:'center'
  },
  buttonWrapperView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:width*.85,
    height:height*.07,
    position:'absolute',
    bottom:0,
    marginVertical:23
  }
});

export default FilterScreen;
