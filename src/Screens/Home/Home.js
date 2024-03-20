import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {height, width} from '../../Theme/Constants';

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
    time: '10 mins ago',
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
    time: '30 mins ago',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
  },
];

const Home = ({navigation: {navigate}}) => {
  // const OnHomePress = () => {
  //   navigate('cart');
  // };

  const _renderItems = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text>Order{item.orderId}</Text>
          <Text>{item.time}</Text>
        </View>
        <Text>{item.name}</Text>
        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text>₹{item.rate}</Text>
            <Text>({item.qty})</Text>
          </View>
          <View>
            <Text>{item.status}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity onPress={() => OnHomePress()}>
        <Text style={styles.text}>Home Screen</Text>
      </TouchableOpacity> */}
      <View style={styles.height20} />
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
    backgroundColor: 'pink',
    // margin: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 0.4,
    padding: 6,
  },
  height20: {
    height: 20,
  },
  row1: {
    width: width * 0.96,
    height: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  row2: {
    flexDirection: 'row',
  },
});

export default Home;
