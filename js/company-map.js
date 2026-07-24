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
    initializeCompanyMap();
};
document.head.appendChild(leafletJS);

function initializeCompanyMap() {
    // Exact company coordinates
    const companyLat = 37.323750;
    const companyLng = 127.219833;
    
    // 지도를 레벨 18로 확대하여 건물 및 주변 구조물이 가장 선명하게 보이도록 설정
    const map = L.map('company-map').setView([companyLat, companyLng], 18);
    
    // 건물의 명확한 윤곽선과 주변 빌딩을 선명하게 보여주는 고해상도 지도 타일
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);
    
    // 기존 금색 핀 대신 커스텀 스마일(😊) 마커 아이콘 생성
    const smileIcon = L.divIcon({
        className: 'custom-smile-pin',
        html: `
            <div style="
                background-color: #C5A059;
                width: 42px;
                height: 42px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border: 2px solid #ffffff;
            ">
                <span style="
                    transform: rotate(45deg);
                    font-size: 24px;
                    line-height: 1;
                ">😊</span>
            </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 42],
        popupAnchor: [0, -42]
    });
    
    // 스마일 핀 마커 등록
    const marker = L.marker([companyLat, companyLng], { icon: smileIcon }).addTo(map);
    
    // 안내 팝업창 내용
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
    
    // 마커 클릭시 팝업 표시
    marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'company-popup'
    }).openPopup();
    
    // 지도 확대/축소 버튼 우측 상단 위치 지정
    map.zoomControl.setPosition('topright');
}
