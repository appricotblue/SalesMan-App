import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { width } from '../../Theme/Constants';
import Header from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';
import CommonButton from '../../components/CommonButton';
import CustomSelectionBox from '../../components/CustomSelectionBox';



const AddShop = ({ navigation: { navigate } }) => {
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [location, setlocation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');

    const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3']);



    const onSave = () => {
        // Perform save action
        // Example: Save shop details to database
        navigate('Home'); // Navigate to Home screen after saving
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Add Shops'} isNotification={true} />

            <ScrollView style={styles.scrollContainer}>
                <CustomTextInput
                    title={'Name Of Shop'}
                    placeholder="Enter shop name"
                    onChangeText={text => {
                        setShopName(text);
                    }}
                    value={shopName}
                />

                <CustomSelectionBox
                    title={'Location'}
                    value={location == '' ? 'Select Location' : location}
                    options={categories}
                    onSelect={category => setlocation(category)} // Implement your selection logic here
                />
                <CustomTextInput
                    title={'Address'}
                    placeholder="Address"
                    onChangeText={text => {
                        setShopAddress(text);
                    }}
                    value={shopAddress}
                    keyboardType="default"
                    placeholderTextColor="gray"
                />
                <CustomTextInput
                    title={'Contact Number'}
                    placeholder="Contact Number"
                    onChangeText={text => {
                        setContactNumber(text);
                    }}
                    value={contactNumber}
                    keyboardType="phone-pad"
                    placeholderTextColor="gray"
                />
                <CustomTextInput
                    title={'Email ID'}
                    placeholder="Email ID"
                    onChangeText={text => {
                        setEmail(text);
                    }}
                    value={email}
                    keyboardType="email-address"
                    placeholderTextColor="gray"
                />
            </ScrollView>

            <View style={styles.saveButtonContainer}>
                <CommonButton
                    onPress={onSave}
                    color={'#003451'}
                    title={'Save'}
                    width={width * 0.9}
                    texttitle={'white'}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16
    },
    saveButtonContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
});

export default AddShop;
