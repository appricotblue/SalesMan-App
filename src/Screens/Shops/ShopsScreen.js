import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Keyboard
} from 'react-native';
import { height, width } from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';
import HomeOrderButton from '../../components/HomeOrderButton';
import { useNavigation } from '@react-navigation/native';
import Local from '../../Storage/Local';
import { getShops, getShopDetails, getShopSearch } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setShops, setShopDetails, setShoporder } from '../../redux/action';
import { useIsFocused } from '@react-navigation/native';




const ShopsScreen = ({ navigation: { navigate } }) => {
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { shops, shopdetails, loading, error } = useSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState(1); // Initial page for pagination
  const [pageSize, setPagesize] = useState(0);
  const [UserId, setUserId] = useState(null);
  const [shoplist, setshoplist] = useState([]);
  const [position, setPosition] = useState({
    latitude: '',
    longitude: ''
  })

  const onShopPress = (shopid) => {
    GetShopDetails(shopid)

  };
  // useEffect(() => {
  //   console.log(shops)
  //   GetShops();
  // }

  //   , [])
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setShops([]));
      if (isFocused) {
        console.log('shop screen is focused');

        // Fetch user ID from local storage
        try {
          const userid = await Local.getUserId();
          console.log('User ID:', userid);
          await setUserId(userid);

          // Call API to fetch orders for the user
          await GetShops(userid);

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


  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    GetItems();
  };

  const handleSearchSubmit = async () => {
    dispatch(setShops([]));
    try {
      const response = await getShopSearch(searchQuery);
      console.log(response, 'search jkey api response')
      setshoplist(response)
      dispatch(setShops(response));
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
  useEffect(() => {
    return () => {
      // Dispatch an action to reset the shops state to an empty array when component unmounts
      dispatch(setShops([]));
    };
  }, []);

  const GetShops = async (userid, page = currentPage) => {
    console.log(UserId, userid, page, 'shopss  ')
    try {
      // Clear the existing shop list in Redux
      dispatch(setShops([]));

      const response = await getShops(userid, page);
      console.log(response, 'shop api response')

      setPagesize(response?.totalPages)
      const newShops = response.shops;

      // Concatenate new shops with the existing shop list
      const updatedShops = [...newShops];
      console.log(updatedShops, 'gvghfggtf')
      setshoplist(updatedShops)
      dispatch(setShops(updatedShops));
      if (response.message = "Getting Orders data Successfully") {
        // dispatch(setShops(response));
        // dispatch(setItems(response?.items));
      } else {
        console.log('Error during login:',);
        // setError(response.data.message);
      }
    } catch (error) {
      // Alert(error)
      console.error('Error during login:hwre', error?.message);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };

  // const GetShops = async (userid, page = currentPage) => {
  //   console.log(UserId, userid, page, 'shopss  ')
  //   try {
  //     const response = await getShops(userid, page);
  //     // const response = await login('userTwo', 'userTwo@123');
  //     console.log(response, 'shop api response')

  //     setPagesize(response?.totalPages)
  //     const newShops = response.shops;

  //     // Concatenate newOrders with the existing orders array using spread operator
  //     const updatedShops = [...shops, ...newShops];
  //     console.log(updatedShops, 'gvghfggtf')
  //     setshoplist(updatedShops)
  //     dispatch(setShops(updatedShops));
  //     if (response.message = "Getting Orders data Successfully") {
  //       // dispatch(setShops(response));
  //       // dispatch(setItems(response?.items));

  //     } else {
  //       console.log('Error during login:',);
  //       // setError(response.data.message);
  //     }
  //   } catch (error) {
  //     // Alert(error)
  //     console.error('Error during login:hwre', error?.message);
  //     if (error.response && error.response.data && error.response.data.message) {
  //       Alert.alert('Error', error.response.data.message);
  //     } else {
  //       Alert.alert('Error', 'An error occurred during login.');
  //     }

  //   }
  // };
  const GetShopDetails = async (shopid) => {
    console.log(shopid, '')
    try {
      const response = await getShopDetails(shopid);
      console.log(response.ordersWithItems, 'shop details api response')
      dispatch(setShopDetails(response.shop));
      dispatch(setShoporder(response.ordersWithItems));

      navigate('shopDetails');
      if (response.message = "Getting Orders data Successfully") {
        dispatch(setShopDetails(response.shop));
        dispatch(setShoporder(response.ordersWithItems));
      } else {
        console.log('Error during login:',);
      }
    } catch (error) {
      console.error('Error during login:details', shopid, error?.message);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }

    }
  };

  const loadMore = () => {
    console.log(currentPage, pageSize, 'pagesss')
    if (currentPage < pageSize) { // Check if the current list length is greater than or equal to the page size
      setCurrentPage(currentPage + 1);
      GetShops(UserId, currentPage + 1);
    }
  };
  const _renderItems = ({ item }) => {
    // console.log('Item:', item);
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => onShopPress(item?.id)}>
          <View style={styles.row1}>
            <Text style={styles.nameText} numberOfLines={1}>{item.shopname}</Text>
          </View>
          <View style={styles.row1}>
            <View style={styles.row2}>
              <Text style={styles.rateText}>{item.address}</Text>
              {/* <Text style={styles.qtyText}>({item.qty} Items)</Text> */}
            </View>
            <View>
              <Text
                style={{
                  color: item?.orders?.length === 0 ? null : '#17A400',
                }}>
                {item.orders}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Shops'} isNotification={false} />
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            width: width * 0.96,
            marginLeft: 6,
          }}>
          <CustomSearch
            placeholder={'Search Shops'}
            value={searchQuery}
            onChangeText={handleSearchChange}
            onClear={handleClearSearch}
            onSubmit={handleSearchSubmit}
          />
        </View>
      </View>

      <FlatList
        data={shops}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <_renderItems item={item} />}
        keyExtractor={(item) => item?.id.toString()} 
        onEndReached={loadMore} // Call loadMore function when user reaches the end of the list
        onEndReachedThreshold={0.5} 
      />

      <View style={styles.OrderButton}>
        <HomeOrderButton onpress={() => navigation.navigate('AddShop', { locationdata: position })} title={'Add Shop'} />
      </View>
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
    height: height * 0.09,
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
    marginLeft: 1,
  },
  rateText: {
    color: 'grey',
    fontSize: 14,
    
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

export default ShopsScreen;
