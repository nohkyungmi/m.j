// Company Map - Pastel Soft Text Implementation

// Load Leaflet CSS
const leafletCSS = document.createElement('link');
leafletCSS.rel = 'stylesheet';
leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
document.head.appendChild(leafletCSS);

// Load Leaflet JS
const leafletJS = document.createElement('script');
leafletJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
leafletJS.onload = function() {
    initializeCompanyMap();
};
document.head.appendChild(leafletJS);

function initializeCompanyMap() {
    const companyLat = 37.323750;
    const companyLng = 127.219833;
    
    const map = L.map('company-map', {
        zoomControl: false
    }).setView([companyLat, companyLng], 17);
    
    // 파스텔 화이트 지도 (CartoDB Positron)
    const pastelLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);

    // 고해상도 위성 지도
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    });

    const baseMaps = {
        "파스텔 화이트": pastelLayer,
        "위성 사진": satelliteLayer
    };
    L.control.layers(baseMaps, null, { 
        position: 'topright',
        collapsed: true
    }).addTo(map);

    // 스마일 마커
    const smileIcon = L.divIcon({
        className: 'custom-smile-pin',
        html: `
            <div style="
                background: linear-gradient(135deg, #FDFBFB 0%, #EBEDEE 100%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 6px 16px rgba(0,0,0,0.12);
                border: 3px solid #E6D5B8;
                position: relative;
            ">
                <span style="
                    font-size: 30px;
                    line-height: 1;
                    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
                ">😊</span>
                <div style="
                    position: absolute;
                    bottom: -8px;
                    left: 21px;
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 8px solid #E6D5B8;
                "></div>
            </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 58],
        popupAnchor: [0, -58]
    });

    const marker = L.marker([companyLat, companyLng], { icon: smileIcon }).addTo(map);

    // 소프트한 텍스트로 수정된 팝업
    const popupContent = `
        <div style="
            font-family: 'Poppins', 'Nanum Gothic', sans-serif; 
            width: 210px; 
            text-align: center; 
            padding: 8px 4px;
            background-color: rgba(255, 255, 255, 0.98);
            border-radius: 12px;
        ">
            <h3 style="
                margin: 0 0 6px 0; 
                color: #444444; 
                font-size: 16px; 
                font-weight: 600;
                letter-spacing: -0.5px;
            ">
                엠.제이인터내셔날
            </h3>
            
            <!-- 글씨 볼드(굵기)를 빼고 진하지 않은 Soft Grey(#555555)로 변경 -->
            <p style="
                margin: 0 0 12px 0; 
                font-size: 13px; 
                color: #666666; 
                line-height: 1.5;
                word-break: keep-all;
            ">
                경기도 용인시 처인구<br>
                <span style="color: #555555; font-weight: 400;">모현읍 이일로 7-9</span>
            </p>

            <a href="tel:031-333-2303" style="
                display: inline-block;
                padding: 7px 16px;
                background-color: #E6D5B8;
                color: #4A3E2C;
                text-decoration: none;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 600;
                transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#D5C4A7'" onmouseout="this.style.backgroundColor='#E6D5B8'">
                ☎ 031-333-2303
            </a>
        </div>
    `;

    marker.bindPopup(popupContent, { 
        maxWidth: 260, 
        className: 'custom-popup-trendy',
        closeButton: false,
        offset: [0, -10]
    }).openPopup();

    L.control.zoom({ position: 'bottomright' }).addTo(map);
}
