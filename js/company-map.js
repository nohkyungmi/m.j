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
    // Exact coordinates for 37°19'25.5"N 127°13'11.4"E
    const companyLat = 37.323750;
    const companyLng = 127.219833;
    
    // Create map centered on company location
    const map = L.map('company-map').setView([companyLat, companyLng], 17);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Create custom marker with gold color (brand color #C5A059)
    const goldIcon = L.icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23C5A059"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5-2.5z"/></svg>',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -32]
    });
    
    // Add marker at exact coordinates
    const marker = L.marker([companyLat, companyLng], { icon: goldIcon }).addTo(map);
    
    // Create custom popup content (Plus Code & Coordinates REMOVED)
    const popupContent = `
        <div style="font-family: 'Nanum Gothic', sans-serif; width: 200px; text-align: center; padding: 5px;">
            <div style="font-size: 24px; margin-bottom: 5px;">😊</div>
            <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px; font-weight: 700;">
                엠.제이인터내셔날
            </h3>
            <p style="margin: 5px 0; font-size: 13px; color: #555; line-height: 1.4;">
                경기도 용인시 처인구 모현읍 이일로 7-9
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 10px 0;">
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #C5A059; font-weight: 700;">
                ☎ 031-333-2303
            </p>
        </div>
    `;
    
    // Bind popup to marker and open it automatically
    marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'company-popup'
    }).openPopup();
    
    // Position zoom controls
    map.zoomControl.setPosition('topright');
}
