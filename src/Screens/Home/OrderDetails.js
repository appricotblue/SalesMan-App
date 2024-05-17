import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { height, width } from '../../Theme/Constants';
import images from '../../assets/Images';
import CommonButton from '../../components/CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import Local from '../../Storage/Local';


const OrderDetails = () => {
  const navigation = useNavigation();
  const { orders, orderdetails, loading, error } = useSelector((state) => state.global);
  const data = [
    {
      id: '1',
      title: 'Nirapara Ragi Puttu Podi (500g)',
      date: '₹120 x 25',
      amount: '₹200',
    },
    {
      id: '2',
      title: 'Nirapara Ragi Puttu Podi (500g)',
      date: '₹120 x 25',
      amount: '₹200',
    },
    {
      id: '3',
      title: 'Nirapara Ragi Puttu Podi (500g)',
      date: '₹120 x 25',
      amount: '₹200',
    },
    {
      id: '4',
      title: 'Nirapara Ragi Puttu Podi (500g)',
      date: '₹120 x 25',
      amount: '₹200',
    },
    {
      id: '5',
      title: 'Nirapara Ragi Puttu Podi (500g)',
      date: '₹120 x 25',
      amount: '₹200',
    },
    {
      id: '6',
      title: 'Nirapara Ragi Puttu Podi (500g)',
      date: '₹120 x 25',
      amount: '₹200',
    },


  ];

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userid = await Local.getUserId();
        const delay = 2000; // Delay in milliseconds
        console.log(userid, orderdetails, 'order details ?')



      } catch (error) {
        console.error('Error checking token:', error);

      }
    };

    checkToken();
  }, []);
  const ListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log('Item pressed')}>
      <View>
        <Text style={styles.itemtitle}>{item.name}</Text>
        <Text style={styles.subtitle}>₹{item.price}  X {item.quantityCount}</Text>
      </View>

      <Text style={styles.title}>₹{item.totalPrice} </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title={'Orders Details'} isBackArrow={true} />
      <View style={styles.container}>
        <ScrollView>

          <View style={{ width: width * .9, alignSelf: 'center', marginTop: 10, borderBottomColor: 'gray', borderBottomWidth: .5, paddingBottom: 5, }}>

            <View style={styles.earningsview}>
              <View style={styles.subearn}>

                <Text style={styles.subtitle}>Order No</Text>
                <Text style={styles.title}>{orderdetails?.orderNo}</Text>
              </View>
              <View style={styles.subearn}>

                <Text style={styles.subtitle}>Delivery Date</Text>
                <Text style={styles.title}>{orderdetails?.deliveryDate}</Text>
              </View>
            </View>
            <View style={styles.earningsview}>
              <View style={styles.subearn}>

                <Text style={styles.subtitle}>Shop</Text>
                <Text style={styles.title}>{orderdetails?.shopName}</Text>
              </View>
              <View style={styles.subearn}>

                <Text style={styles.subtitle}>Order Status</Text>
                <Text style={styles.title}>{orderdetails.orderStatus}</Text>
              </View>
            </View>



          </View>
          <View style={styles.flatlistview}>

            <Text style={styles.subtitle}>Items</Text>
            {/* <FlatList
          data={data}
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        /> */}
            {orderdetails.orderItems.map((item, index) => {
              return (
                <ListItem item={item} />
              )
            })}

          </View>
        </ScrollView>

        <View style={{ width: width * .92, alignSelf: 'center', marginTop: 5, paddingBottom: 20, marginBottom: 70, }}>
          <View style={{ width: width * .9, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={styles.subtitle}>Total Invoice Amount</Text>
            <Text style={[styles.title, { color: 'black' }]}>₹{orderdetails.totalAmount}</Text>

          </View>
          <View style={styles.totalview}>
            <Text style={[styles.subtitle, { color: '#117C00' }]}>Your Earnings</Text>
            <Text style={[styles.title, { color: '#117C00' }]}>₹{orderdetails.yourEarnings}</Text>

          </View>

          <View style={styles.btnview}>
            <CommonButton
              onPress={() => navigation.navigate('EditOrder')}
              color={'white'}
              title={'Edit Order'}
              width={orderdetails.invoice != null ? width * 0.4 : width * 0.9}
              texttitle={'#005A8D'}
            />
            {orderdetails.invoice != null && (
              <CommonButton
                onPress={() => navigation.navigate('InvoiceScreen')}
                color={'white'}
                title={'View Invoice'}
                width={width * 0.4}
                texttitle={'#005A8D'}
              />
            )}

          </View>

        </View>
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#FFffff',
  },
  text: {
    color: 'black',
  },
  imageview: {
    height: height * 0.3,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: { width: 132, height: 132, borderRadius: 70 },
  title: { color: 'black', fontSize: 16, fontFamily: 'Inter-Bold' },
  subtitle: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  earningsview: {
    height: height * 0.06,
    width: width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subearn: {
    height: height * 0.15,
    width: width * 0.45,
    justifyContent: 'center',
  },
  itemContainer: {
    height: height * 0.1,
    width: width / 1.1,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: 'black',
  },
  icon: {
    marginRight: 20,
    width: 25,
    height: 28,
    marginLeft: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  height20: {
    height: 20,
  },
  btnview: { width: width * .9, marginTop: 1, flexDirection: 'row', padding: 2, justifyContent: 'space-between' },
  flatlistview: {
    width: width * .9,
    alignSelf: 'center',
    minHeight: height * .33,
    marginTop: 10,
    // borderBottomColor: 'gray',
    // borderBottomWidth: .5,
    paddingBottom: 20
  },
  totalview: { width: width * .91, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#D9D9D9', padding: 5 }
});

export default OrderDetails;
