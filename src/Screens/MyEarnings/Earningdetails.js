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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { height, width } from '../../Theme/Constants';
import images from '../../assets/Images';
import CommonButton from '../../components/CommonButton';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const Earningdetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { earningDetails } = route.params;
    const { earndetails, orderdetails, loading, error } = useSelector((state) => state.global);
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
        const { data } = route?.params;
        console.log(' movies?', earningDetails)

        // setlocationdata(data)
    }, []);

    const ListItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => console.log('Item pressed')}>
            <View>
                <Text style={styles.itemtitle}>{item?.itemName}</Text>
                <Text style={styles.subtitle}>₹{item.itemCommission} X {item.quantity}</Text>
            </View>

            <Text style={styles.title}>₹{item?.totalAmount} </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            <Header title={'Earning Details'} isBackArrow={true} />
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.earningsview}>
                        <TouchableOpacity style={styles.subearn}>
                            <Text style={styles.title}>{earningDetails} </Text>
                            <Text style={styles.subtitle}>Total earnings</Text>
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{ width: width * .9, alignSelf: 'center', marginTop: 10, paddingBottom: 20 }}>
                        {earndetails.map((item, index) => {
                            return (
                                <ListItem item={item} />
                            )
                        })}

                    </View>
                </ScrollView>


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
        height: height * 0.15,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    subearn: {
        height: height * 0.1,
        width: width * 0.5,
        backgroundColor: '#f4f8fa',
        justifyContent: 'center',
        alignItems: 'center',

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
        fontSize: 16,
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
    btnview: {
        width: width * .9,
        marginTop: 1,
        flexDirection: 'row',
        padding: 2,
        justifyContent: 'space-between'
    },
    flatlistview: {
        width: width * .9,
        alignSelf: 'center',
        minHeight: height * .34,
        marginTop: 10,
        // borderBottomColor: 'red',
        // borderBottomWidth: .5,
        paddingBottom: 20
    },
    totalview: {
        width: width * .91,
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        padding: 5
    }
});

export default Earningdetails;
