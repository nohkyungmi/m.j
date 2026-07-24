// Company Map - High Resolution Satellite Implementation

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
    
    // 건물이 가장 선명하게 보이는 줌 레벨 18 설정
    const map = L.map('company-map').setView([companyLat, companyLng], 18);
    
    // 1. 고해상도 위성 사진 지도 (건물 지붕 및 주변 실물 사진 표시)
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    }).addTo(map);

    // 2. 일반 지도 레이어 (선택 가능용)
    const streetLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    });

    // 오른쪽 상단에 [위성 지도 / 일반 지도] 전환 버튼 추가
    const baseMaps = {
        "위성 사진 지도": satelliteLayer,
        "일반 지도": streetLayer
    };
    L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);

    // 커스텀 스마일(😊) 마커 아이콘
    const smileIcon = L.divIcon({
        className: 'custom-smile-pin',
        html: `
            <div style="
                background-color: #C5A059;
                width: 44px;
                height: 44px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                border: 2px solid #ffffff;
            ">
                <span style="
                    transform: rotate(45deg);
                    font-size: 26px;
                    line-height: 1;
                ">😊</span>
            </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44]
    });

    // 스마일 마커 찍기
    const marker = L.marker([companyLat, companyLng], { icon: smileIcon }).addTo(map);

    // 안내 팝업창
    const popupContent = `
        <div style="font-family: 'Nanum Gothic', sans-serif; width: 200px; text-align: center; padding: 5px;">
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

    marker.bindPopup(popupContent, { maxWidth: 250 }).openPopup();
    map.zoomControl.setPosition('topright');
}
