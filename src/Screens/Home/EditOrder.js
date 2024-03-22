import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { height, width } from '../../Theme/Constants';
import images from '../../assets/Images';
import CommonButton from '../../components/CommonButton';
import CustomSearch from '../../components/CustomSearch';

const EditOrder = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const Data = [
        {
            id: 0,
            orderId: '#1678954621',
            time: '10 mins ago',
            name: 'Nirapara Ragi Puttu Podi',
            rate: 1638,
            qty: '500g',
            status: 'Ordered',
            location: 'Aluva',
            orders: '1 New Order',
            image: images.png2,
        },
        {
            id: 1,
            orderId: '#1678954622',
            time: '20 mins ago',
            name: 'Nirapara Corn Puttu Podi',
            rate: 3896,
            qty: '200g',
            status: 'Delivered',
            location: 'Ponikkara',
            orders: '1 New Order',
            image: images.png1,
        },
        {
            id: 2,
            orderId: '#1678954623',
            time: '30 mins ago',
            name: 'Nirapara Oats Puttu Podi',
            rate: 4250,
            qty: '500g',
            status: 'Draft',
            location: 'Kakkanad',
            orders: '',
            image: images.png3,
        },
        {
            id: 3,
            orderId: '#1678954621',
            time: '10 mins ago',
            name: 'Nirapara Kashmiri Chilli Powder',
            rate: 1638,
            qty: '200g',
            status: 'Ordered',
            location: 'Fort Kochi',
            orders: '',
            image: images.png1,
        },
        {
            id: 4,
            orderId: '#1678954622',
            time: '20 mins ago',
            name: 'Nirapara Oats Puttu Podi',
            rate: 3896,
            qty: '200g',
            status: 'Delivered',
            location: 'Edachira',
            orders: '',
            image: images.png3,
        },
        {
            id: 5,
            orderId: '#1678954623',
            time: '30 mins ago',
            name: 'Nirapara Pepper Powder',
            rate: 4250,
            qty: '200g',
            status: 'Draft',
            location: 'Ponikkara',
            orders: '',
            image: images.png1,
        },
        {
            id: 6,
            orderId: '#1678954621',
            time: '1 hour ago',
            name: 'Nirapara Oats Puttu Podi',
            rate: 1638,
            qty: '200g',
            status: 'Ordered',
            location: 'Fort Kochi',
            orders: '',
            image: images.png3,
        },
        {
            id: 7,
            orderId: '#1678954622',
            time: '20 mins ago',
            name: 'Nirapara Oats Puttu Podi',
            rate: 3896,
            qty: '200g',
            status: 'Delivered',
            location: 'Kakkanad',
            orders: '',
            image: images.png1,
        },
        {
            id: 8,
            orderId: '#1678954623',
            time: '3 hour ago',
            name: ' Nirapara Pepper Powder',
            rate: 4250,
            qty: '200g',
            status: 'Draft',
            location: 'Fort Kochi',
            orders: '',
            image: images.png3,
        },
    ];

    const _renderItems = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={item.image}
                        style={{ height: 70, width: 72, resizeMode: 'stretch' }}
                    />
                </View>
                <View>
                    <View style={styles.row1}>
                        <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                    <View style={styles.row1}>
                        <View style={styles.row2}>
                            <Text style={styles.qtyText}>{item.qty}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:width*.6}}>
                    <Text style={styles.rateText}>₹{item.rate}</Text>
                    
                    <View style={{height:25,width:55,borderColor:'gray',borderWidth:.5,justifyContent:'center',alignItems:'center'}} >
                    <Text style={{fontSize:15,color:'black'}}>15</Text>
                    </View>
                    </View>
               
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <Header title={'Edit Order'} isBackArrow={true} />
            <View style={styles.container}>
                <View style={styles.mainview}>
                    <View style={styles.earningsview}>
                        <TouchableOpacity style={styles.subearn}>

                            <Text style={styles.subtitle}>Order Type</Text>
                            <Text style={styles.title}>March 12,2024 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.subearn}>

                            <Text style={styles.subtitle}>Expected Delivery</Text>
                            <Text style={styles.title}>March 13,2024</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.subtitle}>Select shop</Text>
                    <View
                        style={{
                            width: width * 0.8,
                            marginLeft: 6,
                        }}>
                        <CustomSearch
                            placeholder={'Search Items'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onClear={() => setSearchQuery('')}
                        />
                    </View>

                    <Text style={styles.subtitle}>Selec Item</Text>
                    <View
                        style={{
                            width: width * 0.8,
                            marginLeft: 6,
                        }}>
                        <CustomSearch
                            placeholder={'Search Items'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onClear={() => setSearchQuery('')}
                        />
                    </View>

                </View>

                <View style={styles.listview}>
                    <FlatList
                        data={Data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <_renderItems item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={{ width: width * .9, alignSelf: 'center', marginTop: 10, paddingBottom: 20 }}>
                    <View style={{ width: width * .9, marginTop: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.subtitle}>Total Amount</Text>
                        <Text style={[styles.title, { color: 'black' }]}>₹6200</Text>

                    </View>
                    <View style={styles.btnview}>
                        <CommonButton
                            onPress={() => isValidate()}
                            color={'white'}
                            title={'Save as Draft'}
                            width={width * 0.4}
                            texttitle={'#005A8D'}
                        />
                        <CommonButton
                            onPress={() => isValidate()}
                            color={'#005A8D'}
                            title={'Create Order'}
                            width={width * 0.4}
                            texttitle={'white'}
                        />


                    </View>
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
    mainview: { width: width * .9, alignSelf: 'center', marginTop: 10, borderBottomColor: 'gray', borderBottomWidth: .5, paddingBottom: 20 },
    text: {
        color: 'black',
    },
    imageview: {
        height: height * 0.3,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnview: { width: width * .9, marginTop: 10, flexDirection: 'row', padding: 5, justifyContent: 'space-between' },

    image: { width: 132, height: 132, borderRadius: 70 },
    title: { color: 'black', fontSize: 16, fontFamily: 'Inter-Regular' },
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
        width: width * .9,
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
    imageContainer: {
        height: height * 0.09,
        width: width * 0.2,
        backgroundColor: 'pink',
        marginHorizontal: 3,
        marginRight: 25,
    },
    row1: {
        width: width * 0.96,
        height: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor:'red'
    },
    row2: {
        flexDirection: 'row',
        marginTop: 3,
        alignItems: 'center',
    },
    orderIdText: {
        color: 'grey',
        fontSize: 12,
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
        marginTop: 3,
      },
      qtyText: {
        color: 'grey',
        fontSize: 14,
      },
    listview: { width: width * .9, alignSelf: 'center', height: height * .39, marginTop: 10, borderBottomColor: 'gray', borderBottomWidth: .5, paddingBottom: 20 }
});

export default EditOrder;
