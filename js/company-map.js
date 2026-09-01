// Company Map - Soft Pastel Design Implementation

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
    
    // 지도를 담을 엘리먼트 확인
    const mapContainer = document.getElementById('company-map');
    if (!mapContainer) return;

    // 지도 초기화
    const map = L.map('company-map', {
        zoomControl: false
    }).setView([companyLat, companyLng], 17);
    
    // 1. 파스텔 베이지/민트 감성 타일 (CartoDB Voyager)
    const pastelLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);

    // 2. 고해상도 위성 지도
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    });

    const baseMaps = {
        "파스텔 지도": pastelLayer,
        "위성 사진": satelliteLayer
    };
    
    L.control.layers(baseMaps, null, { 
        position: 'topright',
        collapsed: true
    }).addTo(map);

    // 트렌디 파스텔 스마일 핀
    const smileIcon = L.divIcon({
        className: 'custom-smile-pin',
        html: `
            <div style="
                background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F3 100%);
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 20px rgba(0,0,0,0.12);
                border: 3px solid #C5A059;
                position: relative;
            ">
                <span style="font-size: 26px; line-height: 1;">😊</span>
                <div style="
                    position: absolute;
                    bottom: -8px;
                    left: 19px;
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 8px solid #C5A059;
                "></div>
            </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 58],
        popupAnchor: [0, -58]
    });

    const marker = L.marker([companyLat, companyLng], { icon: smileIcon }).addTo(map);

    // Pretendard 폰트가 적용된 자연스러운 주소 팝업
    const popupContent = `
        <div style="
            font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif; 
            width: 210px; 
            text-align: center; 
            padding: 10px 4px 6px 4px;
            background-color: #ffffff;
            border-radius: 12px;
        ">
            <h3 style="
                margin: 0 0 6px 0; 
                color: #222222; 
                font-size: 16px; 
                font-weight: 700;
                letter-spacing: -0.3px;
            ">
                엠.제이인터내셔날
            </h3>
            
            <p style="
                margin: 0 0 12px 0; 
                font-size: 13px; 
                color: #666666; 
                line-height: 1.5;
                word-break: keep-all;
                letter-spacing: -0.3px;
            ">
                경기도 용인시 처인구<br>
                <span>모현읍 이일로 7-9</span>
            </p>

            <a href="tel:031-333-2303" style="
                display: inline-block;
                padding: 8px 18px;
                background-color: #C5A059;
                color: #FFFFFF;
                text-decoration: none;
                border-radius: 20px;
                font-size: 13px;
                font-weight: 700;
                transition: all 0.2s ease;
            " onmouseover="this.style.backgroundColor='#a38243'" onmouseout="this.style.backgroundColor='#C5A059'">
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

    // 렌더링 타이밍 이슈 해결을 위한 크기 재조정
    setTimeout(() => {
        map.invalidateSize();
    }, 200);
}
