import React, { useEffect } from 'react'


const KakaoMap = (e) => {

    const lat = e.theaterLat; // 해당 극장의 위도
    const lon = e.theaterLon; // 해당 극장의 경도
    const{kakao} = window;
    useEffect(() => {

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨,
            };

        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 마커가 표시될 위치 
        var markerPosition = new kakao.maps.LatLng(lat, lon);

        // 마커 생성
        var marker = new kakao.maps.Marker({
            position: markerPosition,
            title: e.theaterName
        });

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        var iwPosition = new kakao.maps.LatLng(lat, lon), //인포윈도우 표시 위치
        iwContent = `<div style="padding:15px; width:auto; height:auto; font-size:11px">${e.theaterName}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwContent
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker);

    }, [lat, lon])

    return (
        <>
            <div
                style={{
                    marginTop: '30px',
                    width: '100%',
                    height: '60vh'
                }}

                id='map'
            >
            </div>
        </>
    )
}

export default KakaoMap;