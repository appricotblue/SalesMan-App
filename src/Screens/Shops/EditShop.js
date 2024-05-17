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
    Image,
    Alert
} from 'react-native';
import { height, width } from '../../Theme/Constants';
import Header from '../../components/Header';
import CustomTextInput from '../../components/CustomTextInput';
import CommonButton from '../../components/CommonButton';
import CustomSelectionBox from '../../components/CustomSelectionBox';
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary } from 'react-native-image-picker';
import { createShopAPI, getLocationList, getShops } from '../../api';
import Local from '../../Storage/Local';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setShops, setLocationList, setDeliveries } from '../../redux/action';
import { env_dev } from "../../env/Dev";
import { useRoute } from '@react-navigation/native';
import HomeOrderButton from '../../components/HomeOrderButton';





const EditShop = ({ navigation: { navigate } }) => {
    const route = useRoute();
    const { locationlist, shopdetails, loading, error } = useSelector((state) => state.global);
    const [shopName, setShopName] = useState(shopdetails?.shopname);
    const [shopCode, setShopCode] = useState(shopdetails?.shopCode);
    const [checkshopCode, changecheckShopCode] = useState('');
    const [checkshopName, changecheckshopName] = useState('');
    const [shopAddress, setShopAddress] = useState(shopdetails?.address);
    const [checkshopAddress, changeshopAddress] = useState('');
    const [location, setlocation] = useState({ id: '', LocationName: shopdetails?.location });
    const [contactNumber, setContactNumber] = useState(shopdetails?.contectnumber);
    const [checkcontactNumber, changecontactNumber] = useState('');

    const [email, setEmail] = useState(shopdetails?.emailId);
    const [checkEmail, changecheckEmail] = useState('');
    const [locationData, setLocationData] = useState(null);
    const [latitude, setlattitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [images, setImages] = useState(shopdetails?.shopImage.map(image => image.url) || []);
    const dispatch = useDispatch();
    const [UserId, setUserId] = useState(null);
    const [categories, setCategories] = useState([{ id: 1, name: 'Kakkanad' }, { id: 2, name: 'Kakkanad express' }]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const { locationdata } = route.params;

    // Now you can use locationdata.latitude and locationdata.longitude
    // const loclatitude = locationdata?.latitude;
    // const loclongitude = locationdata?.longitude;

    // const [categories, setCategories] = useState({ id: '', status: 'Select' });
    const handleorderSelect = async (item) => {
        await setlocation(item);
        console.log(location?.id, item, ' cat iddddd')
    };
    const isValidate = async () => {
        // const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;


        if (shopName == '') {
            changecheckshopName('Please enter shopName');
        }
        else if (shopAddress == '') {
            changeshopAddress('Please enter shopAddress');
        }
        else if (contactNumber == '') {
            changecontactNumber('Please enter contactNumber');
        }
        else if (contactNumber?.length != 10) {
            changecontactNumber('Please enter  valid contactNumber');
        }

        else if (location?.LocationName == '') {
            Alert.alert('Error', 'Please select location');
        }
        else if (locationdata?.latitude == '') {
            Alert.alert('Error', 'Please select location');
        }
        else if (locationdata?.longitude == '') {
            Alert.alert('Error', 'Please select location');
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
    // useEffect(() => {
    //     const { data } = route.params;
    //     console.log(' movies?', data)

    //     setSelectedLocation(data)
    // }, []);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const userid = await Local.getUserId();
                const delay = 2000; // Delay in milliseconds
                console.log(userid, 'userid ?', locationdata?.latitude)
                setUserId(userid)
                GetLocationList()
                // await GetOrders(userid, 'Orders', 1);
            } catch (error) {
                console.error('Error checking token:', error);

            }
        };

        checkToken();
    }, []);

    const GetLocationList = async () => {
        try {
            const response = await getLocationList();
            console.log(response.locations, 'locationsss')
            dispatch(setLocationList(response?.locations));
        } catch (error) {
            console.log(error)
        }
    };


    const handleCreateShop = async () => {
        const formData = new FormData();
        formData.append('shopname', shopName);
        formData.append('location', location?.LocationName);
        formData.append('address', shopAddress);
        formData.append('emailId', email);
        formData.append('contectnumber', contactNumber);
        formData.append('locationCode', JSON.stringify({ latitude: locationdata?.latitude, longitude: locationdata?.longitude }));
        formData.append('shopCode', shopCode);
        formData.append('availability', true);
        // Append each image from the images array to FormData
        images.forEach((imageUri, index) => {
            const imageFile = {
                uri: imageUri,
                name: `image_${index}.jpg`,
                type: 'image/jpeg',
            };
            formData.append(`shopImage`, imageFile);
        });
        console.log(formData, 'form data', shopdetails?.id)
        try {
            const response = await axios.put(
                env_dev + `/user/updateshop/${shopdetails?.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            Alert.alert('Shop Updated successfully')
            await GetShops(UserId);

            console.log('Shop created successfully:', response, formData);

        } catch (error) {
            console.error('Error creating shop:', error);
        }
    };

    const GetShops = async (userid,) => {
        console.log(UserId, userid, 'shopss  ')
        try {
            const response = await getShops(userid, 1);
            // const response = await login('userTwo', 'userTwo@123');
            console.log(response, 'shop api response')

            dispatch(setShops(response?.shops));
            await navigate('shops')

        } catch (error) {
            // Alert(error)
            console.error('Error during login:hwre', error?.message);


        }
    };

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
            selectionLimit: 5,
            mediaType: 'photo',
            includeBase64: true,
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
                navigate('LocationScreen', { data: { latitude: latitude, longitude: longitude } })
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
    // const renderImageSelection = () => {
    //     const imageSlots = [];
    //     for (let i = 0; i < 5; i++) {
    //         const imageUri = images[i] || (shopdetails?.shopImage && shopdetails.shopImage[i]);
    //         imageSlots.push(
    //             <TouchableOpacity key={i} style={styles.imageSlot} onPress={requestCameraPermission}>
    //                 {imageUri ? (
    //                     <>
    //                         <Image source={{ uri: imageUri }} style={styles.image} />
    //                         <TouchableOpacity onPress={() => handleImageRemove(i)} style={styles.removeButton}>
    //                             <Text style={styles.removeButtonText}>Remove</Text>
    //                         </TouchableOpacity>
    //                     </>
    //                 ) : (
    //                     <Text style={styles.addImageText}>Add Image</Text>
    //                 )}
    //             </TouchableOpacity>
    //         );
    //     }
    //     return imageSlots;
    // };


    return (

        <SafeAreaView style={styles.container}>
            <Header title={'Edit Shops'} isBackArrow={true} isNotification={false} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <CustomTextInput
                    title={'Name Of Shop'}
                    placeholder="Enter shop name"
                    isRequired={true}
                    errorText={checkshopName}
                    onChangeText={text => {
                        setShopName(text);

                        changecheckshopName('');
                    }}
                    value={shopName}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * .9 }}>
                    <CustomTextInput
                        title={'Shop Code'}
                        placeholder="Enter shop code"
                        isRequired={true}
                        errorText={checkshopCode}
                        inputwidth={width * .4}
                        onChangeText={text => {
                            setShopCode(text);
                            changecheckShopCode('');
                        }}
                        value={shopCode}
                    />
                    <View style={{ width: width * .4, backgroundColor: '#CCE1ED', height: height / 20, justifyContent: 'center', alignItems: 'center', marginTop: 25, borderRadius: 10 }}>
                        <Text style={{ color: 'black' }}>0</Text>
                    </View>
                </View>

                <CustomSelectionBox
                    title={'Location'}
                    isRequired={true}
                    value={location ? location?.LocationName : 'Select'}
                    options={locationlist}
                    onSelect={handleorderSelect}
                    displayProperty="LocationName"
                />
                {/* <CustomSelectionBox
                    title={'Location'}
                    value={location == '' ? 'Select Location' : location}
                    options={categories}
                    onSelect={category => setlocation(category)}
                /> */}
                <CustomTextInput
                    title={'Address'}
                    placeholder="Address"
                    errorText={checkshopAddress}
                    isRequired={true}
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
                        Add Location <Text style={styles.requiredText}>*</Text>
                    </Text>
                    <TouchableOpacity

                        onPress={() => navigate('LocationScreen', { data: { latitude: latitude, longitude: longitude } })}
                        // onPress={() => requestLocationPermission()}
                        style={styles.locationButton}>
                        <Text style={styles.selectLocationText}>
                            {locationdata?.latitude ? locationdata?.latitude + ',' + locationdata?.longitude : 'Select Location'}
                        </Text>
                    </TouchableOpacity>

                </View>
                <CustomTextInput
                    title={'Contact Number'}
                    placeholder="Contact Number"
                    errorText={checkcontactNumber}
                    isRequired={true}
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
                    isRequired={true}
                    onChangeText={text => {
                        setEmail(text);
                        changecheckEmail('');
                    }}
                    value={email}
                    keyboardType="email-address"
                    placeholderTextColor="gray"
                />
                {/* <TouchableOpacity style={styles.imageButton} onPress={() => requestCameraPermission()}>
                    <Text style={styles.buttonText}>Select Images</Text>
                </TouchableOpacity> */}
                <View style={{ width: '90%', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={styles.buttonText}>Upload Images</Text>
                    <TouchableOpacity onPress={() => setImages([])}><Text style={{ color: 'blue' }}>Remove images</Text></TouchableOpacity>
                </View>

                {renderImageSelection()}
                <View style={styles.OrderButton}>
                    <HomeOrderButton onpress={() => isValidate()} title={'Add Shop'} />
                </View>
            </ScrollView>

            {/* <View style={styles.saveButtonContainer}>
                <CommonButton
                    onPress={() => isValidate()}
                    color={'#003451'}
                    title={'Add Shop'}
                    width={width * 0.4}
                    texttitle={'white'}
                />
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFFFFF',
        // backgroundColor: 'red',
        width: width * 1,
        alignSelf: 'center',
        // alignItems: 'center',
        justifyContent: 'center'
    },
    scrollContainer: {
        // flex: 1,
        // paddingHorizontal: 15,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Full width of the screen
        paddingVertical: 16,


    },
    saveButtonContainer: {
        paddingBottom: 10,
        // paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        height: 60
    },
    locationText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 5
    },
    locationButton: {
        height: height * .05,
        width: width * .9 - 2,
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

    imageButton: {
        backgroundColor: '#003451',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
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
        marginBottom: 70,
        // backgroundColor: 'red'

    },
    selectedImageWrapper: {
        marginRight: 10,
        marginBottom: 10,
        width: width / 5.5,
        height: width / 5.5,
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
        width: width / 5.5,
        height: width / 5.5,
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
        // backgroundColor: 'red'
    },
    plusIcon: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ccc',
    },
    requiredText: {
        color: 'red',
        marginLeft: 5,
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

export default EditShop;
