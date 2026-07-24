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
    // 정확한 위치 좌표
    const companyLat = 37.323750;
    const companyLng = 127.219833;
    
    // 지도를 줌 레벨 18로 확대하여 건물 형태와 주변이 잘 보이도록 설정
    const map = L.map('company-map').setView([companyLat, companyLng], 18);
    
    // 건물 윤곽과 주변 지형이 또렷하게 표현되는 상세 지도 타일 (CartoDB Voyager)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);
    
    // 고급스러운 골드 색상 마커 아이콘
    const goldIcon = L.icon({
        iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23C5A059"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5-2.5z"/></svg>',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -34]
    });
    
    // 회사 위치 마커 추가
    const marker = L.marker([companyLat, companyLng], { icon: goldIcon }).addTo(map);
    
    // 스마일 아이콘과 매장 정보 팝업
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
    
    // 마커 팝업 열기
    marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'company-popup'
    }).openPopup();
    
    // 확대/축소 버튼 위치
    map.zoomControl.setPosition('topright');
}
