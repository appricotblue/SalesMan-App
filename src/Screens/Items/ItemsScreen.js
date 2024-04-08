import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {height, width} from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';
import images from '../../assets/Images';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getItems ,getItemSearch} from '../../api';
import { setShops, setItems } from '../../redux/action';

const Data = [
  {
    id: 0,
    orderId: '#1678954621',
    time: '10 mins ago',
    name: ' Nirapara Ragi Puttu Podi',
    rate: 1638,
    qty: '500g',
    status: 'Ordered',
    location: 'Aluva',
    orders: '1 New Order',
    image: images.png2,
  },
  {
    id: 1,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Nirapara Corn Puttu Podi',
    rate: 3896,
    qty: '200g',
    status: 'Delivered',
    location: 'Ponikkara',
    orders: '1 New Order',
    image: images.png1,
  },
  {
    id: 2,
    orderId: '#1678954623',
    time: '30 mins ago',
    name: ' Nirapara Oats Puttu Podi',
    rate: 4250,
    qty: '500g',
    status: 'Draft',
    location: 'Kakkanad',
    orders: '',
    image: images.png3,
  },
  {
    id: 3,
    orderId: '#1678954621',
    time: '10 mins ago',
    name: 'Nirapara Kashmiri Chilli Powder',
    rate: 1638,
    qty: '200g',
    status: 'Ordered',
    location: 'Fort Kochi',
    orders: '',
    image: images.png1,
  },
  {
    id: 4,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Nirapara Oats Puttu Podi',
    rate: 3896,
    qty: '200g',
    status: 'Delivered',
    location: 'Edachira',
    orders: '',
    image: images.png3,
  },
  {
    id: 5,
    orderId: '#1678954623',
    time: '30 mins ago',
    name: ' Nirapara Pepper Powder',
    rate: 4250,
    qty: '200g',
    status: 'Draft',
    location: 'Ponikkara',
    orders: '',
    image: images.png1,
  },
  {
    id: 6,
    orderId: '#1678954621',
    time: '1 hour ago',
    name: ' Nirapara Oats Puttu Podi',
    rate: 1638,
    qty: '200g',
    status: 'Ordered',
    location: 'Fort Kochi',
    orders: '',
    image: images.png3,
  },
  {
    id: 7,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Nirapara Oats Puttu Podi',
    rate: 3896,
    qty: '200g',
    status: 'Delivered',
    location: 'Kakkanad',
    orders: '',
    image: images.png1,
  },
  {
    id: 8,
    orderId: '#1678954623',
    time: '3 hour ago',
    name: ' Nirapara Pepper Powder',
    rate: 4250,
    qty: '200g',
    status: 'Draft',
    location: 'Fort Kochi',
    orders: '',
    image: images.png3,
  },
];

const ItemsScreen = ({navigation: {navigate}}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { shopitems, loading, error } = useSelector((state) => state.global);

  useEffect(() => {
    console.log(shopitems)
    GetItems();
  }
    , [])

    const handleSearchChange = (text) => {
      setSearchQuery(text);
    };
  
    const handleClearSearch = () => {
      setSearchQuery('');
      GetItems(); 
    };
  
    // const handleSearchSubmit = async () => {
    //   try {
    //     // Trigger API call with searchValue
    //     const results = await getSearchResults(searchValue);
    //     setSearchResults(results); // Update search results state with API response
    //   } catch (error) {
    //     console.error('Error fetching search results:', error);
    //   }
    // };


    const handleSearchSubmit = async () => {

      try {
        const response = await getItemSearch(searchQuery);
        // const response = await login('userTwo', 'userTwo@123');
        console.log(response, 'search jkey api response')
        dispatch(setItems(response));
        if (response.message = "Getting Orders data Successfully") {
          // dispatch(setShops(response));
          dispatch(setItems(response));
  
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

  const GetItems = async () => {

    try {
      const response = await getItems();
      // const response = await login('userTwo', 'userTwo@123');
      console.log(response, 'shop api response')
      dispatch(setItems(response));
      if (response.message = "Getting Orders data Successfully") {
        // dispatch(setShops(response));
        dispatch(setItems(response));

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


  const _renderItems = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={{height: 70, width: 72, resizeMode: 'stretch'}}
          />
        </View>
        <View>
          <View style={styles.row1}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View style={styles.row1}>
            <View style={styles.row2}>
              <Text style={styles.qtyText}>{item.quantity}</Text>
            </View>
          </View>
          <Text style={styles.rateText}>₹{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Items'} isNotification={true} />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: width * 0.96,
            marginLeft: 6,
          }}>
          <CustomSearch
            placeholder={'Search Items'}
            value={searchQuery}
            // onChangeText={setSearchQuery}
            // onClear={() => setSearchQuery('')}
            onChangeText={handleSearchChange}
            onClear={handleClearSearch}
            onSubmit={handleSearchSubmit}
          />
        </View>
      </View>

      <FlatList
        data={shopitems}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <_renderItems item={item} />}
        keyExtractor={item => item.id}
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
    flexDirection: 'row',
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
    marginTop: 3,
  },
  qtyText: {
    color: 'grey',
    fontSize: 14,
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
  imageContainer: {
    height: height * 0.09,
    width: width * 0.2,
    backgroundColor: 'pink',
    marginHorizontal: 3,
    marginRight: 25,
  },
});

export default ItemsScreen;
