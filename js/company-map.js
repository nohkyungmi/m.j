// Company Map - Pastel Trendy Implementation

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
    
    // 지도를 부드러운 느낌이 나도록 줌 레벨 17로 설정 (건물 실루엣 유지)
    const map = L.map('company-map', {
        zoomControl: false // 기본 줌 컨트롤 숨김 (나중에 재배치)
    }).setView([companyLat, companyLng], 17);
    
    // *** [핵심 수정 1] 파스텔 톤 배경 지도 설정 ***
    // CartoDB Voyager: 밝고 파스텔 톤이 가미된 도시형 지도
    const pastelLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // 2. 고해상도 위성 지도 (선택 가능용으로 유지하되, 파스텔 지도 위에 겹침)
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    });

    // 오른쪽 상단에 [파스텔 지도 / 위성 지도] 전환 버튼 추가
    const baseMaps = {
        "파스텔 지도": pastelLayer,
        "위성 사진": satelliteLayer
    };
    L.control.layers(baseMaps, null, { 
        position: 'topright',
        collapsed: true // 부피를 줄이기 위해 접힌 상태로 시작
    }).addTo(map);


    // *** [핵심 수정 2] 트렌디한 파스텔 스마일 마커 디자인 ***
    const smileIcon = L.divIcon({
        className: 'custom-smile-pin',
        html: `
            <div style="
                background: linear-gradient(135deg, #FDFBFB 0%, #EBEDEE 100%); /* 배경: 파스텔 크림/그레이 */
                width: 50px; /* 약간 더 크게 */
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 6px 16px rgba(0,0,0,0.12); /* 그림자를 부드럽게 */
                border: 3px solid #E6D5B8; /* 테두리를 파스텔 골드로 */
                position: relative;
            ">
                <span style="
                    font-size: 30px;
                    line-height: 1;
                    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
                ">😊</span>
                <div style="
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 21px;
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 8px solid #E6D5B8; /* 핀 꼬리 색상 통일 */
                "></div>
            </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 58], // 꼬리 위치 고려 수정
        popupAnchor: [0, -58]
    });

    // 스마일 마커 찍기
    const marker = L.marker([companyLat, companyLng], { icon: smileIcon }).addTo(map);

    // *** [핵심 수정 3] 현대적인 팝업 스타일링 ***
    const popupContent = `
        <div style="
            font-family: 'Poppins', 'Nanum Gothic', sans-serif; 
            width: 230px; 
            text-align: center; 
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.95); /* 약간 투명하게 */
            border-radius: 12px;
        ">
            <h3 style="
                margin: 0 0 10px 0; 
                color: #5D5D5A; /* 부드러운 그레이 */
                font-size: 18px; 
                font-weight: 700;
                letter-spacing: -0.5px;
            ">
                엠.제이인터내셔날
            </h3>
            <p style="
                margin: 5px 0 12px 0; 
                font-size: 14px; 
                color: #888; /* 더 밝은 그레이 */
                line-height: 1.5;
            ">
                경기도 용인시 처인구 모현읍 이일로 7-9
            </p>
            <a href="tel:031-333-2303" style="
                display: inline-block;
                padding: 8px 18px;
                background-color: #E6D5B8; /* 파스텔 골드 */
                color: #fff;
                text-decoration: none;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 700;
                transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#C5A059'" onmouseout="this.style.backgroundColor='#E6D5B8'">
                ☎ 031-333-2303
            </a>
        </div>
    `;

    // 팝업 옵션 수정
    marker.bindPopup(popupContent, { 
        maxWidth: 260, 
        className: 'custom-popup-trendy',
        closeButton: false, // 닫기 버튼 숨김 (더 깔끔)
        offset: [0, -10] // 팝업 위치 미세 조정
    }).openPopup();

    // 줌 컨트롤 위치 조정 (더 깔끔하게)
    L.control.zoom({ position: 'bottomright' }).addTo(map);
}
