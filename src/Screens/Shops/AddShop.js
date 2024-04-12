import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    PermissionsAndroid,
    Platform,
    Image
} from 'react-native';
import { height, width } from '../../Theme/Constants';
import Header from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';
import CommonButton from '../../components/CommonButton';
import CustomSelectionBox from '../../components/CustomSelectionBox';
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary } from 'react-native-image-picker';
import { createShopAPI } from '../../api';
import Local from '../../Storage/Local';
import axios from "axios";


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
    const [locationData, setLocationData] = useState(null);
    const [lattitude, setlattitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [images, setImages] = useState([]);

    const [UserId, setUserId] = useState(null);

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
            handleCreateShop()
            // navigate('Home');
        }
    };

    const onSave = () => {
        navigate('Home');
    };

    useEffect(() => {
        const checkToken = async () => {
            try {
                const userid = await Local.getUserId();
                const delay = 2000; // Delay in milliseconds
                console.log(userid, 'userid ?')
                setUserId(userid)
                // await GetOrders(userid, 'Orders', 1);
            } catch (error) {
                console.error('Error checking token:', error);

            }
        };

        checkToken();
    }, []);


    const handleCreateShop = async () => {
        const formData = new FormData();
        formData.append('shopname', 'jessssss');
        formData.append('location', 'fort kochi ');
        formData.append('address', 'marketing Solutions 4A, Sunpaul Blueberry Dezira Infopark expressway Kakkanad');
        formData.append('emailId', 'info@gmail.com');
        formData.append('contectnumber', '1234567890');

        // Assuming you have image URIs or file paths stored in variables:
        const image1 = { uri: 'path/to/image1.jpg', name: 'image1.jpg', type: 'image/jpeg' };

        // ... (add more images if needed)
        const imageUri = 'file:///data/user/0/com.rn/cache/rn_image_picker_lib_temp_4edc97f5-1fd3-4de0-9930-acffa27ced8c.jpg';

        // Extracting path from URI
        const path = imageUri.replace('file://', ''); // Remove 'file://' prefix

        // Getting URI
        const uri = imageUri;

        // Determining file type (assuming it's a JPEG image based on the .jpg extension)
        const type = 'image/jpeg';
        const image2 = { uri: imageUri, name: path, type: 'image/jpeg' };
        // formData.append('shopImage', { uri: "file:///data/user/0/com.rn/cache/rn_image_picker_lib_temp_4edc97f5-1fd3-4de0-9930-acffa27ced8c.jpg" });
        formData.append('shopImage', image2);
        // ... (append more images)

        formData.append('locationCode', '{"latitude":40.7128,"longitude":-74.006}');

        // const shopImage = formData._parts.find(([key]) => key === 'shopImage')[1];

        // console.log(shopImage, 'hr');


        try {

            console.log('ertr',)
            // const response = await createShopAPI(UserId,formData);
            //   setShopCreated(true);
            const response = await axios.post(
                'http://64.227.139.72:8000/user/createshop/2', // Replace with your actual API endpoint
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type for file uploads
                    },
                }
            );
            console.log('Shop created successfully:', response);
        } catch (error) {
            console.error('Error creating shop:', error);
        }
    }



    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'Wonder App needs access to your camera to select images.',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                pickImage();
            } else {
                console.log('Camera permission denied');
            }
        } else {
            pickImage();
        }
    };

    const pickImage = async () => {
        const options = {
            selectionLimit: 5, // Allow up to 5 images to be selected
            mediaType: 'photo', // Only allow images
            includeBase64: true, // Include the image data as base64 string
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error('Image picker error:', response.error);
            } else {
                const newImages = response.assets.map((asset) => asset.uri);
                console.log(newImages, 'images')
                setImages([...images, ...newImages]); // Add selected image URIs to the state
            }
        });
    };


    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLocationData({ latitude, longitude });
                setlattitude(latitude)
                setlongitude(longitude)
                console.log(latitude, longitude, 'locations ')
                // navigate('LocationScreen', { data: { latitude: lattitude, longitude: longitude } })
            },
            error => console.log('Error getting location: ' + error.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
        );
    };

    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'Wonder App needs access to your location.',
                        buttonPositive: 'OK',
                    },
                );
                console.log('Permission Granted:', granted);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getCurrentLocation(); // If permission granted, get current location
                } else {
                    console.log('Permission Denied', 'Location permission denied.');
                }
            } else {
                getCurrentLocation(); // For iOS, just get current location
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const renderImageSelection = () => {
        const filledImageSlots = images.length;
        const remainingImageSlots = 4 - filledImageSlots;

        return (
            <View style={styles.imageSelectionContainer}>
                {filledImageSlots > 0 &&
                    images.map((imageUri, index) => (
                        <View key={index} style={styles.selectedImageWrapper}>
                            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                        </View>
                    ))}
                {remainingImageSlots > 0 &&
                    Array(remainingImageSlots)
                        .fill(null)
                        .map((_, index) => (
                            <TouchableOpacity key={index} style={styles.imageSlot} onPress={requestCameraPermission}>
                                <View style={styles.dashedBorder}>
                                    <Text style={styles.plusIcon}>+</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
            </View>
        );
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
                    <Text style={styles.locationText}>
                        Add Location
                    </Text>
                    <TouchableOpacity

                        // onPress={() => navigate('LocationScreen')} 
                        onPress={() => requestLocationPermission()}
                        style={styles.locationButton}>
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
                <TouchableOpacity style={styles.imageButton} onPress={() => requestCameraPermission()}>
                    <Text style={styles.buttonText}>Select Images</Text>
                </TouchableOpacity>
                {renderImageSelection()}
                {/* <ScrollView horizontal={true} style={styles.imageContainer}>
                    {images.map((imageUri, index) => (
                        <Image key={index} source={{ uri: imageUri }} style={styles.image} />
                    ))}
                </ScrollView> */}
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
    locationText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 5
    },
    locationButton: {
        height: height * .05,
        width: width * .9,
        borderWidth: .5,
        borderColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    selectLocationText: {
        color: 'black',
        fontSize: 14,
        marginBottom: 5
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    imageButton: {
        backgroundColor: '#003451',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    imageContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageSelectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    selectedImageWrapper: {
        marginRight: 10,
        marginBottom: 10,
        width: width / 3,
        height: width / 3,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageSlot: {
        marginRight: 10,
        marginBottom: 10,
        width: width / 3,
        height: width / 3,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dashedBorder: {
        width: '100%',
        height: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusIcon: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ccc',
    },
});

export default AddShop;
