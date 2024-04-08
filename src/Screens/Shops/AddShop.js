import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { height, width } from '../../Theme/Constants';
import Header from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';
import CommonButton from '../../components/CommonButton';
import CustomSelectionBox from '../../components/CustomSelectionBox';



const AddShop = ({ navigation: { navigate } }) => {
    const [shopName, setShopName] = useState('');
    const [checkshopName, changecheckshopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [checkshopAddress, changeshopAddress] = useState('');
    const [location, setlocation] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [checkcontactNumber, changecontactNumber] = useState('');

    const [email, setEmail] = useState('');
    const [checkEmail, changecheckEmail] = useState('');


    const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3']);

    const isValidate = async () => {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (shopName == '') {
            changecheckshopName('Please enter shopName');
        }
        else if (shopAddress == '') {
            changeshopAddress('Please enter shopAddress');
        }
        else if (contactNumber == '') {
            changecontactNumber('Please enter contactNumber');
        }
        else if (email === '') {
            changecheckEmail('Please enter Email id');
        } else if (!emailFormat.test(email)) {
            changecheckEmail('Please enter a valid email address');
        } else {
            navigate('Home');
        }
    };

    const onSave = () => {
        navigate('Home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Add Shops'} isBackArrow={true} isNotification={true} />

            <ScrollView style={styles.scrollContainer}>
                <CustomTextInput
                    title={'Name Of Shop'}
                    placeholder="Enter shop name"
                    errorText={checkshopName}
                    onChangeText={text => {
                        setShopName(text);
                        changecheckshopName('');
                    }}
                    value={shopName}
                />
                <CustomSelectionBox
                    title={'Location'}
                    value={location == '' ? 'Select Location' : location}
                    options={categories}
                    onSelect={category => setlocation(category)}
                />
                <CustomTextInput
                    title={'Address'}
                    placeholder="Address"
                    errorText={checkshopAddress}
                    multiline={true}
                    onChangeText={text => {
                        setShopAddress(text);
                        changeshopAddress('')
                    }}
                    value={shopAddress}
                    keyboardType="default"
                    placeholderTextColor="gray"
                />
                <View >
                    <Text style={styles.locationText }>
                        Add Location
                    </Text>
                    <TouchableOpacity style={styles.locationButton}>
                    <Text style={styles.selectLocationText}>
                        Select Location
                    </Text>
                    </TouchableOpacity>

                </View>
                <CustomTextInput
                    title={'Contact Number'}
                    placeholder="Contact Number"
                    errorText={checkcontactNumber}
                    onChangeText={text => {
                        setContactNumber(text);
                        changecontactNumber('')
                    }}
                    value={contactNumber}
                    keyboardType="phone-pad"
                    placeholderTextColor="gray"
                />
                <CustomTextInput
                    title={'Email ID'}
                    placeholder="Email ID"
                    errorText={checkEmail}
                    onChangeText={text => {
                        setEmail(text);
                        changecheckEmail('');
                    }}
                    value={email}
                    keyboardType="email-address"
                    placeholderTextColor="gray"
                />
            </ScrollView>
            <View style={styles.saveButtonContainer}>
                <CommonButton
                    onPress={() => isValidate()}
                    color={'#003451'}
                    title={'Add Shop'}
                    width={width * 0.4}
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
        paddingHorizontal: 15,
        paddingTop: 16
    },
    saveButtonContainer: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    locationText:{
        color:'black',
         fontSize:14,
         fontWeight:'700',
         marginBottom:5
        },
        locationButton: {
            height:height*.05,
            width:width*.9,
            borderWidth:.5,
             borderColor:'black',
              borderRadius:10,
              alignItems:'center',
              justifyContent:'center',
              marginBottom:5},
              selectLocationText:{
                color:'black',
                 fontSize:14,
                 marginBottom:5
              }
});

export default AddShop;
