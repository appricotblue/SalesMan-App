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
    Alert,
    Keyboard,
    TouchableWithoutFeedback
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
import { env_dev } from "../../env/Dev";
import moment from 'moment';

import Local from '../../Storage/Local';





const EditOrder = () => {
    const navigation = useNavigation();
    const { status, shops, searchshopitems, orderdetails } = useSelector((state) => state.global);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [location, setlocation] = useState({ id: 1, name: 'sales' },);
    const [selectStatus, setSelectStatus] = useState({ id: orderdetails?.statusId, status: orderdetails?.orderStatus });
    const [selectShop, setSelectShop] = useState('');

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([{ id: 1, name: 'sales' },]);
    const [statuses, setStatuses] = useState(['Ordered', 'Invoiced', 'In transist', 'Delivered']);

    const [isFromDatePickerVisible, setFromDatePickerVisibility] =
        useState(false);
    const [shopName, setShopName] = useState(orderdetails?.orderNo);
    const [checkshopName, changecheckshopName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState(orderdetails?.deliveryDate);

    const [statusOptions, setStatusOptions] = useState([]);
    const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemQuantity, setSelectedItemQuantity] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedShop, setSelectedShop] = useState({ id: orderdetails?.shopId, shopname: orderdetails?.shopName });
    const [UserId, setUserId] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [totalCommission, setTotalCommission] = useState(0);
    // const [totalCommission, setTotalCommission] = useState(0);
    const [itemQuantities, setItemQuantities] = useState({});

    const [openBoxId, setOpenBoxId] = useState(null);

    const handleSelectBox = (id) => {
        setOpenBoxId(openBoxId === id ? null : id);
    };

    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    };


    useEffect(() => {
        const checkToken = async () => {
            try {
                const userid = await Local.getUserId();
                const delay = 2000; // Delay in milliseconds
                console.log(userid, 'userid?', orderdetails, orderdetails?.orderStatus)
                setUserId(userid)
                GetShops(userid)
                setSelectedItems(orderdetails.orderItems)

            } catch (error) {
                console.error('Error checking token:', error);

            }
        };

        checkToken();
    }, []);

    useEffect(() => {
        const calculateTotalAmount = () => {
            let total = 0;
            selectedItems.forEach(item => {
                total += (item.price * item.quantityCount);
            });
            setTotalAmount(total);
        };

        calculateTotalAmount();
    }, [selectedItems]);


    useEffect(() => {
        const calculateTotalCommission = () => {
            let total = 0;
            selectedItems.forEach(item => {
                total += (item.itemcommission * item.quantityCount);
            });
            setTotalCommission(total);
        };

        calculateTotalCommission();
    }, [selectedItems]);

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
    const GetShops = async (userId) => {
        try {
            const response = await getShopLists(userId);
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
            const quantities = selectedItems.map(item => item.quantityCount);
            const requestBody = {
                expecteddate: toDate,
                shopId: selectedShop?.id,
                yourearing: totalCommission,
                totalAmount: totalAmount,
                orderNo: shopName,
                // orderNo: orderdetails?.id,
                itemId: itemIds,
                status: selectStatus?.id.toString(),
                orderType: location?.name,
                quantity: quantities
            };
            console.log(requestBody, 'gettt')

            const response = await fetch(env_dev + `/user/updateorder/${orderdetails?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            console.log('Order created:', data);
            GetOrders()

        } catch (error) {
            console.error('Error creating order:edit', error);
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
                        <Text style={styles.rateText}>₹{selectedItem.price}</Text>
                        <View style={{ height: 29, width: 65, borderColor: 'gray', borderWidth: .5, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} >
                            <TextInput
                                editable={true}
                                style={styles.quantityInput}
                                keyboardType="numeric" // Set keyboard type to numeric for number input
                                placeholder="Qnty"
                                placeholderTextColor={'gray'}
                                value={selectedItem.quantityCount?.toString()}
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
        setSearchQuery('')
        Keyboard.dismiss();
        // unfocusSearchInput();
        // setIsAddItemModalVisible(false)
        if (selectedItem && selectedItemQuantity !== '') {
            const quantityCount = parseInt(selectedItemQuantity, 10) || 0;
            const existingItem = selectedItems.find(item => item.id === selectedItem.id);

            if (existingItem) {
                // Item already exists, update the quantity
                const updatedItem = { ...existingItem, quantityCount: existingItem.quantityCount + quantityCount };
                const updatedItems = selectedItems.map(item =>
                    item.id === existingItem.id ? updatedItem : item
                );
                setSelectedItems(updatedItems);
            } else {
                // Item doesn't exist, add a new item to the list
                const newItem = { ...selectedItem, quantityCount };
                setSelectedItems([...selectedItems, newItem]);
            }
            setItemQuantities({ ...itemQuantities, [selectedItem.id]: quantityCount });
            // Update total amount and commission
            setTotalAmount(totalAmount + (selectedItem.price * quantityCount));
            setTotalCommission(totalCommission + (selectedItem.itemcommission * quantityCount));



            setItemQuantities([])
            // Reset state after adding item
            setIsAddItemModalVisible(false);
            setSelectedItem(null);
            setSelectedItemQuantity('');
            // setSelectedItemCommission('');
            setSelectedItemId(null);
        } else if (selectedItemQuantity == 0) {
            Alert.alert('Error', 'Please enter a valid quantity.');
        }

        else {
            Alert.alert('Error', 'Please select an item and enter a valid quantity.');
        }
    };


    // const handleAddItem = () => {
    //     if (selectedItem && selectedItemQuantity !== '') {
    //         const quantityCount = parseInt(selectedItemQuantity, 10) || 0;
    //         const newItem = { ...selectedItem, quantityCount };

    //         setSelectedItems([...selectedItems, newItem]);
    //         setTotalAmount(totalAmount + (newItem.price * quantityCount));
    //         setTotalCommission(totalCommission + (newItem?.itemcommission * quantityCount));

    //         setIsAddItemModalVisible(false);
    //         setSelectedItem(null);
    //         setSelectedItemQuantity('');
    //         // setSelectedItemCommission('');
    //     }
    //     else if (selectedItemQuantity == '') {

    //         Alert.alert('Error', 'Please enter a valid quantity.');
    //     } else if (selectedItemQuantity == 0) {
    //         Alert.alert('Error', 'Please enter a valid quantity.');
    //     }
    //     else {
    //         Alert.alert('Error', 'Please select an item to continue');
    //     }
    // };


    // const handleQuantityChange = (itemId, quantityCount) => {
    //     const updatedSelectedItems = selectedItems.map(item => {
    //         if (item.id === itemId) {
    //             return { ...item, quantityCount };
    //         }
    //         return item;
    //     });
    //     setSelectedItems(updatedSelectedItems);
    // };

    // const handleDeleteItem = (itemId) => {

    //     const itemToDelete = selectedItems.find(item => item.id === itemId);
    //     if (itemToDelete) {
    //         const itemValue = itemToDelete.price * itemToDelete.quantityCount;
    //         const itemCommission = itemToDelete?.itemcommission * itemToDelete.quantityCount;
    //         const updatedItems = selectedItems.filter(item => item.id !== itemId);
    //         setTotalAmount(totalAmount - itemValue);
    //         setTotalCommission(totalCommission - itemCommission);
    //         setSelectedItems(updatedItems);
    //     }
    // };

    const handleQuantityChangemodal = (itemId, quantityCount) => {
        setItemQuantities({ ...itemQuantities, [itemId]: quantityCount });
    };

    const handleQuantityChange = (itemId, quantityCount) => {
        // Update the count of the selected item
        const updatedItems = selectedItems.map(item =>
            item.id === itemId ? { ...item, quantityCount: parseInt(quantityCount, 10) || 0 } : item
        );
        setSelectedItems(updatedItems);

        // Recalculate total amount and earnings based on updated count
        let newTotalAmount = 0;
        let newTotalCommission = 0;
        updatedItems.forEach(item => {
            newTotalAmount += item.price * item.quantityCount;
            newTotalCommission += item.itemcommission * item.quantityCount;
        });

        setTotalAmount(newTotalAmount);
        setTotalCommission(newTotalCommission);
    };

    const handleDeleteItem = (itemId) => {
        const itemToDelete = selectedItems.find(item => item.id === itemId);

        if (itemToDelete) {
            const itemValue = itemToDelete.price * itemToDelete.quantityCount;
            const itemCommission = itemToDelete.itemcommission * itemToDelete.quantityCount;

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
    //         const itemValue = itemToDelete.price * itemToDelete.quantityCount;
    //         const itemCommission = itemToDelete.itemcommission * itemToDelete.quantityCount;

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
            <Header title={'Edit Sales Order'} isBackArrow={true} />
            {/* <ScrollView> */}
            <View style={styles.container}>
                <View style={styles.mainview}>
                    <View style={styles.earningsview}>
                        <View style={styles.fromView}>
                            <CustomSelectionBox
                                inputwidth={width * .35}
                                title={'Order Type'}
                                isRequired={true}
                                value={location ? location.name : 'Select'}
                                options={categories}
                                onSelect={handleorderSelect}
                                displayProperty="name"
                                isOpen={openBoxId === 1}
                                onOpen={() => handleSelectBox(1)}

                            />
                        </View>
                        <View style={styles.toView}>
                            <Text style={styles.itemtitles}>Delivery Date <Text style={styles.requiredText}>*</Text></Text>
                            <Calander date={toDate} onPress={() => onShowFromCalander()} />
                        </View>
                    </View>
                    <View style={styles.earningsview}>
                        <View style={styles.fromView}>
                            <CustomTextInput
                                title={'Order Nos'}
                                isRequired={true}
                                editable={false}
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
                                inputwidth={width * .35}
                                title={'Status'}
                                isRequired={true}
                                value={selectStatus ? selectStatus.status : 'Select'}
                                options={status}
                                onSelect={handleStatusSelect}
                                displayProperty="status"
                                isOpen={openBoxId === 2}
                                onOpen={() => handleSelectBox(2)}
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
                        isOpen={openBoxId === 3}
                        onOpen={() => handleSelectBox(3)}
                    />
                    <Text style={styles.itemtitles}>Select Item <Text style={styles.requiredText}>*</Text></Text>
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
                        <ScrollView contentContainerStyle={{ height: height }}>
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
                        </ScrollView>
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
    itemtitles: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter-Bold',
        marginTop: 4,
    },
    earningsview: {
        height: height * 0.08,
        width: width * 0.9,
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

        width: '100%',
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
        marginRight: 23,
        borderRadius: 5
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
        color: 'black'
    },
    requiredText: {
        color: 'red',
        marginLeft: 5,
    },
});

export default EditOrder;
