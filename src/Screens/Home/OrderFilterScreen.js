import React, { useState, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { height, width } from '../../Theme/Constants';
import CustomSearch from '../../components/CustomSearch';
import Header from '../../components/Header';
import FilterButton from '../../components/FilterButton';
import HomeScreenSelectable from '../../components/HomeScreenSelectable';
import HomeOrderButton from '../../components/HomeOrderButton';
import FilterModal from '../../components/FilterModal';
import Local from '../../Storage/Local';
import { getOrders, getOrderSearch, getReturnOrder } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setReturnOrders, setDeliveries } from '../../redux/action';

const Data = [
    {
        id: 0,
        orderId: '#1678954621',
        time: '10 mins ago',
        name: ' Supreme SuperMarket',
        rate: 1638,
        qty: 12,
        status: 'Ordered',
    },
    {
        id: 1,
        orderId: '#1678954622',
        time: '20 mins ago',
        name: ' Green SuperMarket',
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
    {
        id: 7,
        orderId: '#1678954622',
        time: '20 mins ago',
        name: ' Green SuperMarket',
        rate: 3896,
        qty: 16,
        status: 'Delivered',
    },
    {
        id: 8,
        orderId: '#1678954623',
        time: '3 hour ago',
        name: ' Golden Stores',
        rate: 4250,
        qty: 10,
        status: 'Draft',
    },
];

const OrderFilterScreen = ({ navigation: { navigate } }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Orders');
    const { orders, filterorder, returnorder, deliveries, loading, error } = useSelector((state) => state.global);
    const [currentPage, setCurrentPage] = useState(1); // Initial page for pagination
    const [pageSize, setPagesize] = useState(0);
    const [UserId, setUserId] = useState(null);
    const dispatch = useDispatch();

    const filterPress = () => {
        navigate('filter');
    };
    useEffect(() => {
        const checkToken = async () => {
            try {
                const userid = await Local.getUserId();
                const delay = 2000; // Delay in milliseconds
                console.log(userid, 'userid kitiyo ?', filterorder)
                setUserId(userid)

                // await GetReturnOrder(userid);
            } catch (error) {
                console.error('Error checking token:', error);

            }
        };

        checkToken();
    }, []);


    const GetReturnOrder = async (userid) => {

        console.log('here search', searchQuery)
        try {
            const response = await getReturnOrder(userid);
            console.log(response, 'return order  api response')
            if (response.message = "Getting Orders data Successfully") {
                dispatch(setReturnOrders(response));
            } else {
                console.log('Error during login:',);
            }
        } catch (error) {
            console.error('Error during login:hwre', error?.message);
            if (error.response && error.response.data && error.response.data.message) {
                // Alert.alert('Error', error.response.data.message);
            } else {
                // Alert.alert('Error', 'An error occurred during login.');
            }
        }
    }

    const _renderItems = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => ''}
                style={styles.itemContainer}>
                <View style={styles.row1}>
                    <Text style={styles.orderIdText}> {item.orderNo}</Text>
                    <Text style={styles.timeText}>Pickup Date  {item.deliveryDate}</Text>

                </View>
                {/* <View style={styles.row1}>
          <Text style={styles.nameText}>{item.shopName}</Text>
          <Text style={styles.timeText}>Delivery Date  {item.deliveryDate}</Text>
        </View> */}
                <View style={styles.row1}>
                    <View style={styles.row2}>
                        <Text style={styles.rateText}>₹{item.totalAmount}</Text>
                        <Text style={styles.qtyText}>({item.qty} Items)</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color:
                                    item.statusId == 3
                                        ? '#D79B00'
                                        : item.statusId == 4
                                            ? '#17A400'
                                            : 'black',
                            }}>
                            {item?.status?.status}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Order'} isNotification={false} isBackArrow={true} />
            {/* <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
        <View
          style={{
            width: width * 0.7,
            marginLeft: 6,
          }}>
          <CustomSearch
            placeholder={'Search Returns'}
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
      </View> */}
            {/* <View style={styles.rowView}>
        <HomeScreenSelectable title={'Todays Offer'} />
        <HomeScreenSelectable title={'Draft'} />
        <HomeScreenSelectable title={'All Orders'} />
      </View> */}

            <FlatList
                data={filterorder}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <_renderItems item={item} />}
                keyExtractor={item => item.id}
            />
            {/* <View style={styles.OrderButton}>
                <HomeOrderButton onpress={() => navigate('AddReturnOrder')} title={'New Return'} />
            </View> */}
            <FilterModal
                visible={modalVisible}
                onPress={() => setModalVisible(false)}
                onApply={() => setModalVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: 'black',
    },
    itemContainer: {
        height: height * 0.11,
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
        fontSize: 12,
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
        width: width * 0.97,
        marginHorizontal: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    OrderButton: {
        position: 'absolute',
        bottom: 13,
        left: 0,
        right: 0,
        height: 40, // Adjust height as needed
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
    },
});

export default OrderFilterScreen;
