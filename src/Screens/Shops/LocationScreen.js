import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const LocationScreen = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleLocationSelect = (data, details) => {
        // Extract the selected location details (latitude and longitude)
        const { location } = details.geometry;
        setSelectedLocation(location);
    };
    useEffect(() => {
        const { data } = route.params;
        console.log(' movies?', data)

    }, [navigation]);
    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <GooglePlacesAutocomplete
                placeholder="Search Location"
                onPress={handleLocationSelect}
                fetchDetails={true}
                query={{
                    key: 'YOUR_GOOGLE_MAPS_API_KEY',
                    language: 'en',
                }}
                styles={{
                    container: styles.searchContainer,
                    listView: styles.listView,
                    separator: styles.separator,
                }}
            />

            {/* Map View */}
            {selectedLocation && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.lat,
                            longitude: selectedLocation.lng,
                        }}
                    />
                </MapView>
            )}

            {/* Selected Location Details */}
            {selectedLocation && (
                <View style={styles.locationDetails}>
                    <Text>Latitude: {selectedLocation.lat}</Text>
                    <Text>Longitude: {selectedLocation.lng}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    searchContainer: {
        width: '100%',
    },
    listView: {
        marginTop: 10,
    },
    separator: {
        height: 0.5,
        backgroundColor: '#ccc',
    },
    map: {
        width: '100%',
        height: 300,
        marginTop: 20,
    },
    locationDetails: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
});

export default LocationScreen;
