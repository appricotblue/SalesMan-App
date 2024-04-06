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
import { getProfile } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, setItems } from '../../redux/action';

const UserScreen = () => {
  const navigation = useNavigation();
  const { profile, loading, error } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const data = [
    { id: '1', title: profile.name, iconName: images.User },
    {
      id: '2',
      title: profile.emailId,
      iconName: images.Envelope,
    },
    { id: '3', title: profile.phonenumber, iconName: images.Call },
    {id: '4', title: 'Log Out', iconName: images.Logout},
    // Add more items as needed
  ];

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userid = await Local.getUserId();
        const delay = 2000; // Delay in milliseconds
        console.log(userid, 'userid kitiyo ?')
        GetProfile(userid)
      } catch (error) {
        console.error('Error checking token:', error);

      }
    };

    checkToken();
  }, []);

  const GetProfile = async (userid) => {
    console.log('here', userid)
    try {
      const response = await getProfile(userid);

      dispatch(setProfile(response));
      console.log(response, 'userid api response')
      if (response.message = "Getting Orders data Successfully") {
        dispatch(setProfile(response));
      } else {
        console.log('Error during login:',);
        // setError(response.data.message);
      }
    } catch (error) {
      // Alert(error)
      console.error('Error during login:hwre', error?.message);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };

  const ListItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log('Item pressed')}>
      <Image source={item.iconName} resizeMode="stretch" style={styles.icon} />
      <Text style={styles.itemtitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <Header title={'User'} isNotification={true} />
      <View style={styles.container}>
        <View style={styles.imageview}>
          <Image source={{ uri: profile.userProfileImage }} style={styles.image} />
          <Text style={styles.title}>{profile.name}</Text>
          <Text style={styles.subtitle}>{profile.role}</Text>
        </View>
        <View style={styles.earningsview}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyEarnings')}
            style={styles.subearn}>
            <Text style={styles.title}>{profile.myearning}</Text>
            <Text style={styles.subtitle}>My earnings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subearn}>
            <Text style={styles.title}>{profile.orders} </Text>
            <Text style={styles.subtitle}> Orders</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  title: {
    color: '#005A8D',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginTop: 15,
  },
  subtitle: {
    color: 'grey',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 15,
  },
  earningsview: {
    height: height * 0.2,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: width,
  },
  itemtitle: {
    fontSize: 18,
    marginLeft: 10,
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

export default UserScreen;
