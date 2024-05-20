import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Text, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

import axios from 'axios';

const LeafletMap = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mapHtmlContent, setMapHtmlContent] = useState('');
  const [position, setPosition] = useState({
    latitude: '',
    longitude: ''
  });

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          return true;
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  const handleSearchLocationPermission = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Location permission is required to use this feature.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Received current position:', position);
        const { latitude, longitude } = position.coords;
        setPosition({ latitude, longitude });
        handleSearchLocation(latitude, longitude);
      },
      (error) => {
        console.error('Error getting current position:', error);
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  useEffect(() => {
    // handleSearchLocationPermission();
  }, []);


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need your location to provide better service.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setPosition({ latitude, longitude });
          handleSearchLocation(latitude, longitude);
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    requestLocationPermission();
  }, []);






  const handleSearchLocation = async (latitude, longitude, retryCount = 0) => {
    console.log('Searching location for', latitude, longitude);
    const apiKey = 'pk.97c3d53ec9574631b737e8b4417b2b68'; // Replace with your LocationIQ API key

    try {
      if (!searchQuery) {
        const reverseGeocodeUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
        const reverseGeocodeResponse = await axios.get(reverseGeocodeUrl);
        const locationName = reverseGeocodeResponse.data.address.city || reverseGeocodeResponse.data.display_name;
        setSearchQuery(locationName);
        fetchLocationData(locationName);
      } else {
        fetchLocationData(searchQuery);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      if (error.response && error.response.status === 429 && retryCount < 3) {
        const waitTime = Math.pow(2, retryCount) * 1000;
        setTimeout(() => {
          handleSearchLocation(latitude, longitude, retryCount + 1);
        }, waitTime);
      }
    }
  };

  const fetchLocationData = async (query) => {
    const apiKey = 'pk.97c3d53ec9574631b737e8b4417b2b68';
    const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(query)}&format=json`;

    try {
      const response = await axios.get(apiUrl);
      const { lat, lon } = response.data[0];
      setPosition({ latitude: lat, longitude: lon });

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Leaflet Map</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <style>#map { height: 90vh; }</style>
        </head>
        <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
        var map = L.map('map').setView([${lat}, ${lon}], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([${lat}, ${lon}]).addTo(map);
        </script>
        </body>
        </html>
      `;
      setMapHtmlContent(htmlContent);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleMessage = (event) => {
    console.log("Received event:", event.nativeEvent.data);
    const eventData = JSON.parse(event.nativeEvent.data);
    console.log("Message from web page:", eventData.message);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', color: 'black', borderWidth: 1, margin: 10, paddingHorizontal: 10 }}
        placeholder="Enter location to search..."
        value={searchQuery}
        placeholderTextColor={'gray'}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title="Search Location" onPress={() => handleSearchLocation(position.latitude, position.longitude)} />
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtmlContent }}
        javaScriptEnabled={true}
        onMessage={handleMessage}
        style={{ flex: 1 }}
      />
      <View style={{ marginLeft: 10, }}>
        <Text style={{ color: 'black' }}>latitude: {position.latitude}</Text>
        <Text style={{ color: 'black' }}>longitude: {position.longitude}</Text>

      </View>
      <Button title="Submit" onPress={() => navigation.navigate('AddShop', { locationdata: position })} />
    </View>
  );
};

export default LeafletMap;
