import React, { useState, useEffect } from 'react';
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
import Local from '../../Storage/Local';
import { getOrders, getEarnings, getDeliveries } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setEarnings, setItems } from '../../redux/action';

const MyEarnings = () => {
  const { earnings, profile, loading, error } = useSelector((state) => state.global);
  const [currentPage, setCurrentPage] = useState(1); // Initial page for pagination
  const [pageSize, setPagesize] = useState(0);
  const [UserId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const data = [
    {
      id: '1',
      title: 'Order#1345333667',
      date: '12:05 PM | Oct 5, 2023',
      amount: '₹200',
    },
    {
      id: '2',
      title: 'Order#1345333667',
      date: '12:05 PM | Oct 5, 2023',
      amount: '₹200',
    },
    {
      id: '3',
      title: 'Order#1345333667',
      date: '12:05 PM | Oct 5, 2023',
      amount: '₹200',
    },
    {
      id: '4',
      title: 'Order#1345333667',
      date: '12:05 PM | Oct 5, 2023',
      amount: '₹200',
    },

  ];

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userid = await Local.getUserId();
        const delay = 2000; // Delay in milliseconds
        console.log(userid, 'userid kitiyo ?', earnings)
        setUserId(userid)
        GetEarnings(userid)
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };
    checkToken();
  }, []);

  const GetEarnings = async (userid, page = currentPage) => {
    console.log('here search', userid, page)
    try {
      const response = await getEarnings(userid, page);
      console.log(response, 'earings api response')
      setPagesize(response?.totalPages)
      const newEarnings = response.orders;
      const updatedEarnings = [...earnings, ...newEarnings];
      dispatch(setEarnings(updatedEarnings));
      if (response.message = "Getting Orders data Successfully") {
      } else {
        console.log('Error during login:',);
      }
    } catch (error) {
      console.error('Error during login:hwre', error?.message);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };


  const loadMore = () => {
    console.log(currentPage, pageSize, 'pagesss')
    if (currentPage < pageSize) {
      setCurrentPage(currentPage + 1);
      GetEarnings(UserId, currentPage + 1);
    }
  };
  const ListItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log('Item pressed')}>
      <View>
        <Text style={styles.itemtitle}>{item.orderNo}</Text>
        <Text style={styles.subtitle}>{item.updatedAt}</Text>
      </View>

      <Text style={styles.title}>{item.totalAmount}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <Header title={'My Earnings'} isBackArrow={true} />
      <View style={styles.container}>
        <View style={styles.earningsview}>
          <TouchableOpacity style={styles.subearn}>
            <Text style={styles.title}>{profile.myearning} </Text>
            <Text style={styles.subtitle}>My earnings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subearn}>
            <Text style={styles.title}>{profile.orders}</Text>
            <Text style={styles.subtitle}> Orders</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={earnings}
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={loadMore} // Call loadMore function when user reaches the end of the list
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: 'center',

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
  title: {color: '#005A8D', fontSize: 20, fontFamily: 'Inter-Bold'},
  subtitle: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  earningsview: {
    height: height * 0.15,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subearn: {
    height: height * 0.15,
    width: width * 0.5,
    backgroundColor: '#f4f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: width,
  },
  itemtitle: {
    fontSize: 18,
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

export default MyEarnings;
