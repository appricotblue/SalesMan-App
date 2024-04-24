import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const LeafletMap = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mapHtmlContent, setMapHtmlContent] = useState()
  const [position, setPosition] = useState({
    latitude: '',
    longitude: ''
  })

  // .bindPopup('${searchQuery}').openPopup();

  const handleSearchLocation = async () => {
    // if (!searchQuery.trim()) {
    //   Alert.alert('Error', 'Please enter a location to search.');
    //   return;
    // }

    const apiKey = 'pk.97c3d53ec9574631b737e8b4417b2b68'; // Replace with your LocationIQ API key
    const query = encodeURIComponent(searchQuery == '' ? 'ernakulam' : searchQuery.trim());

    const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json`)

    const { lat, lon } = response.data[0]

    setPosition({ ...position, latitude: lat, longitude: lon })

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
          var map = L.map('map').setView([0, 0], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

          fetch('https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json')
            .then(response => response.json())
            .then(data => {
              if (data.length > 0) {
                var coordinates = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                map.setView(coordinates, 13);
                L.marker(coordinates).addTo(map)
              } else {
                alert('Location not found. Please try again.');
              }
            })
            .catch(error => {
              console.error('Error fetching geocoding API:', error);
              alert('Error fetching location data. Please try again.');
            });
        </script>
      </body>
      </html>
    `;

    setMapHtmlContent(htmlContent);
  };

  useEffect(() => {
    handleSearchLocation()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingHorizontal: 10 }}
        placeholder="Enter location to search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <View>
        <Text>latitude:{position.latitude}</Text>
        <Text>longitude:{position.longitude}</Text>

        <Button title="submit" onPress={() => navigation.navigate('AddShop', { locationdata: position })} />
      </View>

      <Button title="Search Location" onPress={handleSearchLocation} />


      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtmlContent }}
        javaScriptEnabled={true}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default LeafletMap;
