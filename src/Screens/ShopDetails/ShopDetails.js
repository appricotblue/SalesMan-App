import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import {height, width} from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';
import images from '../../assets/Images';
import FilterButton from '../../components/FilterButton';
import { useDispatch, useSelector } from 'react-redux';
import { setShops, setShopDetails } from '../../redux/action';
import CommonButton from '../../components/CommonButton';


function ShopDetails({ navigation: { navigate } }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const { shoporders, shopdetails, loading, error } = useSelector((state) => state.global);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
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

  const filterPress = () => {
    navigate('filter');
  };
  useEffect(() => {
    // Filter orders when searchQuery changes
    filterOrders(searchQuery);
  }, [searchQuery]);

  const filterOrders = (query) => {
    if (query) {
      // If searchQuery is not empty, filter orders
      const filtered = shoporders.filter(order =>
        order.orderId.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOrders(filtered);
      setIsSearching(true);
    } else {
      // If searchQuery is empty, show all orders
      setFilteredOrders(shoporders);
      setIsSearching(false);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      console.log(shoporders, shopdetails, 'kkk', shopdetails?.shopImage[0].url)
      const imageUrls = shopdetails?.shopImage.map(image => image.url);
      setImages(imageUrls);
      const imageUrl = shopdetails?.shopImage[1]?.url; // Accessing URL safely
      const uriString = imageUrl ? String(imageUrl) : '';
      await setImage(uriString)
      console.log(image, 'here image')
      const parsed = JSON.parse(shopdetails.locationCode);
      setLatitude(parsed.latitude);
      setLongitude(parsed.longitude);
    }
    fetchData();
    // convertUrlToImage()
  }, [])
  
  const formatDate = (dateTimeString) => {
    const dateObject = new Date(dateTimeString); // Create a Date object from the dateTimeString
    const formattedDate = dateObject.toLocaleDateString(); // Format date using toLocaleDateString()
    return formattedDate;
  };

  const convertUrlToImage = (images) => {
    const responseString = shopdetails?.shopImage;
    // const urls = responseString?.split(",");
    const urls = responseString.map(item => {
      return item.url.replace(/"/g, ''); // Remove all double quotes from the URL
    });
    console.log(urls, 'here')
    // Update state with cleaned URLs
    setData(urls);
  };

  const _renderItems = ({item}) => {
    const formattedDate = formatDate(item.order.updatedAt);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.orderIdText}>Order {item.order.id}</Text>
        </View>

        <View style={styles.row1}>
          <View style={styles.row2}>
            <Text style={styles.rateText}>₹{item.order.totalAmount}</Text>
            <Text style={styles.qtyText}>({item.qty} Items)</Text>
          </View>
          <View>
            <Text style={styles.timeText}>{formattedDate}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
      <Header title={'Shop Details'} isBackArrow={true} />

      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          {/* Main Image */}
          <Image
            source={{ uri: shopdetails?.shopImage[0]?.url }}
            style={{
              height: height * 0.16,
              width: width * 0.3,
              borderRadius: 11,
            }}
          />


          {shopdetails?.shopImage?.length > 1 ? (
            <>
              <View style={styles.additionalImagesContainer}>
                {[...Array(Math.ceil(images.length / 2)).keys()].map(pairIndex => (
                  <View key={pairIndex} style={styles.column}>
                    {images.slice(pairIndex * 2, pairIndex * 2 + 2).map((imageUrl, index) => (
                      <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={{
                          height: height * 0.1,
                          width: width * 0.2,
                          borderRadius: 8,
                          marginBottom: 8,
                        }}
                      />
                    ))}
                  </View>
  ))}
              </View>

              {/* Additional Images */}
              {/* <View style={styles.additionalImagesContainer}>

            <View style={styles.column}>
                  {images.slice(0, Math.ceil(images.length / 2)).map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={{
                    height: height * 0.1,
                    width: width * 0.2,
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                />
              ))}
            </View>


            <View style={styles.column}>
                  {images.slice(Math.ceil(images.length / 2)).map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={{
                    height: height * 0.1,
                    width: width * 0.2,
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                />
              ))}
            </View>
          </View> */}
            </>
          ) : null}
        </View>


        <Text style={styles.nameText}>{shopdetails?.shopname}</Text>
        <Text style={styles.locationText}>{shopdetails?.location}</Text>
      </View>
      <Text style={styles.addressTextH}>Address</Text>
      <Text style={styles.addressText}>{shopdetails?.address}</Text>


      <View style={styles.height15} />

      <Text style={styles.addressTextH}>Contact Details</Text>
      <Text style={styles.addressText}>{shopdetails.contectnumber}</Text>
      <Text style={styles.addressText}>{shopdetails.emailId}</Text>
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
          <FilterButton onPress={() => filterPress()} />
        </View>
      </View>
      <FlatList
        data={isSearching ? filteredOrders : shoporders} 
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <_renderItems item={item} />}
        keyExtractor={item => item.id}
      />

      <View style={styles.btnview}>
        <CommonButton
          onPress={() => navigate('EditShop', { locationdata: { latitude: latitude, longitude: longitude } })}
          color={'white'}
          title={'Edit Shop'}
          width={width * 0.9}
          texttitle={'#005A8D'}
        />



      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subContainer: {
    height: height * 0.26,
    width: width * .9,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginTop: 15,
    alignSelf: 'center'
  },
  imageContainer: {
    height: height * 0.2,
    width: width * 0.8,
    // backgroundColor: 'red',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center'
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
    width: width * 0.7,
    marginHorizontal: 5,
    marginBottom: 5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  additionalImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow images to wrap to the next line
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',
    // backgroundColor: 'green',
    width: width / 2.1
    // justifyContent: 'space-between', // Distribute space between columns
  },
  additionalImage: {
    height: height * 0.1,
    width: width * 0.42, // Adjust width to fit two images in a row
    borderRadius: 8,
    marginBottom: 10, // Add some margin between images
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnview: { width: width * .9, marginTop: 1, flexDirection: 'row', padding: 2, alignSelf: 'center' },
});


export default ShopDetails;
