// Company Map - Soft Pastel Design (강화판)

function loadLeafletAndInit() {
    if (window.L) {
        initializeCompanyMap();
        return;
    }

    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(leafletCSS);

    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    leafletJS.onload = function() {
        setTimeout(initializeCompanyMap, 150);
    };
    document.head.appendChild(leafletJS);
}

function initializeCompanyMap() {
    const companyLat = 37.323750;
    const companyLng = 127.219833;
    
    const mapContainer = document.getElementById('company-map');
    if (!mapContainer) return;

    // 이미 생성된 지도가 있다면 초기화 후 재생성
    if (mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
    }

    const map = L.map('company-map', {
        zoomControl: false,
        trackResize: true
    }).setView([companyLat, companyLng], 17);
    
    // 1. 차단율이 가장 적은 안정적인 파스텔 베이지/민트 타일 (CartoDB Positron / Voyager)
    const pastelLayer = L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
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

    const popupContent = `
        <div style="
            font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif; 
            width: 210px; 
            text-align: center; 
            padding: 10px 4px 6px 4px;
            background-color: #ffffff;
            border-radius: 12px;
        ">
            <h3 style="margin: 0 0 6px 0; color: #222222; font-size: 16px; font-weight: 700;">엠.제이인터내셔날</h3>
            <p style="margin: 0 0 12px 0; font-size: 13px; color: #666666; line-height: 1.5; word-break: keep-all;">
                경기도 용인시 처인구<br><span>모현읍 이일로 7-9</span>
            </p>
            <a href="tel:031-333-2303" style="
                display: inline-block; padding: 8px 18px; background-color: #C5A059; color: #FFFFFF;
                text-decoration: none; border-radius: 20px; font-size: 13px; font-weight: 700;
            ">☎ 031-333-2303</a>
        </div>
    `;

    marker.bindPopup(popupContent, { 
        maxWidth: 260, 
        className: 'custom-popup-trendy',
        closeButton: false,
        offset: [0, -10]
    }).openPopup();

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // ★ 렌더링 깨짐 방지용 3단계 강제 재조정
    [100, 500, 1000].forEach(delay => {
        setTimeout(() => {
            map.invalidateSize();
        }, delay);
    });

    // 화면 크기가 바뀌거나 모바일 회전 시에도 다시 그리기
    window.addEventListener('resize', () => map.invalidateSize());
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLeafletAndInit);
} else {
    loadLeafletAndInit();
}
