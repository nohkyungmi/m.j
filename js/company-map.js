// js/company-map.js
// Initializes a Leaflet map centered on the provided coordinates (from Plus Code 86F9+FW)

document.addEventListener('DOMContentLoaded', function () {
  // Coordinates approximated from Plus Code 86F9+FW (용인시 경기도)
  const companyLat = 37.2336;
  const companyLng = 127.1901;

  // Ensure the target element exists
  const mapEl = document.getElementById('company-map');
  if (!mapEl) return;

  // Create the map
  const map = L.map('company-map', {
    center: [companyLat, companyLng],
    zoom: 15,
    zoomControl: true,
    scrollWheelZoom: false
  });

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add marker and popup
  const marker = L.marker([companyLat, companyLng]).addTo(map);
  marker.bindPopup('<b>엠.제이인터내셔날</b><br>경기도 용인시 처인구 모현읍 이일로 7-9<br>Plus Code: 86F9+FW').openPopup();

});
