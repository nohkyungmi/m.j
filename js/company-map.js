// Company Map - Leaflet Map Implementation

// Load Leaflet CSS
const leafletCSS = document.createElement('link');
leafletCSS.rel = 'stylesheet';
leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
document.head.appendChild(leafletCSS);

// Load Leaflet JS
const leafletJS = document.createElement('script');
leafletJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
leafletJS.onload = function() {
    // Initialize map when Leaflet is loaded
    initializeCompanyMap();
};
document.head.appendChild(leafletJS);

function initializeCompanyMap() {
    // Company location coordinates (Plus Code 86F9+FW reversed to coordinates)
    const companyLat = 37.2336;
    const companyLng = 127.1901;
    const plusCode = '86F9+FW';
    
    // Create map centered on company location
    const map = L.map('company-map').setView([companyLat, companyLng], 16);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Create custom marker with gold color (brand color #C5A059)
    const goldIcon = L.icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23C5A059"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    // Add marker with company info popup
    const marker = L.marker([companyLat, companyLng], { icon: goldIcon }).addTo(map);
    
    // Create popup content with company information
    const popupContent = `
        <div style="font-family: 'Nanum Gothic', sans-serif; width: 220px; text-align: center;">
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: 700;">
                엠.제이인터내셔날
            </h3>
            <p style="margin: 8px 0; font-size: 13px; color: #555; line-height: 1.4;">
                경기도 용인시 처인구 모현읍 이일로 7-9
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
            <p style="margin: 8px 0; font-size: 12px; color: #888;">
                <strong>Plus Code:</strong> ${plusCode}
            </p>
            <p style="margin: 8px 0; font-size: 12px; color: #888;">
                <strong>좌표:</strong> ${companyLat}, ${companyLng}
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #C5A059; font-weight: 700;">
                ☎ 031-333-2303
            </p>
        </div>
    `;
    
    // Bind popup to marker and open it
    marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'company-popup'
    }).openPopup();
    
    // Position zoom controls
    map.zoomControl.setPosition('topright');
}
