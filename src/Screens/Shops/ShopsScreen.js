import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';

const Data = [
  {
    id: 0,
    orderId: '#1678954621',
    time: '10 mins ago',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
    location: 'Aluva',
    orders: '1 New Order',
  },
  {
    id: 1,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
    location: 'Ponikkara',
    orders: '1 New Order',
  },
  {
    id: 2,
    orderId: '#1678954623',
    time: '30 mins ago',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
    location: 'Kakkanad',
    orders: '',
  },
  {
    id: 3,
    orderId: '#1678954621',
    time: '10 mins ago',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
    location: 'Fort Kochi',
    orders: '',
  },
  {
    id: 4,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
    location: 'Edachira',
    orders: '',
  },
  {
    id: 5,
    orderId: '#1678954623',
    time: '30 mins ago',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
    location: 'Ponikkara',
    orders: '',
  },
  {
    id: 6,
    orderId: '#1678954621',
    time: '1 hour ago',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
    location: 'Fort Kochi',
    orders: '',
  },
  {
    id: 7,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
    location: 'Kakkanad',
    orders: '',
  },
  {
    id: 8,
    orderId: '#1678954623',
    time: '3 hour ago',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
    location: 'Fort Kochi',
    orders: '',
  },
];

const ShopsScreen = ({navigation: {navigate}}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const _renderItems = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text style={styles.rateText}>{item.location}</Text>
            {/* <Text style={styles.qtyText}>({item.qty} Items)</Text> */}
          </View>
          <View>
            <Text
              style={{
                color: item.orders.length === 0 ? null : '#17A400',
              }}>
              {item.orders}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Shops'} />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: width * 0.96,
            marginLeft: 6,
          }}>
          <CustomSearch
            placeholder={'Search Shops'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </View>
      </View>

      <FlatList
        data={Data}
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
    marginLeft: -4,
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
