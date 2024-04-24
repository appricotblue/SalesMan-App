// // app.js
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const icon = new L.Icon({
//     iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//     shadowSize: [41, 41],
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const mapContainer = L.map('map-container').setView([51.505, -0.09], 13);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapContainer);

//     const inputElement = document.createElement('input');
//     inputElement.setAttribute('type', 'text');
//     inputElement.setAttribute('placeholder', 'Search for a location');
//     inputElement.setAttribute('id', 'location-input');

//     const clearButton = document.createElement('button');
//     clearButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /></svg>';
//     clearButton.setAttribute('id', 'clear-button');
//     clearButton.addEventListener('click', () => {
//         inputElement.value = '';
//     });

//     const searchButton = document.createElement('button');
//     searchButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="128" y1="240" x2="128" y2="208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /><circle cx="128" cy="128" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /><line x1="128" y1="16" x2="128" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /><line x1="16" y1="128" x2="48" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /><line x1="240" y1="128" x2="208" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /><circle cx="128" cy="128" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" /></svg>';
//     searchButton.setAttribute('id', 'search-button');
//     searchButton.addEventListener('click', () => {
//         searchLocation();
//     });

//     const searchLocation = async () => {
//         const location = inputElement.value.trim();
//         if (location === '') return;

//         const apiKey = "pk.97c3d53ec9574631b737e8b4417b2b68";
//         const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(location)}&format=json`;

//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             if (data[0]) {
//                 const { lat, lon } = data[0];
//                 mapContainer.setView([lat, lon], mapContainer.getZoom());
//                 L.marker([lat, lon], { icon }).addTo(mapContainer);
//             } else {
//                 alert("Location not found");
//             }
//         } catch (error) {
//             alert("Error fetching data");
//             console.error(error);
//         }
//     };

//     inputElement.addEventListener('keydown', (e) => {
//         if (e.key === "Enter") {
//             searchLocation();
//         }
//     });

//     const searchBar = document.createElement('div');
//     searchBar.setAttribute('id', 'search-bar');
//     searchBar.appendChild(inputElement);
//     searchBar.appendChild(clearButton);
//     searchBar.appendChild(searchButton);

//     document.body.appendChild(searchBar);
// });
