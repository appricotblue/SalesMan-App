import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../assets/Images';
// import { width } from '../Theme/Constants';
import CustomSelectionBox from './CustomSelectionBox';
import { height, width } from '../Theme/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { setRouteItem, setItems, setOrderDetails, setDeliveries, setRoute } from './../redux/action';

const Header = ({ title, isBackArrow, isNotification, isRouteview, onSelectLocation }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [location, setlocation] = useState({ id: '', LocationName: 'All Location' });
  const [categories, setCategories] = useState([{ id: 1, name: 'sales' }]);
  const [showOptions, setShowOptions] = useState(false);
  const { route, deliveries, loading, error } = useSelector((state) => state.global);
  const Data = [
    {
      id: 0,
      orderId: '#1678954621',
      time: 'All Routes',
      name: 'All Routes',
      rate: 1638,
      qty: 12,
      status: 'Ordered',
    },
    {
      id: 1,
      orderId: '#1678954622',
      time: '20 mins ago',
      name: 'kakkanad',
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

  ];
  const handleOrderSelect = (item) => {
    setlocation(item);
    dispatch(setRouteItem(item))
    setShowOptions(false);
    onSelectLocation(item?.id)
  };


  const _renderItems = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleOrderSelect(item)} style={styles.itemContainer}>
        <View style={styles.row1}>
          <Text style={styles.orderIdText}>{item?.LocationName}</Text>
        </View>
        {/* Add other views for other data properties */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: 'row' }}>
        {isBackArrow && (
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.goBack()}>
            <Image source={images.ArrowLeft} style={styles.arrowStyle} />
          </TouchableOpacity>
        )}
        <Text style={styles.titleStyle}>{title}</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {isRouteview && (
          <TouchableOpacity onPress={() => setShowOptions(true)} style={styles.routeview}>
            {/* <Text style={{ color: 'white', fontSize: 9 }}></Text> */}
            <Text style={{ color: 'white', fontSize: 11 }}>{location?.LocationName}</Text>
            <Image source={images.Arrowdown} style={styles.arrowDown} />
          </TouchableOpacity>
        )}

        {isNotification && (
          <TouchableOpacity style={styles.iconStyle}>
            <Image style={{ width: 18, height: 23, marginHorizontal: 10 }} source={images.Notification} />
          </TouchableOpacity>
        )}
      </View>

      {/* <Modal visible={showOptions} transparent={false} onRequestClose={() => setShowOptions(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowOptions(false)} style={styles.closeButton}>
            <Text style={{ color: 'green' }}>Close</Text>
          </TouchableOpacity>
          <View>
            <FlatList
              data={route}
              showsVerticalScrollIndicator={false}
              renderItem={_renderItems}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>


        </View>
      </Modal> */}
      <Modal visible={showOptions} transparent={true} onRequestClose={() => setShowOptions(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>All Routes</Text>
              <TouchableOpacity onPress={() => setShowOptions(false)} style={styles.closeButton}>

                <Image source={images.close} style={styles.arrowStyle} />
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={route}
                showsVerticalScrollIndicator={false}
                renderItem={_renderItems}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#003451',
    width: width * 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowStyle: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  arrowDown: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginLeft: 5
  },
  titleStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconStyle: {
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeview: {
    borderColor: 'white',
    borderWidth: 1,
    width: 95,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 15,
  },
  modalContainer: {
    height: height - 250,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 100
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center'
  },
  closeButton: {
    // position: 'absolute',

    height: height * .05,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'

  },
  itemContainer: {
    height: height * 0.05,
    width: width * 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    padding: 8,
  },
  row1: {
    width: width * 0.96,
    height: height * 0.03,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: 'red'
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: 300,
    minHeight: 200,
    maxHeight: 350,
    borderRadius: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003451',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  listItemText: {
    color: 'black',
  },
  selectedItem: {
    backgroundColor: '#003451',
  },
});

export default Header;
