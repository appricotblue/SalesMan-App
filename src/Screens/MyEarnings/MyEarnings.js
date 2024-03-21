import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity ,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { height, width } from '../../Theme/Constants';
import images from '../../assets/Images';

const MyEarnings = () => {

  const data = [
    { id: '1', title: 'Order#1345333667',date:'12:05 PM | Oct 5, 2023', amount: '₹200' },
    { id: '2', title: 'Order#1345333667',date:'12:05 PM | Oct 5, 2023', amount: '₹200' },
    { id: '3', title: 'Order#1345333667',date:'12:05 PM | Oct 5, 2023', amount: '₹200'  },
    { id: '4', title: 'Order#1345333667', date:'12:05 PM | Oct 5, 2023' ,amount: '₹200'  },
    // Add more items as needed
  ];
  
  const ListItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => console.log('Item pressed')}>
    <View>
    <Text style={styles.itemtitle}>{item.title}</Text>
    <Text style={styles.subtitle}>{item.date}</Text>
    </View>
    
      <Text style={styles.title}>{item.amount}</Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView >
      <Header title={'My Earnings'} />
      <View style={styles.container}>   
        <View style={styles.earningsview}>
          <TouchableOpacity style={styles.subearn}>
            <Text style={styles.title}>₹80,000   </Text>
            <Text style={styles.subtitle}>My earnings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subearn}>
            <Text style={styles.title}>272 </Text>
            <Text style={styles.subtitle}> Orders</Text>
          </TouchableOpacity>
        </View>
        <FlatList
        data={data}
        renderItem={({ item }) => <ListItem item={item} />}
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
  imageview: { height: height * .3, width: width, justifyContent: 'center', alignItems: 'center', },
  image: { width: 132, height: 132, borderRadius: 70 },
  title: { color: '#005A8D', fontSize: 20, fontFamily: 'Inter-Bold'},
  subtitle: { color: '#00000', fontSize: 14, fontFamily: 'Inter-Regular', marginTop: 4 },
  earningsview: { height: height * .15, width: width, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  subearn: { height: height * .15, width: width * .5, backgroundColor: '#f4f8fa', justifyContent: 'center', alignItems: 'center', borderWidth: .5, borderColor: 'gray' },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width:width
  },
  itemtitle: {
    fontSize: 18,
   fontFamily: 'Inter-Regular',
   color:'black'
    
  },
  icon: {
    marginRight: 20,
    width:25,
    height:28,
    marginLeft:20
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default MyEarnings;
