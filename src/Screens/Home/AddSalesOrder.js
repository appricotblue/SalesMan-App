import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Modal,
    Button,
    TextInput,
    Alert
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
import { setStatus, setShopList, setShopItems } from '../../redux/action';
import { getOrderStatus, getShopLists, getShopItems, getItemSearch } from '../../api';


const AddSalesOrder = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [location, setlocation] = useState('');
    const [selectStatus, setSelectStatus] = useState('');
    const [selectShop, setSelectShop] = useState('');

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([{ id: 1, name: 'sales' },]);
    const [statuses, setStatuses] = useState(['Ordered', 'Invoiced', 'In transist', 'Delivered']);

    const [isFromDatePickerVisible, setFromDatePickerVisibility] =
        useState(false);
    const [shopName, setShopName] = useState('');
    const [checkshopName, changecheckshopName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { status, shops, searchshopitems } = useSelector((state) => state.global);
    const [statusOptions, setStatusOptions] = useState([]);
    const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemQuantity, setSelectedItemQuantity] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

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
        // GetShopsItems()
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
        setIsAddItemModalVisible(true)
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
        setSearchQuery(tesdffdf);
        // GetItems();
    };
    const _renderItems = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item?.image }}
                        style={{ height: 70, width: 72, resizeMode: 'stretch' }}
                    />
                </View>
                <View>
                    <View style={styles.row1}>
                        <Text style={styles.nameText}>{item?.name}</Text>
                    </View>
                    <View style={styles.row1}>
                        <View style={styles.row2}>
                            <Text style={styles.qtyText}>{item?.quantity}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * .6 }}>
                        <Text style={styles.rateText}>₹{item?.price}</Text>
                        <View style={{ height: 29, width: 65, borderColor: 'gray', borderWidth: .5, justifyContent: 'center', alignItems: 'center' }} >
                            <TextInput
                                style={styles.quantityInput}
                                keyboardType="numeric" // Set keyboard type to numeric for number input
                                placeholder="Qnty"
                                value={itemQuantity}
                                onChangeText={(text) => setItemQuantity(text)} // Update state with entered value
                            />

                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            const filteredItems = selectedItems.filter((selectedItem) => selectedItem?.id !== item?.id);
                            setSelectedItems(filteredItems);
                            // setSelectedItem(item);
                            // setIsAddItemModalVisible(true);
                        }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };


    const handleAddItem = () => {
        // Add the selected item to the selectedItems array
        setSelectedItems([...selectedItems, selectedItem]);
        setIsAddItemModalVisible(false);
        setSelectedItem(null);
        setSelectedItemQuantity('');
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
                                options={categories.map(item => item.name)}
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
                    <Text style={styles.subtitle}>Select Item</Text>
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
                        // data={searchshopitems}
                        data={selectedItems}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <_renderItems item={item} />}
                        keyExtractor={item => item?.id}
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={isAddItemModalVisible}
                onRequestClose={() => {
                    setIsAddItemModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add Item</Text>
                    <FlatList
                        data={searchshopitems}
                        // data={selectedItems} // Display only the selected item
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: item?.image }}
                                        style={{ height: 70, width: 72, resizeMode: 'stretch' }}
                                    />
                                </View>
                                <View>
                                    <View style={styles.row1}>
                                        <Text style={styles.nameText}>{item.name}</Text>
                                    </View>
                                    <View style={styles.row1}>
                                        <View style={styles.row2}>
                                            <Text style={styles.qtyText}>{item.quantity}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * .6 }}>
                                        <Text style={styles.rateText}>₹{item.price}</Text>

                                        <View style={{ height: 29, width: 65, borderColor: 'gray', borderWidth: .5, justifyContent: 'center', alignItems: 'center' }} >

                                            <TextInput
                                                style={styles.quantityInput}
                                                keyboardType="numeric" // Set keyboard type to numeric for number input
                                                placeholder="Qnty"
                                                value={itemQuantity}
                                                onChangeText={(text) => setItemQuantity(text)} // Update state with entered value
                                            />

                                        </View>
                                        <TouchableOpacity style={styles.addButton} onPress={() => {
                                            handleAddItem,
                                                setSelectedItem(item)
                                            // setIsAddItemModalVisible(false)

                                        }}>
                                            <Text style={{ color: 'white', fontSize: 16 }}>Select</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item?.id}
                    />
                    <Button title="Confirm" onPress={handleAddItem} />
                    <Button title="Cancel" onPress={() => setIsAddItemModalVisible(false)} />
                </View>
            </Modal>
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
    totalview: { width: width * .91, marginTop: 5, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#D9D9D9', padding: 5 },
    addButton: {
        backgroundColor: '#005A8D',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    modalItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    modalItemName: {
        fontSize: 16,
    },
    quantityInput: {
        left: 2,
        width: '90%',
        minHeight: 50,
    }
});

export default AddSalesOrder;
