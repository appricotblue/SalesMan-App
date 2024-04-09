import React, { useState,useEffect } from 'react';
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
import Calander from '../../components/Calander';
import CustomSelectionBox from '../../components/CustomSelectionBox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomTextInput from '../../components/CustomTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus,setShopList,setShopItems } from '../../redux/action';
import { getOrderStatus,getShopLists,getShopItems,getItemSearch } from '../../api';


const AddSalesOrder = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [location, setlocation] = useState('');
    const [selectStatus, setSelectStatus] = useState('');
    const [selectShop, setSelectShop] = useState('');

    const dispatch = useDispatch();
    const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3']);
    const [statuses, setStatuses] = useState(['Ordered', 'Invoiced', 'In transist','Delivered']);

    const [isFromDatePickerVisible, setFromDatePickerVisibility] =
        useState(false);
    const [shopName, setShopName] = useState('');
    const [checkshopName, changecheckshopName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { status,shops,searchshopitems } = useSelector((state) => state.global);
    const [statusOptions, setStatusOptions] = useState([]);

    const onShowCalander = () => {
        setDatePickerVisibility(true);
    };

    const onCloseCalander = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.log(date, 'from date ')
        const formattedDate = date.toISOString().split('T')[0];
        console.log(formattedDate, 'date from')
        setFromDate(formattedDate);
        onCloseCalander();
    };

    const handleFromConfirm = date => {
        console.log(date, 'to date ')
        const formattedDate = date.toISOString().split('T')[0];
        setToDate(formattedDate);

        onCloseFromCalander();
    };
    const onShowFromCalander = () => {
        setFromDatePickerVisibility(true);
    };
    const onCloseFromCalander = () => {
        setFromDatePickerVisibility(false);
    };

useEffect(() => {
    GetStatuses()
    GetShops()
    GetShopsItems()
}, [])

    


    const GetStatuses = async () => {
        try {
          const response = await getOrderStatus();
          dispatch(setStatus(response.status));
        } catch (error) {
          console.log(error)
    
        }
      };
      const GetShops = async () => {
        try {
          const response = await getShopLists();
          dispatch(setShopList(response.shops));
        } catch (error) {
          console.log(error)
    
        }
      };

      const GetShopsItems = async () => {
        try {
          const response = await getItemSearch(searchQuery);
          dispatch(setShopItems(response));
        } catch (error) {
          console.log(error)
        }
      };

      const handleSearchChange = (text) => {
        setSearchQuery(text);
      };
    
      const handleClearSearch = () => {
        setSearchQuery('');
        GetItems(); 
      };

      
   




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
                        source={{uri :item.image}}
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * .6 }}>
                        <Text style={styles.rateText}>₹{item.rate}</Text>

                        <View style={{ height: 25, width: 55, borderColor: 'gray', borderWidth: .5, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 15, color: 'black' }}>15</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <Header title={'Add Sales Order'} isBackArrow={true} />
            {/* <ScrollView> */}
            <View style={styles.container}>
                <View style={styles.mainview}>
                    <View style={styles.earningsview}>
                        <View style={styles.fromView}>
                            <CustomSelectionBox
                                title={'Order Type'}
                                value={location == '' ? 'Select' : location}
                                options={categories}
                                onSelect={category => setlocation(category)}
                            />
                        </View>
                        <View style={styles.toView}>
                            <Text style={styles.toText}>Delivery Date</Text>
                            <Calander date={toDate} onPress={() => onShowFromCalander()} />
                        </View>
                    </View>
                    <View style={styles.earningsview}>
                        <View style={styles.fromView}>
                            <CustomTextInput
                                title={'Order No'}
                                placeholder="Enter Order No"
                                errorText={checkshopName}
                                inputwidth={width * .35}
                                onChangeText={text => {
                                    setShopName(text);
                                    changecheckshopName('');
                                }}
                                value={shopName}
                            />
                        </View>
                        <View style={styles.toView}>
                            <CustomSelectionBox
                                title={'Status'}
                                value={selectStatus == '' ? 'Select' : selectStatus}
                                options={status.map(item => item.status)}
                                onSelect={item => setSelectStatus(item)}
                            />
                        </View>
                    </View>
                    <CustomSelectionBox
                        title={'Select shop'}
                        value={selectShop == '' ? 'Select' : selectShop}
                        options={shops.map(item => item.shopname)}
                        onSelect={item => setSelectShop(item)}
                    />
                    <Text style={styles.subtitle}>Select shop</Text>
                    <View
                        style={{
                            width: width * 0.9,
                        }}>
                        <CustomSearch
                            placeholder={'Search Items'}
                            value={searchQuery}
                            onChangeText={handleSearchChange}
                            onClear={handleClearSearch}
                            onSubmit={GetShopsItems}
                        />
                    </View>
                </View>
                <View style={styles.listview}>
                    <FlatList
                        data={searchshopitems}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <_renderItems item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={{ width: width * .9, alignSelf: 'center', marginTop: 0, paddingBottom: 20, height: height * .8, }}>
                    <View style={{ width: width * .9, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.subtitle}>Total Amount</Text>
                        <Text style={[styles.title, { color: 'black' }]}>₹6200</Text>
                    </View>
                    <View style={styles.totalview}>
                        <Text style={[styles.subtitle, { color: '#117C00' }]}>Your Earnings</Text>
                        <Text style={[styles.title, { color: '#117C00' }]}>₹6200</Text>

                    </View>
                    <View style={styles.btnview}>
                        <CommonButton
                            onPress={() => ''}
                            color={'white'}
                            title={'Save as Draft'}
                            width={width * 0.4}
                            texttitle={'#005A8D'}
                        />
                        <CommonButton
                            onPress={() => ''}
                            color={'#005A8D'}
                            title={'Create Order'}
                            width={width * 0.4}
                            texttitle={'white'}
                        />


                    </View>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={isFromDatePickerVisible}
                mode="date"
                onConfirm={handleFromConfirm}
                onCancel={onCloseFromCalander}

            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={onCloseCalander}
            />
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        height: height,
        // alignItems: 'center',

        backgroundColor: '#FFffff',
    },
    mainview: { width: width * .9, alignSelf: 'center', marginTop: 3, },
    text: {
        color: 'black',
    },
    imageview: {
        height: height * 0.3,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnview: { width: width * .9, marginTop: 1, flexDirection: 'row', padding: 2, justifyContent: 'space-between' },

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
        width: width - 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
        // backgroundColor: 'green'
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
        paddingVertical: 10,

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
    listview: { width: width * .9, alignSelf: 'center', height: height * .34, marginTop: 3, paddingBottom: 10 },
    fromView: {
        height: height * 0.1,
        width: width * 0.33,
        paddingTop: 8,
        // backgroundColor: 'red'
    },
    fromText: {
        color: 'black',
        fontSize: 14,
    },
    toView: {
        height: height * 0.1,
        width: width * 0.33,
        paddingTop: 8,
        // backgroundColor: 'red'
    },
    toText: {
        color: 'black',
        fontSize: 14,
    },
    totalview: { width: width * .91, marginTop: 5, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#D9D9D9', padding: 5 }

});

export default AddSalesOrder;
