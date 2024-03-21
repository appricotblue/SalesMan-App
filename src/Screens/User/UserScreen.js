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

const UserScreen = () => {
  const navigation = useNavigation();

  const data = [
    {id: '1', title: 'Stephen Devassy', iconName: images.User},
    {
      id: '2',
      title: 'stephendevassy@nirapara.co.in',
      iconName: images.Envelope,
    },
    {id: '3', title: '+91 9567946943', iconName: images.Call},
    {id: '4', title: 'Log Out', iconName: images.Logout},
    // Add more items as needed
  ];

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
          <Image source={images.Stephen} style={styles.image} />
          <Text style={styles.title}>Stephen Devassy </Text>
          <Text style={styles.subtitle}>Sales Representative, Nirapara </Text>
        </View>
        <View style={styles.earningsview}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyEarnings')}
            style={styles.subearn}>
            <Text style={styles.title}>₹80,000 </Text>
            <Text style={styles.subtitle}>My earnings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subearn}>
            <Text style={styles.title}>272 </Text>
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
