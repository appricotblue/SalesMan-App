import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard
} from 'react-native';
import { height, width } from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';
import FilterButton from '../../components/FilterButton';
import HomeScreenSelectable from '../../components/HomeScreenSelectable';
import HomeOrderButton from '../../components/HomeOrderButton';
import FilterModal from '../../components/FilterModal';
import Local from '../../Storage/Local';
import { getOrders, getOrderSearch, getReturnOrder, getReturnSearch, getReturnOrderDetails } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setReturnOrders, setDeliveries, setOrderDetails } from '../../redux/action';
import { useIsFocused } from '@react-navigation/native';



const Return = ({ navigation: { navigate } }) => {
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Orders');
  const { orders, returnorder, deliveries, loading, error } = useSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState(1); // Initial page for pagination
  const [pageSize, setPagesize] = useState(0);
  const [UserId, setUserId] = useState(null);
  const dispatch = useDispatch();

  const filterPress = () => {
    navigate('filter');
  };


  const handleClearSearch = () => {
    setSearchQuery('');
    GetReturnOrder(UserId)
  };

  const handleSearchSubmit = async () => {
    dispatch(setReturnOrders([]));
    try {
      const response = await getReturnSearch(searchQuery);
      console.log(response, 'search jkey api response')
      // setshoplist(response)
      dispatch(setReturnOrders(response));
      setSearchQuery('')
      Keyboard.dismiss();
      if (response.message = "Getting Orders data Successfully") {

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
  const GetOrderDetails = async (orderid) => {
    console.log('here click ', orderid, 'uu')

    try {
      const response = await getReturnOrderDetails(orderid);
      console.log(response, 'here')
      dispatch(setOrderDetails(response))
      navigate('ReturnOrderDetails')

    } catch (error) {
      console.error('Error during fetching orders:', error?.message);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        console.log('Return screen is focused');

        // Fetch user ID from local storage
        try {
          const userid = await Local.getUserId();
          console.log('User ID:', userid);
          setUserId(userid);

          // Call API to fetch orders for the user
          await GetReturnOrder(userid);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData(); // Call the async function immediately inside useEffect

    return () => {
      // Cleanup function (optional)
      // This function will be called when the component unmounts or before re-runs of effect
      // You can perform cleanup tasks here if needed
    };
  }, [isFocused]);

  const GetReturnOrder = async (userid) => {

    console.log('here search return page', userid, searchQuery)
    try {
      const response = await getReturnOrder(userid);
      console.log(response, 'return order  api response')
      if (response.message = "Getting Orders data Successfully") {
        dispatch(setReturnOrders(response));
      } else {
        console.log('Error during login:',);
      }
    } catch (error) {
      console.error('Error during login:hwre', error?.message);
      if (error.response && error.response.data && error.response.data.message) {
        // Alert.alert('Error', error.response.data.message);
      } else {
        // Alert.alert('Error', 'An error occurred during login.');
      }
    }
  }

  const _renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => GetOrderDetails(item.id)}
        style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.orderIdText}> {item.orderNo}</Text>
          <Text style={styles.timeText}>Pickup Date: <Text style={{ color: 'black' }}>  {item.deliveryDate}</Text></Text>

        </View>
        <View style={styles.row1}>
          <Text style={styles.nameText}>{item?.shopName}</Text>
          {/* <Text style={styles.timeText}>Delivery Date  {item.deliveryDate}</Text> */}
        </View>
        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text style={styles.rateText}>₹{item.totalAmount}</Text>
            <Text style={styles.qtyText}>({item?.totalItemReturned} Items)</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color:
                  item.statusId == 1
                    ? '#D79B00'
                    : item.statusId == 4
                      ? '#17A400'
                      : 'black',
              }}>
              {item?.status?.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Return'} isNotification={false} />
      <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
        <View
          style={{
            width: width * 0.7,
            marginLeft: 6,
          }}>
          <CustomSearch
            placeholder={'Search Returns'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            // onClear={() => setSearchQuery('')}
            onClear={handleClearSearch}
            onSubmit={handleSearchSubmit}
          />
        </View>
        <View
          style={{
            width: width * 0.25,
            marginLeft: 6,
          }}>
          <FilterButton onPress={() => filterPress()} />
        </View>
      </View>
      {/* <View style={styles.rowView}>
        <HomeScreenSelectable title={'Todays Offer'} />
        <HomeScreenSelectable title={'Draft'} />
        <HomeScreenSelectable title={'All Orders'} />
      </View> */}

      <FlatList
        data={returnorder}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <_renderItems item={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.OrderButton}>
        <HomeOrderButton onpress={() => navigate('AddReturnOrder')} title={'New Return'} />
      </View>
      <FilterModal
        visible={modalVisible}
        onPress={() => setModalVisible(false)}
        onApply={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: 'black',
  },
  itemContainer: {
    height: height * 0.11,
    width: width * 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    padding: 8,
  },
  height20: {
    height: 20,
  },
  row1: {
    width: width * 0.96,
    height: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    marginTop: 3,
    alignItems: 'center',
  },
  orderIdText: {
    color: 'grey',
    fontSize: 12,
  },
  timeText: {
    color: 'grey',
    fontSize: 10,
  },
  nameText: {
    color: '#005A8D',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -4,
  },
  rateText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  qtyText: {
    color: 'black',
    fontSize: 11,
    marginLeft: 3,
  },
  rowView: {
    height: height * 0.06,
    width: width * 0.97,
    marginHorizontal: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  OrderButton: {
    position: 'absolute',
    bottom: 13,
    left: 0,
    right: 0,
    height: 40, // Adjust height as needed
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
});

export default Return;
