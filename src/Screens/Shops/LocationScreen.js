// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const LocationScreen = () => {
//     const [selectedLocation, setSelectedLocation] = useState(null);

//     const handleLocationSelect = (data, details) => {
//         // Extract the selected location details (latitude and longitude)
//         const { location } = details.geometry;
//         setSelectedLocation(location);
//     };
//     useEffect(() => {
//         const { data } = route.params;
//         console.log(' movies?', data)

//     }, [navigation]);
//     return (
//         <View style={styles.container}>
//             {/* Search Bar */}
//             <GooglePlacesAutocomplete
//                 placeholder="Search Location"
//                 onPress={handleLocationSelect}
//                 fetchDetails={true}
//                 query={{
//                     key: 'YOUR_GOOGLE_MAPS_API_KEY',
//                     language: 'en',
//                 }}
//                 styles={{
//                     container: styles.searchContainer,
//                     listView: styles.listView,
//                     separator: styles.separator,
//                 }}
//             />

//             {/* Map View */}
//             {selectedLocation && (
//                 <MapView
//                     style={styles.map}
//                     initialRegion={{
//                         latitude: selectedLocation.lat,
//                         longitude: selectedLocation.lng,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421,
//                     }}
//                 >
//                     <Marker
//                         coordinate={{
//                             latitude: selectedLocation.lat,
//                             longitude: selectedLocation.lng,
//                         }}
//                     />
//                 </MapView>
//             )}

//             {/* Selected Location Details */}
//             {selectedLocation && (
//                 <View style={styles.locationDetails}>
//                     <Text>Latitude: {selectedLocation.lat}</Text>
//                     <Text>Longitude: {selectedLocation.lng}</Text>
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//     },
//     searchContainer: {
//         width: '100%',
//     },
//     listView: {
//         marginTop: 10,
//     },
//     separator: {
//         height: 0.5,
//         backgroundColor: '#ccc',
//     },
//     map: {
//         width: '100%',
//         height: 300,
//         marginTop: 20,
//     },
//     locationDetails: {
//         marginTop: 20,
//         paddingHorizontal: 20,
//     },
// });

// export default LocationScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import LeafletMap from './LeafletMap';
import Header from '../../components/Header';

const LocationScreen = ({ route }) => {

    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationdata, setlocationdata] = useState(null);
    const { latitude, longitude } = route.params.data;

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    };
    useEffect(() => {
        const { data } = route?.params;
        console.log(' movies?', data)

        setlocationdata(data)
    }, []);

    const handleSelectLocation = () => {
        // Pass the selected location back to the previous screen
        navigation.navigate('AddShop', {
            selectedLocation: selectedLocation,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Location'} isNotification={false} isBackArrow={true} />
            <LeafletMap />
        </SafeAreaView>

        // <View style={styles.container}>
        //     <MapView
        //         style={styles.map}
        //         onPress={handleMapPress}
        //         initialRegion={{
        //             latitude: 37.785834,
        //             longitude: -122.406417,
        //             latitudeDelta: 0.0922,
        //             longitudeDelta: 0.0421,
        //         }}
        //     >
        //         {selectedLocation && (
        //             <Marker coordinate={selectedLocation} />
        //         )}
        //     </MapView>
        //     {selectedLocation && (
        //         <View style={styles.locationDetails}>
        //             <Text>
        //                 Latitude: {selectedLocation.latitude.toFixed(6)}
        //             </Text>
        //             <Text>
        //                 Longitude: {selectedLocation.longitude.toFixed(6)}
        //             </Text>
        //             <TouchableOpacity
        //                 style={styles.selectButton}
        //                 onPress={handleSelectLocation}
        //             >
        //                 <Text style={styles.selectButtonText}>
        //                     Select Location
        //                 </Text>
        //             </TouchableOpacity>
        //         </View>
        //     )}
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        flex: 1,
    },
    locationDetails: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
    },
    selectButton: {
        marginTop: 10,
        backgroundColor: '#003451',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LocationScreen;

