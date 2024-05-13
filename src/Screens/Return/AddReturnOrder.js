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
import { setStatus, setShopList, setShopItems, setReturnOrders } from '../../redux/action';
import { getOrderStatus, getShopLists, getReturnOrder, getItemSearch } from '../../api';
import Local from '../../Storage/Local';
import moment from 'moment';
import { env_dev } from "../../env/Dev";



const AddReturnOrder = () => {
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
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedItemCommission, setSelectedItemCommission] = useState('');
    const [itemQuantities, setItemQuantities] = useState({});
    const [totalCommission, setTotalCommission] = useState(0);



    useEffect(() => {
        const checkToken = async () => {
            try {
                const userid = await Local.getUserId();
                const delay = 2000; // Delay in milliseconds
                console.log(userid, 'userid  ?')
                setUserId(userid)
                GetShops(userid)

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
    const GetShops = async (userid) => {
        try {
            const response = await getShopLists(userid);
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
                deliveryDate: toDate,
                shopId: selectedShop?.id,
                yourearing: 0,
                totalAmount: totalAmount,
                orderNo: 'RTN-' + shopName,
                itemId: itemIds,
                statusId: selectStatus?.id.toString(),
                orderType: location?.name,
                quantity: quantities
            };
            console.log(requestBody, UserId, 'gettt')

            const response = await fetch(env_dev + `/user/createReturnOrder/${UserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            Alert.alert(data.message)
            console.log('Order created:', data);
            GetReturnOrder(UserId)
            // navigation.navigate('Return')
            // if (data.message == 'Return order created successfully') {
            //     navigation.navigate('Return')
            // }

        } catch (error) {
            const data = await response.json();
            Alert.alert(data.message)
            console.error('Error creating order:', error);
        }
    };

    const GetReturnOrder = async (userid) => {

        console.log('here search return', userid, searchQuery)
        try {
            const response = await getReturnOrder(userid);
            console.log(response, 'return order  api response')
            dispatch(setReturnOrders(response));
            navigation.navigate('Return')
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

                                editable={true}
                                style={styles.quantityInput}
                                keyboardType="numeric" // Set keyboard type to numeric for number input
                                placeholder="Qnty"
                                placeholderTextColor={'gray'}
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
            const existingItem = selectedItems.find(item => item.id === selectedItem.id);

            if (existingItem) {
                // Item already exists, update the quantity
                const updatedItem = { ...existingItem, count: existingItem.count + count };
                const updatedItems = selectedItems.map(item =>
                    item.id === existingItem.id ? updatedItem : item
                );
                setSelectedItems(updatedItems);
            } else {
                // Item doesn't exist, add a new item to the list
                const newItem = { ...selectedItem, count };
                setSelectedItems([...selectedItems, newItem]);
            }

            setItemQuantities({ ...itemQuantities, [selectedItem.id]: count });
            // Update total amount and commission
            setTotalAmount(totalAmount + (selectedItem.price * count));
            setTotalCommission(totalCommission + (selectedItem.itemcommission * count));

            // Reset state after adding item
            setIsAddItemModalVisible(false);
            setSelectedItem(null);
            setSelectedItemQuantity('');
            setSelectedItemCommission('');
            setSelectedItemId(null);
        } else if (selectedItemQuantity == 0) {
            Alert.alert('Error', 'Please enter a valid quantity.');
        }
        else {
            Alert.alert('Error', 'Please select an item and enter a valid quantity.');
        }
    };

    const handleQuantityChangemodal = (itemId, count) => {
        setItemQuantities({ ...itemQuantities, [itemId]: count });
    };

    const handleQuantityChange = (itemId, count) => {
        // Update the count of the selected item
        const updatedItems = selectedItems.map(item =>
            item.id === itemId ? { ...item, count: parseInt(count, 10) || 0 } : item
        );
        setSelectedItems(updatedItems);
        // Recalculate total amount and earnings based on updated count
        let newTotalAmount = 0;
        let newTotalCommission = 0;
        updatedItems.forEach(item => {
            newTotalAmount += item.price * item.count;
            newTotalCommission += item.itemcommission * item.count;
        });

        setTotalAmount(newTotalAmount);
        setTotalCommission(newTotalCommission);
    };


    const handleDeleteItem = (itemId) => {
        const itemToDelete = selectedItems.find(item => item.id === itemId);

        if (itemToDelete) {
            const itemValue = itemToDelete.price * itemToDelete.count;
            const itemCommission = itemToDelete.itemcommission * itemToDelete.count;

            // Update total amount and commission
            setTotalAmount(totalAmount - itemValue);
            setTotalCommission(totalCommission - itemCommission);

            // Remove the item from selectedItems
            const updatedItems = selectedItems.filter(item => item.id !== itemId);
            setSelectedItems(updatedItems);
        }
    };




    return (
        <SafeAreaView>
            <Header title={'Add Return Order'} isBackArrow={true} />
            {/* <ScrollView> */}
            <View style={styles.container}>
                <View style={styles.mainview}>
                    <View style={styles.earningsview}>
                        <View style={styles.fromView}>
                            <CustomSelectionBox
                                title={'Order Type'}
                                isRequired={true}
                                value={location ? location.name : 'Select'}
                                options={categories}
                                onSelect={handleorderSelect}
                                displayProperty="name"
                            />
                        </View>
                        <View style={styles.toView}>
                            <Text style={styles.toText}>Delivery Date <Text style={styles.requiredText}>*</Text></Text>
                            <Calander date={toDate} onPress={() => onShowFromCalander()} />
                        </View>
                    </View>
                    <View style={styles.earningsview}>
                        <View style={styles.fromView}>
                            <CustomTextInput
                                title={'Order No'}
                                isRequired={true}
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
                                isRequired={true}
                                value={selectStatus ? selectStatus.status : 'Select'}
                                options={status}
                                onSelect={handleStatusSelect}
                                displayProperty="status"
                            />
                        </View>
                    </View>

                    <CustomSelectionBox
                        title={'Select shop'}
                        isRequired={true}
                        value={selectedShop ? selectedShop.shopname : 'Select'}
                        options={shops}
                        onSelect={handleShopSelect}
                        displayProperty="shopname" // Specify the property to display as shop name
                    />
                    <Text style={{
                        color: 'black',
                        fontWeight: 'bold',
                    }}>Select Item <Text style={styles.requiredText}>*</Text></Text>
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
                        <Text style={[styles.title, { color: 'black' }]}>₹{totalAmount}</Text>
                    </View>
                    {/* <View style={styles.totalview}>
                        <Text style={[styles.subtitle, { color: '#117C00' }]}>Your Earnings</Text>
                        <Text style={[styles.title, { color: '#117C00' }]}>₹6200</Text>

                    </View> */}
                    <View style={styles.btnview}>
                        {/* <CommonButton
                            onPress={() => ''}
                            color={'white'}
                            title={'Save as Draft'}
                            width={width * 0.4}
                            texttitle={'#005A8D'}
                        /> */}
                        <CommonButton
                            onPress={() => createOrder()}
                            color={'#005A8D'}
                            title={'Create Order'}
                            width={width * 0.9}
                            texttitle={'white'}
                        />
                    </View>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={isFromDatePickerVisible}
                mode="date"
                minimumDate={moment().toDate()}
                onConfirm={handleFromConfirm}
                onCancel={onCloseFromCalander}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={moment().toDate()}
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
                    <Text style={styles.modalTitle}>Add Item </Text>
                    <FlatList
                        data={searchshopitems}
                        // data={selectedItems} // Display only the selected item
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: item?.image }}
                                        style={{ height: '100%', width: '100%', resizeMode: 'stretch' }}
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
                                                placeholderTextColor={'gray'}
                                                value={itemQuantities[item.id]?.toString() || ''}
                                                // value={selectedItemQuantity}
                                                onChangeText={(text) => { handleQuantityChangemodal(item.id, text), setSelectedItemQuantity(text) }} // Update state with entered value
                                            />

                                        </View>
                                        <TouchableOpacity
                                            style={[
                                                styles.addButton,
                                                { backgroundColor: selectedItemId === item.id ? 'green' : '#005A8D' }
                                            ]}
                                            onPress={() => {
                                                if (selectedItemQuantity == 0) {
                                                    Alert.alert('Error', 'Please enter a valid quantity.');
                                                } else {
                                                handleAddItem,
                                                    setSelectedItem(item)
                                                    setSelectedItemId(item.id)
                                                }
                                            }}>
                                            <Text style={{ color: 'white', fontSize: 16 }}>{selectedItemId === item.id ? 'Selected' : 'Select'}</Text>
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
        fontWeight: 'bold',
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
        color: 'black'
    },
    requiredText: {
        color: 'red',
        marginLeft: 5,
    },
});

export default AddReturnOrder;
