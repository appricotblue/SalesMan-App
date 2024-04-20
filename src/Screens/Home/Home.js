import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { height, width } from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';
import FilterButton from '../../components/FilterButton';
import HomeScreenSelectable from '../../components/HomeScreenSelectable';
import HomeOrderButton from '../../components/HomeOrderButton';
import FilterModal from '../../components/FilterModal';
import Local from '../../Storage/Local';
import { getOrders, getOrderSearch, getDeliveries, getOrderDetails } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setItems, setOrderDetails, setDeliveries } from '../../redux/action';
import { useIsFocused } from '@react-navigation/native';

const Data = [
  {
    id: 0,
    orderId: '#1678954621',
    time: '10 mins ago',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
  },
  {
    id: 1,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
  },
  {
    id: 2,
    orderId: '#1678954623',
    time: '30 mins ago',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
  },
  {
    id: 3,
    orderId: '#1678954621',
    time: '10 mins ago',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
  },
  {
    id: 4,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
  },
  {
    id: 5,
    orderId: '#1678954623',
    time: '30 mins ago',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
  },
  {
    id: 6,
    orderId: '#1678954621',
    time: '1 hour ago',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
  },

];

const Home = ({ navigation: { navigate } }) => {

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [UserId, setUserId] = useState(null);
  const [selectedItem, setSelectedItem] = useState('Orders');
  const { orders, deliveries, loading, error } = useSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState(1); // Initial page for pagination
  const [pageSize, setPagesize] = useState(0);

  const handleSelectItem = (title) => {
    setSelectedItem(title);
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
    GetOrders();
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userid = await Local.getUserId();
        const delay = 2000; // Delay in milliseconds
        console.log(userid, 'userid kitiyo ?', orders)
        setUserId(userid)

        await GetOrders(userid, 'Orders', 1);
      } catch (error) {
        console.error('Error checking token:', error);

      }
    };

    checkToken();
  }, []);


  

  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        console.log('Home screen is focused');

        // Fetch user ID from local storage
        try {
          const userid = await Local.getUserId();
          console.log('User ID:', userid);
          setUserId(userid);

          // Call API to fetch orders for the user
          await GetOrders(userid, 'Orders', 1);
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


  const GetSearchOrders = async () => {
    dispatch(setOrders([]));
    console.log('here search', searchQuery)
    try {
      const response = await getOrderSearch(searchQuery);
      console.log(response, 'search api response')
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

  const GetOrders = async (userId, selectedItem, page = currentPage) => {
    console.log('here click ', userId, selectedItem, page, orders)
    dispatch(setOrders([]));
    try {
      const response = await (selectedItem == 'Orders'
        ? getOrders(userId, page)
        : getDeliveries(userId, page));
      console.log(response.orders, 'here')
      if (selectedItem == 'Orders') {
        setPagesize(response?.totalPages)
        const newOrders = response.orders;
        const updatedOrders = [...orders, ...newOrders];
        console.log(updatedOrders, 'gvghfggtf')
        dispatch(setOrders(updatedOrders));
      } else {
        dispatch(setDeliveries(response.orders));

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
  const _renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        // onPress={() => navigate('OrderDetails')}
        onPress={() => GetOrderDetails(item.id)}
        style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.orderIdText}> {item.orderNo}</Text>
          <Text style={styles.timeText}>Order Date  {item.createdAt}</Text>
        </View>
        <View style={styles.row1}>
          <Text style={styles.nameText}>{item.shopName}</Text>
          <Text style={styles.timeText}>Delivery Date  {item.expecteddate}</Text>
        </View>
        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text style={styles.rateText}>₹{item.totalAmount}</Text>
            <Text style={styles.qtyText}>({item.qty} Items)</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color:
                  item.statusid == 1
                    ? '#D79B00'
                    : item.status == 4
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
      <Header title={'Orders'} isNotification={true} isRouteview={true} />
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

      <FlatList
        data={selectedItem == 'Orders' ? orders : deliveries}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <_renderItems item={item} />}
        keyExtractor={item => item?.id}
        onEndReached={loadMore} // Call loadMore function when user reaches the end of the list
        onEndReachedThreshold={0.5} 
      />
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
});

export default Home;
