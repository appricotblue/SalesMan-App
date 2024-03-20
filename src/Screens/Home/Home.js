import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {height, width} from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';

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
  {
    id: 7,
    orderId: '#1678954622',
    time: '20 mins ago',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
  },
  {
    id: 8,
    orderId: '#1678954623',
    time: '3 hour ago',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
  },
];

const Home = ({navigation: {navigate}}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const _renderItems = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.orderIdText}>Order{item.orderId}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.row1}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text style={styles.rateText}>₹{item.rate}</Text>
            <Text style={styles.qtyText}>({item.qty} Items)</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color:
                  item.status == 'Delivered'
                    ? '#D79B00'
                    : item.status == 'Ordered'
                    ? '#17A400'
                    : 'black',
              }}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomSearch
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />
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
    alignItems: 'center',
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
});

export default Home;
