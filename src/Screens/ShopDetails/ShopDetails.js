import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {height, width} from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';
import images from '../../assets/Images';
import FilterButton from '../../components/FilterButton';

const Data = [
  {
    id: 0,
    orderId: '#1678954621',
    time: '10th March 10 25 AM',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
  },
  {
    id: 1,
    orderId: '#1678954622',
    time: '10th March 10 25 AM',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
  },
  {
    id: 2,
    orderId: '#1678954623',
    time: '10th March 10 25 AM',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
  },
  {
    id: 3,
    orderId: '#1678954621',
    time: '10th March 10 25 AM',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
  },
  {
    id: 4,
    orderId: '#1678954622',
    time: '10th March 10 25 AM',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
  },
  {
    id: 5,
    orderId: '#1678954623',
    time: '10th March 10 25 AM',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
  },
  {
    id: 6,
    orderId: '#1678954621',
    time: '10th March 10 25 AM',
    name: ' Supreme SuperMarket',
    rate: 1638,
    qty: 12,
    status: 'Ordered',
  },
  {
    id: 7,
    orderId: '#1678954622',
    time: '10th March 10 25 AM',
    name: ' Green SuperMarket',
    rate: 3896,
    qty: 16,
    status: 'Delivered',
  },
  {
    id: 8,
    orderId: '#1678954623',
    time: '10th March 10 25 AM',
    name: ' Golden Stores',
    rate: 4250,
    qty: 10,
    status: 'Draft',
  },
];

function ShopDetails() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    {
      name: 'Supreme Supermarket',
      location: 'Kakkanad',
      address1: 'Avenue Building',
      address2: 'Chandrabose Road, Kakkanad Juncion',
      address3: 'Thrikkakkara, Ernakulam',
      email: 'supremekochi@gmail.com',
      number: '+91 97886 53241',
      image: images.supreme,
    },
  ]);

  const _renderItems = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.orderIdText}>Order{item.orderId}</Text>
        </View>

        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text style={styles.rateText}>₹{item.rate}</Text>
            <Text style={styles.qtyText}>({item.qty} Items)</Text>
          </View>
          <View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Shop Details'} isBackArrow={true} />
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={data[0].image}
            style={{
              height: height * 0.16,
              width: width * 0.37,
              borderRadius: 11,
            }}
          />
        </View>
        <Text style={styles.nameText}>{data[0].name}</Text>
        <Text style={styles.locationText}>{data[0].location}</Text>
      </View>
      <Text style={styles.addressTextH}>Address</Text>
      <Text style={styles.addressText}>{data[0].address1}</Text>
      <Text style={styles.addressText}>{data[0].address2}</Text>
      <Text style={styles.addressText}>{data[0].address3}</Text>

      <View style={styles.height15} />

      <Text style={styles.addressTextH}>Contact Details</Text>
      <Text style={styles.addressText}>{data[0].number}</Text>
      <Text style={styles.addressText}>{data[0].email}</Text>
      <View style={styles.height15} />
      <View style={styles.middleBar}>
        <Text style={styles.previousText}>Previous Orders</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: width * 0.7,
            marginLeft: 6,
          }}>
          <CustomSearch
            placeholder={'Search Orders'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
          />
        </View>
        <View
          style={{
            width: width * 0.25,
            marginLeft: 6,
          }}>
          <FilterButton />
        </View>
      </View>
      <FlatList
        data={Data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <_renderItems item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subContainer: {
    height: height * 0.25,
    width: width * 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: height * 0.16,
    width: width * 0.37,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  nameText: {
    color: '#005A8D',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  locationText: {
    color: 'grey',
    fontSize: 14,
  },
  addressText: {
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 15,
  },
  addressTextH: {
    fontSize: 15,
    color: 'grey',
    paddingHorizontal: 15,
  },
  height15: {
    height: 15,
  },
  middleBar: {
    height: height * 0.045,
    width: width * 1,
    backgroundColor: '#005A8D',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  previousText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
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
    fontSize: 16,
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
});

export default ShopDetails;
