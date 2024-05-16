import React, { useState, useEffect, useRef } from 'react';
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
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform
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
import { setStatus, setShopList, setShopItems, setOrders } from '../../redux/action';
import { getOrderStatus, getShopLists, getOrders, getItemSearch } from '../../api';
import Local from '../../Storage/Local';
import { env_dev } from "../../env/Dev";
import moment from 'moment';






const AddSalesOrder = () => {
    const searchInputRef = useRef(null);
    const navigation = useNavigation();
    const quantityInputRef = useRef(null);
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
    const [totalCommission, setTotalCommission] = useState(0);
    const [itemQuantities, setItemQuantities] = useState({});
    const [quantityValue, setQuantityValue] = useState('');
    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    };

    const unfocusSearchInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
    };

    useEffect(() => {
        const checkToken = async () => {
            try {
                const userid = await Local.getUserId();
                const delay = 2000; // Delay in milliseconds
                console.log(userid, 'userid?')
                await setUserId(userid)
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
                expecteddate: toDate,
                shopId: selectedShop?.id,
                yourearing: totalCommission,
                totalAmount: totalAmount,
                orderNo: 'Order-' + shopName,
                itemId: itemIds,
                status: selectStatus?.id?.toString(),
                orderType: location?.name,
                quantity: quantities
            };
            console.log(requestBody, 'gettt')

            const response = await fetch(env_dev + `/user/createorder/${UserId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            console.log('Order created:', data);
            GetOrders()
            // navigation.navigate('Home')
        } catch (error) {
            console.error('Error creating order:', error);
            const data = await response.json();
            Alert.alert(data.message)
            console.error('Error creating order:', error);
        }
    };


    const GetOrders = async () => {

        try {
            const response = await (getOrders(UserId, '', 1));
            console.log(response.orders, 'here')
            dispatch(setOrders(response.orders));
            navigation.navigate('Home')
        } catch (error) {
            console.error('Error during fetching orders:home ', error?.message);
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
                            <Text style={styles.qtyText}>{selectedItem?.attribute}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * .6 }}>
                        <Text style={styles.rateText}>₹{item?.price}</Text>
                        <View style={{ height: 29, width: 65, borderColor: 'gray', borderWidth: .5, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} >

                            <TextInput
                                editable={true}
                                ref={quantityInputRef}
                                style={styles.quantityInput}
                                keyboardType="numeric"
                                placeholder="Qty"
                                placeholderTextColor={'gray'}
                                value={item.count.toString()} // Display item count as string in TextInput
                                onChangeText={(text) => { handleQuantityChange(item.id, text), setQuantityValue(text) }}
                                // onChangeText={(text) => { setQuantityValue(text) }}
                                // onBlur={() => {
                                //     quantityInputRef.current.blur();
                                // }}
                                // onFocus={() => {
                                //     setTimeout(() => {
                                //         quantityInputRef.current.focus();
                                //     }, 100); // Adjust the delay if necessary
                                // }}
                                // onKeyPress={({ nativeEvent }) => {
                                //     if (nativeEvent.key === 'Backspace') {
                                //         // Allow deleting digits
                                //         return;
                                //     }
                                //     // Allow entering multiple digits
                                //     if (quantityValue.length >= 2) {
                                //         quantityInputRef.current.blur(); // Automatically blur TextInput after 2 digits
                                //     }
                                // }}
                                // returnKeyType="done"
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => {
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
        setSearchQuery('')
        Keyboard.dismiss();
        unfocusSearchInput();
        setIsAddItemModalVisible(false)
        if (selectedItem && selectedItemQuantity !== '' && parseInt(selectedItemQuantity) > 0) {
            // if (selectedItem && selectedItemQuantity !== '') {
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



            // const updatedItemQuantities = { ...itemQuantities };
            // delete updatedItemQuantities[selectedItem.id];
            // setItemQuantities(updatedItemQuantities);
            setItemQuantities([])

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

    const handleQuantityChange = (itemId, count) => {
        // Parse the count as an integer
        const quantity = parseInt(count, 10);

        // Update the count of the selected item
        const updatedItems = selectedItems.map(item =>
            item.id === itemId ? { ...item, count: isNaN(quantity) ? 0 : quantity } : item
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


    // const handleQuantityChange = (itemId, count) => {
    //     // Update the count of the selected item
    //     const updatedItems = selectedItems.map(item =>
    //         item.id === itemId ? { ...item, count: parseInt(count, 10) || 0 } : item
    //     );
    //     setSelectedItems(updatedItems);

    //     // Recalculate total amount and earnings based on updated count
    //     let newTotalAmount = 0;
    //     let newTotalCommission = 0;
    //     updatedItems.forEach(item => {
    //         newTotalAmount += item.price * item.count;
    //         newTotalCommission += item.itemcommission * item.count;
    //     });

    //     setTotalAmount(newTotalAmount);
    //     setTotalCommission(newTotalCommission);
    // };

    const handleQuantityChangemodal = (itemId, count) => {
        setItemQuantities({ ...itemQuantities, [itemId]: count });
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

            // Remove the corresponding item from itemQuantities
            const updatedItemQuantities = { ...itemQuantities };
            delete updatedItemQuantities[itemId];
            setItemQuantities(updatedItemQuantities);
        }
    };

    // const handleDeleteItem = (itemId) => {
    //     const itemToDelete = selectedItems.find(item => item.id === itemId);

    //     if (itemToDelete) {
    //         const itemValue = itemToDelete.price * itemToDelete.count;
    //         const itemCommission = itemToDelete.itemcommission * itemToDelete.count;

    //         // Update total amount and commission
    //         setTotalAmount(totalAmount - itemValue);
    //         setTotalCommission(totalCommission - itemCommission);

    //         // Remove the item from selectedItems
    //         const updatedItems = selectedItems.filter(item => item.id !== itemId);
    //         setSelectedItems(updatedItems);
    //     }
    // };


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
                        fontWeight: 'bold',
                        color: 'black',
                    }}>Select Item<Text style={styles.requiredText}>*</Text></Text>
                    <View
                        style={{
                            width: width * 0.9,
                        }}>
                        <CustomSearch
                            ref={searchInputRef}
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
                <View style={styles.totalcommiview}>
                    <View style={{ width: width * .9, justifyContent: 'space-between', flexDirection: 'row', alignSelf: 'center' }}>
                        <Text style={styles.subtitle}>Total Amount</Text>
                        <Text style={[styles.title, { color: 'black' }]}>₹{totalAmount}</Text>
                    </View>
                    <View style={styles.totalview}>
                        <Text style={[styles.subtitle, { color: '#117C00' }]}>Your Earnings</Text>
                        <Text style={[styles.title, { color: '#117C00' }]}>₹{totalCommission}</Text>

                    </View>

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
            <ScrollView keyboardShouldPersistTaps={'always'}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddItemModalVisible}
                    onRequestClose={() => {
                        setIsAddItemModalVisible(false);
                    }}
                    style={{ pointerEvents: 'box-none' }}
                >
                    {/* <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                > */}
                    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
                        <View style={styles.modalContainer}>
                            {/* <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                style={styles.modalContainer}
                            > */}
                            <Text style={styles.modalTitle}>Select items </Text>

                            <View style={{ height: 500, width: '96.5%', }}>
                                {searchshopitems.map((item) => (
                                    <View style={styles.itemContainer}>
                                        <View style={{ width: '20%', }}>
                                            <View style={styles.imageContainer}>
                                                <Image
                                                    source={{ uri: item?.image }}
                                                    style={{ height: '100%', width: '100%', resizeMode: 'stretch' }}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ width: '45%', }}>
                                            <View style={styles.row1}>
                                                <Text style={styles.nameText}>{item.name}</Text>
                                            </View>
                                            <View style={styles.row1}>
                                                <View style={styles.row2}>
                                                    <Text style={styles.qtyText}>{item.attribute}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * .6 }}>
                                                <Text style={styles.rateText}>₹{item.price}</Text>

                                            </View>
                                        </View>
                                        <View style={{ width: '28%', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                            <View style={{ height: 29, width: 90, borderColor: 'gray', borderWidth: .5, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 10 }} >

                                                <TextInput
                                                    style={styles.quantityInput}
                                                    keyboardType="numeric"
                                                    placeholder="Qnty"
                                                    placeholderTextColor={'gray'}
                                                    value={itemQuantities[item.id]?.toString() || ''}
                                                    // value={selectedItemQuantity.toString()} // Display item count as string in TextInput
                                                    // onChangeText={(text) => setSelectedItemQuantity(text)} // Update selectedItemQuantity state
                                                    onChangeText={(text) => {
                                                        handleQuantityChangemodal(item.id, text), setSelectedItemQuantity(text)
                                                    }}
                                                />
                                            </View>
                                            <TouchableOpacity
                                                style={[
                                                    styles.addButton,
                                                    { backgroundColor: selectedItemId === item.id ? 'green' : '#005A8D', zIndex: 10 }
                                                ]}
                                                onPress={() => {
                                                    if (selectedItemQuantity == 0) {
                                                        Alert.alert('Error', 'Please enter a valid quantity');
                                                    } else {
                                                        handleAddItem,
                                                            setSelectedItem(item)
                                                        setSelectedItemId(item.id)
                                                    }


                                                }}>
                                                <Text style={{ color: 'white', fontSize: 14 }}>{selectedItemId === item.id ? 'Selected' : 'Select'}</Text>

                                            </TouchableOpacity>


                                        </View>

                                    </View>
                                )
                                )}

                            </View>
                            <View style={{
                                justifyContent: 'space-between', width: width - 50, flexDirection: 'row', marginBottom: 10, alignSelf: 'center', position: 'absolute',
                                bottom: 10,
                            }}>


                                <CommonButton
                                    onPress={() => setIsAddItemModalVisible(false)}
                                    color={'white'}
                                    title={'Cancel'}
                                    width={width * 0.4}
                                    texttitle={'#005A8D'}
                                />
                                <CommonButton
                                    onPress={() => handleAddItem()}
                                    color={'#005A8D'}
                                    title={'Confirm'}
                                    width={width * 0.4}
                                    texttitle={'white'}
                                />

                            </View>
                            {/* </KeyboardAvoidingView> */}
                        </View>
                    </TouchableWithoutFeedback>
                    {/* </KeyboardAvoidingView>  */}
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        height: height,
        // alignItems: 'center',
        // flex: 1,
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
        padding: 1,
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
        width: width * 0.9,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
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
        // alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 16,
        paddingVertical: 10,

        width: '100%',
        // backgroundColor: 'red',
        // height: height - 200
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
        width: '100%',
        height: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
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
    listview: { width: width * .9, alignSelf: 'center', height: height * .30, marginTop: 3, paddingBottom: 10 },
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
    totalview: { width: width * .91, marginTop: 5, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#D9D9D9', padding: 5, alignSelf: 'center' },
    addButton: {
        backgroundColor: '#005A8D',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        width: 90

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
        fontFamily: 'Inter-Bold',
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
        color: 'black',
        borderRadius: 10
    },
    requiredText: {
        color: 'red',
        marginLeft: 5,
    },
    totalcommiview: {
        flex: 1,
        width: width * 1,
        // alignSelf: 'center',
        marginTop: 0,
        paddingTop: 3,
        // backgroundColor: 'red',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        // minHeight: 400
        // marginBottom: 300,
    }
});

export default AddSalesOrder;
