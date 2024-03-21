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

function ShopDetails() {
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
});

export default ShopDetails;
