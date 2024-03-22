import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {height, width} from '../../Theme/Constants';
import images from '../../assets/Images';
import CommonButton from '../../components/CommonButton';

const OrderDetails = () => {
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
  
  
  ];

  const ListItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log('Item pressed')}>
      <View>
        <Text style={styles.itemtitle}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.date}</Text>
      </View>

      <Text style={styles.title}>{item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <Header title={'Orders Details'} isBackArrow={true} />
      <View style={styles.container}>
        <View style={{width:width*.9,alignSelf:'center',marginTop:10,borderBottomColor:'gray',borderBottomWidth:.5,paddingBottom:20}}>
        <Text style={styles.subtitle}>Order#16546688544</Text>
            <Text style={styles.title}>Supreme Supermarket </Text>
            <Text style={styles.subtitle}>Kakkanad</Text>
            <Text style={styles.title}>+91 95447 96311 </Text>
            <View style={styles.earningsview}>
          <TouchableOpacity style={styles.subearn}>
           
            <Text style={styles.subtitle}>Expected Delivery Date</Text>
            <Text style={styles.title}>March 12,2024 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subearn}>
            
            <Text style={styles.subtitle}>Actual Delivery Date</Text>
            <Text style={styles.title}>March 13,2024</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:width*.9,alignSelf:'center',marginTop:10}}>
        <Text style={styles.subtitle}>Order Status</Text>
            <Text style={[styles.title,{color:'#D79B00'}]}>Waiting For Pickup </Text>
          
        </View>

   
        </View>
        <View style={{width:width*.9,alignSelf:'center',height:height*.34, marginTop:10,borderBottomColor:'gray',borderBottomWidth:.5,paddingBottom:20}}>
    
        <Text style={styles.subtitle}>Items</Text>
        <FlatList
          data={data}
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        </View>
        <View style={{width:width*.9,alignSelf:'center',marginTop:10,paddingBottom:20}}>
        <View style={{width:width*.9,marginTop:10,justifyContent:'space-between',flexDirection:'row'}}>
        <Text style={styles.subtitle}>Order Status</Text>
            <Text style={[styles.title,{color:'black'}]}>₹6200</Text>
          
        </View>
        <View style={{width:width*.9,marginTop:10,justifyContent:'space-between',flexDirection:'row',backgroundColor:'#D9D9D9',padding:5}}>
        <Text style={[styles.subtitle,{color:'#117C00'}] }>Order Status</Text>
            <Text style={[styles.title,{color:'#117C00'}]}>₹6200</Text>
          
        </View>
        <CommonButton
        onPress={() => isValidate()}
        // onPress={() => navigation.replace('Home')}
        color={'white'}
        title={'Login'}
        width={width * 0.9}
        texttitle={'#005A8D'}
      />

 </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    // alignItems: 'center',

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

  image: {width: 132, height: 132, borderRadius: 70},
  title: {color: 'black', fontSize: 16, fontFamily: 'Inter-Regular'},
  subtitle: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  earningsview: {
    height: height * 0.08,
    width: width,
   
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  subearn: {
    height: height * 0.15,
    width: width * 0.45,
  
    justifyContent: 'center',
    // backgroundColor:'red'
   
  
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: .5,
    borderBottomColor: '#ccc',
    width: width*.9,
  },
  itemtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
});

export default OrderDetails;
