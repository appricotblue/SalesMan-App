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
import Local from '../../Storage/Local';





const AddSalesOrder = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [location, setlocation] = useState('');
    const [selectStatus, setSelectStatus] = useState({ id: '', status: 'Select' });
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
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedShop, setSelectedShop] = useState({ id: '', shopname: 'Select' });
    const [UserId, setUserId] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const userid = await Local.getUserId();
                const delay = 2000; // Delay in milliseconds
                console.log(userid, 'userid?')
                setUserId(userid)


            } catch (error) {
                console.error('Error checking token:', error);

            }
        };

        checkToken();
    }, []);


    const isFormValid = () => {
        if (!location) {
            Alert.alert('Error', 'Please select an Order Type');
            return false;
        }
        if (!toDate) {
            Alert.alert('Error', 'Please select a Delivery Date');
            return false;
        }
        if (!shopName) {
            Alert.alert('Error', 'Please enter an Order Number');
            return false;
        }
        if (!selectStatus.id) {
            Alert.alert('Error', 'Please select a Status');
            return false;
        }
        if (!selectedShop.id) {
            Alert.alert('Error', 'Please select a Shop');
            return false;
        }
        if (selectedItems.length === 0) {
            Alert.alert('Error', 'Please select at least one Item');
            return false;
        }
        return true;
    };

    const handleShopSelect = async (shop) => {
        await setSelectedShop(shop);
        console.log(selectedShop?.id, 'shop iddddd')
    };
    const handleStatusSelect = async (item) => {
        await setSelectStatus(item);
        console.log(selectStatus?.id, ' status iddddd')
    };

    const handleorderSelect = async (item) => {
        await setlocation(item);
        console.log(location?.id, ' cat iddddd')
    };

    useEffect(() => {
        // This code will run after selectedShop state is updated
        console.log(selectStatus?.id, 'iddddd')
    }, [selectStatus]);

    useEffect(() => {
        // This code will run after selectedShop state is updated
        console.log(selectedShop?.id, 'iddddd useee');
    }, [selectedShop]);
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
        console.log(formattedDate, 'date to')
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
        GetShops(),
            console.log(shops, 'heree')
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

    const createOrder = async () => {
        if (!isFormValid()) {
            return;
        }
        try {
            const itemIds = selectedItems.map(item => item.id);
            const quantities = selectedItems.map(item => item.count);
            const requestBody = {
                expecteddate: toDate,
                shopId: selectedShop?.id,
                yourearing: 10,
                totalAmount: totalAmount,
                orderNo: 'Order-' + shopName,
                itemId: itemIds,
                status: selectStatus?.id,
                orderType: location?.name,
                quantity: quantities
            };
            console.log(requestBody, 'gettt')

            const response = await fetch(`http://64.227.139.72:8000/user/createorder/${UserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            console.log('Order created:', data);
            navigation.navigate('Home')
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };


    const _renderItems = ({ item }) => {
        const selectedItem = selectedItems.find(selectedItem => selectedItem?.id === item?.id);
        const quantity = selectedItem ? selectedItem.quantity : '';
        return (
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: selectedItem?.image }}
                        style={{ height: 70, width: 72, resizeMode: 'stretch' }}
                    />
                </View>
                <View>
                    <View style={styles.row1}>
                        <Text style={styles.nameText}>{selectedItem?.name}</Text>
                    </View>
                    <View style={styles.row1}>
                        <View style={styles.row2}>
                            <Text style={styles.qtyText}>{selectedItem?.quantity}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * .6 }}>
                        <Text style={styles.rateText}>₹{item?.price}</Text>
                        <View style={{ height: 29, width: 65, borderColor: 'gray', borderWidth: .5, justifyContent: 'center', alignItems: 'center' }} >
                            <TextInput
                                editable={false}
                                style={styles.quantityInput}
                                keyboardType="numeric" // Set keyboard type to numeric for number input
                                placeholder="Qnty"
                                value={item?.count?.toString()}
                                onChangeText={(text) => handleQuantityChange(item.id, text)}

                            />

                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            const filteredItems = selectedItems.filter((selectedItem) => selectedItem?.id !== item?.id);
                            setSelectedItems(filteredItems);
                            handleDeleteItem(item?.id)

                        }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };


    const handleAddItem = () => {
        if (selectedItem && selectedItemQuantity !== '') {
            const count = parseInt(selectedItemQuantity, 10) || 0;
            const newItem = { ...selectedItem, count };

            setSelectedItems([...selectedItems, newItem]);
            setTotalAmount(totalAmount + (newItem.price * count));

            setIsAddItemModalVisible(false);
            setSelectedItem(null);
            setSelectedItemQuantity('');
        }
        else if (selectedItemQuantity == '') {
            // Show validation error or handle invalid quantity input
            Alert.alert('Error', 'Please enter a valid quantity.');
        } else {
            Alert.alert('Error', 'Please select an item to continue');
        }
    };


    const handleQuantityChange = (itemId, count) => {
        const updatedSelectedItems = selectedItems.map(item => {
            if (item.id === itemId) {
                return { ...item, count };
            }
            return item;
        });
        setSelectedItems(updatedSelectedItems);
    };

    const handleDeleteItem = (itemId) => {

        const itemToDelete = selectedItems.find(item => item.id === itemId);
        if (itemToDelete) {
            const itemValue = itemToDelete.price * itemToDelete.count;
            const updatedItems = selectedItems.filter(item => item.id !== itemId);
            setTotalAmount(totalAmount - itemValue);
            setSelectedItems(updatedItems);
        }
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
                                value={location ? location.name : 'Select'}
                                options={categories}
                                onSelect={handleorderSelect}
                                displayProperty="name"
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
                                value={selectStatus ? selectStatus.status : 'Select'}
                                options={status}
                                onSelect={handleStatusSelect}
                                displayProperty="status"
                            />
                        </View>
                    </View>

                    <CustomSelectionBox
                        title={'Select shop'}
                        value={selectedShop ? selectedShop.shopname : 'Select'}
                        options={shops}
                        onSelect={handleShopSelect}
                        displayProperty="shopname" // Specify the property to display as shop name
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
                <View style={{
                    width: width * 1, alignSelf: 'center', marginTop: 5, paddingBottom: 20, height: height * .8, backgroundColor: 'white',


                    shadowColor: '#000',
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 5,
                }}>
                    <View style={{ width: width * .9, justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'center' }}>
                        <Text style={styles.subtitle}>Total Amount</Text>
                        <Text style={[styles.title, { color: 'black' }]}>₹{totalAmount}</Text>
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
                            onPress={() => createOrder()}
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
                                                value={selectedItemQuantity}
                                                onChangeText={(text) => { handleQuantityChange(item.id, text), setSelectedItemQuantity(text) }} // Update state with entered value
                                            />

                                        </View>
                                        <TouchableOpacity style={styles.addButton} onPress={() => {
                                            handleAddItem,
                                                setSelectedItem(item)
                                        }}>
                                            <Text style={{ color: 'white', fontSize: 16 }}>Select</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item?.id}
                    />
                    <View style={{ justifyContent: 'space-between', width: width - 150, flexDirection: 'row', marginBottom: 10 }}>
                    <Button title="Confirm" onPress={handleAddItem} />
                    <Button title="Cancel" onPress={() => setIsAddItemModalVisible(false)} />
                    </View>

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
    btnview: {
        width: width * .9,
        marginTop: 1,
        flexDirection: 'row',
        padding: 2,
        justifyContent: 'space-between',
        alignSelf: 'center'


    },

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
