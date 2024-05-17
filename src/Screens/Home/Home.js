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
import { getOrders, getOrderSearch, getDeliveries, getOrderDetails, getRoute } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setItems, setOrderDetails, setDeliveries, setRoute } from '../../redux/action';
import { useIsFocused } from '@react-navigation/native';



const Home = ({ navigation: { navigate } }) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [UserId, setUserId] = useState(null);
  const [locationId, setlocationId] = useState('');
  const [selectedItem, setSelectedItem] = useState('Orders');
  const { orders, deliveries, route, routeitem, loading, error } = useSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState(1); // Initial page for pagination
  const [pageSize, setPagesize] = useState(0);
  const [orderlist, setorderlist] = useState([]);
  const [delivertlist, setdelivertlist] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const handleSelectItem = (title) => {
    // Alert.alert(title)
    console.log(title)
    setSelectedItem(title);
    GetOrders(UserId, title, 1)
  };

  const filterPress = () => {
    navigate('filter');
  };
  useEffect(() => {
    console.log(orders, 'hooy')
  }, []);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    GetOrders(UserId, 'Orders', 1);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userid = await Local.getUserId();
        const delay = 2000; // Delay in milliseconds
        console.log(userid, routeitem, 'userid kitiyo ?', orders, route)
        setUserId(userid)

        await GetOrders(userid, 'Orders', 1);
        await GetRoutes(userid);

      } catch (error) {
        console.error('Error checking token:', error);

      }
    };

    checkToken();
  }, [routeitem]);


  const GetRoutes = async (userid) => {
    try {
      const response = await getRoute(userid);
      console.log(response, 'routes responsw')
      dispatch(setRoute(response));
    } catch (error) {
      console.log(error)

    }
  };

  const fetchData = async () => {
    if (isFocused) { // Check if the screen is focused
      console.log('Home screen is focused', routeitem?.id, selectedItem, 'test');
      try {
        const userid = await Local.getUserId();
        setUserId(userid);
        await GetOrders(userid, selectedItem, 1);
        await GetRoutes(userid);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    dispatch(setOrders([]));
    dispatch(setDeliveries([]));
    fetchData(); // Call fetchData in useEffect
  }, [isFocused, selectedItem, routeitem]);

  // useEffect(() => {
  //   const fetchData = async () => {
   

  //     if (isFocused) {
  //       console.log('Home screen is focused', routeitem?.id, selectedItem, 'test');

  //       // Fetch user ID from local storage
  //       try {
  //         const userid = await Local.getUserId();
  //         console.log('User ID:', userid);
  //         setUserId(userid);

  //         // Call API to fetch orders for the user
  //         await GetOrders(userid, 'Orders', 1);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     }
  //   };

  //   fetchData(); // Call the async function immediately inside useEffect

  //   return () => {
  //     // Cleanup function (optional)
  //     // This function will be called when the component unmounts or before re-runs of effect
  //     // You can perform cleanup tasks here if needed
  //   };
  // }, [isFocused, routeitem, selectedItem,]);


  const GetSearchOrders = async () => {
    dispatch(setOrders([]));
    console.log('here search', searchQuery)
    try {
      const response = await getOrderSearch(searchQuery);
      console.log(response, 'search api response')
      setSearchQuery('')
      Keyboard.dismiss();

      if (response.message = "Getting Orders data Successfully") {
        dispatch(setOrders(response));
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

  const handleLocationSelect = async (locationId) => {
    // Call your API here with the selected location ID
    console.log('Selected Location ID:', locationId);
    setlocationId(locationId)
    // Alert.alert('test' + locationId)
    await GetOrders(UserId, 'Orders', 1);
    // Example API call:
    // fetch(`https://yourapi.com/locations/${locationId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Handle API response
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  };

  const GetOrders = async (userId, selectedItem, page = currentPage) => {
    console.log('here click  33', locationId, userId, selectedItem, page, orders)
    dispatch(setOrders([]));
    try {
      const response = await (selectedItem == 'Orders'
        ? getOrders(userId, locationId, page)
        : getDeliveries(userId, page));
      // console.log(response.orders, 'here')
      if (selectedItem == 'Orders') {
        setPagesize(response?.totalPages)
        const newOrders = response.orders;
        const updatedOrders = [...orders, ...newOrders];
        // console.log(updatedOrders, 'gvghfggtf')
        dispatch(setOrders(updatedOrders));
        setorderlist(updatedOrders)
      } else {
        dispatch(setDeliveries(response.orders));
        setdelivertlist(response.orders)

      }



    } catch (error) {
      console.error('Error during fetching orders:home ', error?.message);
    }
  };

  const GetOrderDetails = async (orderid) => {
    console.log('here click ')

    try {
      const response = await getOrderDetails(orderid);
      console.log(response, 'here')
      dispatch(setOrderDetails(response))
      navigate('OrderDetails')

    } catch (error) {
      console.error('Error during fetching orders:', error?.message);
    }
  };

  const loadMore = () => {
    console.log(currentPage, pageSize, 'pagesss')
    if (currentPage < pageSize) {
      setCurrentPage(currentPage + 1);
      GetOrders(UserId, selectedItem, currentPage + 1);
    }
  };
  useEffect(() => {
    return () => {
      // Dispatch an action to reset the shops state to an empty array when component unmounts
      dispatch(setOrders([]));
      dispatch(setDeliveries([]));
      setSelectedItem('Orders')
    };
  }, []);




  const _renderItems = ({ item }) => {

    return (
      <TouchableOpacity
        // onPress={() => navigate('OrderDetails')}
        onPress={() => GetOrderDetails(item.id)}
        style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.orderIdText}> {item?.orderNo}</Text>
          <Text style={styles.timeText}>Order Date  <Text style={{ color: 'black' }}> {item?.createdAt}</Text></Text>
        </View>
        <View style={styles.row1}>
          <Text style={styles.nameText}>{item.shopName}</Text>
          <Text style={styles.timeText}>Delivery Date <Text style={{ color: 'black' }}> {item?.expecteddate}</Text></Text>
        </View>
        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text style={styles.rateText}>₹{item?.totalAmount}</Text>
            <Text style={styles.qtyText}>({item?.itemCount} Items)</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color:
                  item.statusid == 1
                    ? '#D79B00'
                    : item.statusid == 4
                      ? '#17A400'
                      : 'black',
              }}>
              {item.status}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Orders'} isNotification={false} isRouteview={true} onSelectLocation={handleLocationSelect} />
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: width * 0.7,
            marginLeft: 6,
          }}>
          <CustomSearch
            placeholder={'Search Orders'}
            value={searchQuery}
            // onChangeText={setSearchQuery}
            // onClear={() => setSearchQuery('')}
            onChangeText={handleSearchChange}
            onClear={handleClearSearch}
            onSubmit={GetSearchOrders}
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
      <View style={styles.rowView}>
        <HomeScreenSelectable
          title={'Orders'}
          onPress={() => { handleSelectItem('Orders'), GetOrders(UserId, 'Orders', 1) }}
          isSelected={selectedItem === 'Orders'} />
        <HomeScreenSelectable title={'Deliveries'}
          onPress={() => { handleSelectItem('Deliveries'), GetOrders(UserId, 'Deliveries', 1), dispatch(setOrders([])) }}
          isSelected={selectedItem === 'Deliveries'}
        />

      </View>
      {isDataEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Shops found</Text>
        </View>
      ) : (
      <FlatList
        data={selectedItem == 'Orders' ? orders : deliveries}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <_renderItems item={item} />}
        keyExtractor={item => item?.id.toString()}
        onEndReached={loadMore} // Call loadMore function when user reaches the end of the list
        onEndReachedThreshold={0.5} 
      />
      )}
      <View style={styles.OrderButton}>
        <HomeOrderButton onpress={() => navigate('AddSalesOrder')} title={'New Sales Order'} />
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
    marginLeft: 3,
  },
  rateText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft:3
  },
  qtyText: {
    color: 'black',
    fontSize: 11,
    marginLeft: 3,
  },
  rowView: {
    height: height * 0.06,
    width: width * 0.90,
    marginHorizontal: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'grey',
  },
});

export default Home;
