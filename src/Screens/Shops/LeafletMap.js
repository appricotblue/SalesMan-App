import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Text, PermissionsAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

const LeafletMap = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mapHtmlContent, setMapHtmlContent] = useState()
  const [position, setPosition] = useState({
    latitude: '',
    longitude: ''
  })
  const [positionData, setPositionData] = useState(null);
  // .bindPopup('${searchQuery}').openPopup();

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
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
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return;
    }
  };

  const handleSearchLocationpermission = async () => {
    try {
      await requestLocationPermission();

      // Geolocation.getCurrentPosition(
      //   async position => {
      //     console.log('Received current position:', position);
      //     const { latitude, longitude } = position.coords;
      //     setPosition({ latitude, longitude });
      //     console.log(position.coords.latitude, 'pooo')
      //     handleSearchLocation(position.coords.latitude, position.coords.longitude)
      //     // Your existing code for fetching location details and rendering map
      //     // Make sure you handle errors properly
      //   },
      //   error => {
      //     console.error('Error getting current position:', error);
      //     setSearchQuery('ernakulam')
      //     // Alert.alert('Error', error.message);
      //   },
      //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      // );

      Geolocation.getCurrentPosition(
        position => {
          // setLatitude(position.coords.latitude);
          // setLongitude(position.coords.longitude);
          console.log(position.coords.latitude, position.coords.longitude, '------->')
          handleSearchLocation(position.coords.latitude, position.coords.longitude)
        },
        error => setError(error.message),
      );
    } catch (err) {
      console.error('Error getting current position:', err);
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    handleSearchLocationpermission();
  }, []);

  const handleSearchLocation = async (latitude, longitude, retryCount = 0) => {
    console.log('entered d', latitude, longitude, 'test')
    const apiKey = 'pk.97c3d53ec9574631b737e8b4417b2b68'; // Replace with your LocationIQ API key

    try {
      // Reverse geocode the latitude and longitude to get a location name
      if (searchQuery == '') {


        const reverseGeocodeUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
        const reverseGeocodeResponse = await axios.get(reverseGeocodeUrl);
        console.log(reverseGeocodeResponse, 'reveregeo')
        // const locationName = reverseGeocodeResponse.data.display_name;
        const locationName = reverseGeocodeResponse.data.address.city;
        console.log(locationName, 'location')
        // Use the location name in the search query
        // const query = encodeURIComponent(locationName.trim());
        const query = encodeURIComponent(searchQuery == '' ? locationName : searchQuery.trim());

        const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json`;

        console.log('API URL:', apiUrl); // Log the constructed URL

        // Fetch location details
        const response = await axios.get(apiUrl);
        console.log(response, 'url rsz')

        // Extract latitude and longitude from the response
        const { lat, lon } = response.data[0];
        console.log(lat, lon, 'here get')
        setPosition({ latitude: lat, longitude: lon });

        // Update the map HTML content with the new coordinates
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<title>Leaflet Map</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<style>
#map { height: 90vh; }
</style>
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

        // Update mapHtmlContent state with the new HTML content
        setMapHtmlContent(htmlContent);
}
      else {
        // const query = encodeURIComponent(locationName.trim());
        const query = encodeURIComponent(searchQuery.trim());

        const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json`;

        console.log('API URL:', apiUrl); // Log the constructed URL

        // Fetch location details
        const response = await axios.get(apiUrl);
        // console.log(response, 'url rsz')

        // Extract latitude and longitude from the response
        const { lat, lon } = response.data[0];
        setPosition({ latitude: lat, longitude: lon });
        // Update the map HTML content with the new coordinates
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<title>Leaflet Map</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<style>
#map { height: 90vh; }
</style>
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

        // Update mapHtmlContent state with the new HTML content
  setMapHtmlContent(htmlContent);

      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      if (error.response && error.response.status === 429 && retryCount < 3) {
        // Retry after waiting for some time (exponential backoff)
        const waitTime = Math.pow(2, retryCount) * 1000; // Wait for 2^retryCount seconds
        setTimeout(() => {
          handleSearchLocation(latitude, longitude, retryCount + 1);
        }, waitTime);
      } else {
        // Alert.alert('Error', 'Error fetching location data. Please try again.');
      }
    }
};


  // const handleSearchLocation = async (latitude, longitude) => {
  // const apiKey = 'pk.97c3d53ec9574631b737e8b4417b2b68'; // Replace with your LocationIQ API key
  // console.log(position, 'location heee', latitude, longitude)
  // // let query;
  // // query = `${position.latitude},${position.longitude}`;
  // // Check if searchQuery is empty, if not, use it for the query
  // // if (searchQuery.trim() !== '') {
  // // query = encodeURIComponent(searchQuery.trim());
  // // } else {
  // // // If searchQuery is empty, use the current location
  // // query = `${position.latitude},${position.longitude}`;
  // // }
  // // console.log(query, 'rrrrr')
  // query = `${latitude},${longitude}`;
  // // const query = encodeURIComponent(searchQuery == '' ? 'ernakulam' : searchQuery.trim());
  // const apiUrl = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json`;
  // console.log('API URL:', apiUrl); // Log the constructed URL

  // try {
  // // Fetch location details
  // const response = await axios.get(apiUrl);

  // // Extract latitude and longitude from the response
  // const { lat, lon } = response.data[0];

  // // Update the position state with the new coordinates
  // setPosition({ ...position, latitude: lat, longitude: lon });

  // // Update the map HTML content with the new coordinates
  // const htmlContent = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  // <title>Leaflet Map</title>
  // <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  // <style>
  // #map { height: 90vh; }
  // </style>
  // </head>
  // <body>
  // <div id="map"></div>
  // <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  // <script>
  // var map = L.map('map').setView([${lat}, ${lon}], 13);
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  // L.marker([${lat}, ${lon}]).addTo(map);
  // </script>
  // </body>
  // </html>
  // `;

  // // Update mapHtmlContent state with the new HTML content
  // setMapHtmlContent(htmlContent);
  // } catch (error) {
  // console.error('Error fetching location data:', error);
  // Alert.alert('Error', 'Error fetching location data. Please try again.');
  // }
  // };


  // const handleSearchLocation = async () => {
  // // if (!searchQuery.trim()) {
  // // Alert.alert('Error', 'Please enter a location to search.');
  // // return;
  // // }

  // const apiKey = 'pk.97c3d53ec9574631b737e8b4417b2b68'; // Replace with your LocationIQ API key
  // const query = encodeURIComponent(searchQuery == '' ? 'ernakulam' : searchQuery.trim());

  // const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json`)

  // const { lat, lon } = response.data[0]

  // setPosition({ ...position, latitude: lat, longitude: lon })



  // const htmlContent = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  // <title>Leaflet Map</title>
  // <meta name="viewport" content="width=device-width, initial-scale=1.0">
  // <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  // <style>
  // #map { height: 90vh; }
  // </style>
  // </head>
  // <body>
  // <div id="map"></div>
  // <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  // <script>
  // var map = L.map('map').setView([0, 0], 13);
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // fetch('https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json')
  // .then(response => response.json())
  // .then(data => {
  // if (data.length > 0) {
  // var coordinates = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  // map.setView(coordinates, 13);
  // L.marker(coordinates).addTo(map)
  // } else {
  // alert('Location not found. Please try again.');
  // }
  // })
  // .catch(error => {
  // console.error('Error fetching geocoding API:', error);
  // alert('Error fetching location data. Please try again.');
  // });
  // </script>
  // </body>
  // </html>
  // `;

  // setMapHtmlContent(htmlContent);
  // };

  // useEffect(() => {
  // handleSearchLocation()
  // }, [])

  // useEffect(() => {
  // const handleMessage = (event) => {
  // const position = JSON.parse(event.data);
  // console.log(position, 'kitiyoooo')
  // // Do something with the position data received from the webview
  // setPositionData(position);
  // };

  // // Add event listener for messages from WebView
  // const listener = WebView.onMessage(message => {
  // handleMessage(message);
  // });

  // // Clean up on unmount
  // return () => {
  // listener.remove();
  // };
  // }, []);

  // const handleMessage = (event) => {
  // console.log(event, 'eventtt')
  // const eventData = JSON.parse(event.nativeEvent.data);
  // console.log("Message from web page:", eventData.message);
  // // Handle the event here
  // };

  const handleMessage = (event) => {
    console.log("Received event:", event.nativeEvent.data);
    const eventData = JSON.parse(event.nativeEvent.data);
    console.log("Message from web page:", eventData.message);
    // Handle the event here
  };
  const handleOnMessage = (event) => {
    // Handle the message sent from the WebView
    // const buttonData = event.nativeEvent.data;
    console.log('Button data:', event);
    // Perform any further actions with the button data here
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


      <Button title="Search Location" onPress={() => handleSearchLocation(null, null)} />


    <WebView
      originWhitelist={['*']}
      // source={{ uri: 'http://192.168.1.30:5174/' }}
      source={{ html: mapHtmlContent }}
      javaScriptEnabled={true}
      onMessage={() => handleMessage()}
      // onMessage={() => handleOnMessage()}
      style={{ flex: 1 }}
    />

    <View>
      <Text style={{ color: 'black' }}>latitude:{position.latitude}</Text>
      <Text style={{ color: 'black' }}>longitude:{position.longitude}</Text>

      <Button title="submit" onPress={() => navigation.navigate('AddShop', { locationdata: position })} />
    </View>
  </View>
);
};

export default LeafletMap;
