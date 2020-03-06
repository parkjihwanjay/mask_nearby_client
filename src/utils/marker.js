// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, place) {
	// 마커를 생성합니다
	window.map.setLevel(5);
	// console.log(map, markers, overlays, locPosition);
	hideMarkers(window.markers);
	hideOverlays(window.overlays);

	const marker = new kakao.maps.Marker({
		map: window.map,
		position: locPosition,
	});
	let long3;
	// const infowindow = new kakao.maps.InfoWindow({zIndex:1});
	// 마커에 클릭이벤트를 등록합니다
	if (place) {
		if (place.place_name.length > 16) {
			long3 = 'left: -25px;';
		} else if (place.place_name.length > 13) {
			long3 = 'left: 3px;';
		} else if (place.place_name.length > 12) {
			long3 = 'left: 12px;';
		} else if (place.place_name.length > 10) {
			long3 = 'left: 23px;';
		} else if (place.place_name.length > 9) {
			long3 = 'left: 32px;';
		} else {
			long3 = '';
		}

		const content =
			'<div class="wrap" id="overdiv" style="' +
			long3 +
			'">' +
			'    <div class="info" style="">' +
			'        <div class="title">' +
			place.place_name +
			'            <div id="search-overlay" class="close" @click="closeSearchOverLay()" title="닫기"></div>' +
			'        </div>' +
			'        <div class="body">' +
			'            <div class="desc">' +
			'                <div class="ellipsis">' +
			place.address_name +
			'</div>' +
			'<div class="telroad" style="display: flex; flex-direction: row; justify-content: space-around; position: relative; margin-left: 5px; bottom: 5px;">' +
			'                <div><div class="smallicons phone"></div><a href="tel:' +
			place.phone +
			'" target="_blank" class="link">전화걸기</a></div>' +
			'                <div><div class="smallicons pin"></div><a href="https://map.kakao.com/link/to/' +
			place.address_name +
			',' +
			place.y +
			',' +
			place.x +
			'" class="link">길찾기</div>' +
			'</div>' +
			'            </div>' +
			'        </div>' +
			'    </div>' +
			'</div>';

		const overLay = new kakao.maps.CustomOverlay({
			content: content,
			map: window.map,
			position: locPosition,
		});

		// overLay.setMap(null);
		// overLay.setMap(map);

		kakao.maps.event.addListener(marker, 'click', function() {
			// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
			overLay.setMap(null);
			overLay.setMap(window.map);
			// seracrOverLays.push(overLay);
		});
		window.overlays.push(overLay);
	}

	// 지도 중심좌표를 접속위치로 변경합니다
	window.map.setCenter(locPosition);
	marker.setMap(window.map);
	window.markers.push(marker);

	return { markers, overlays };
}

function hideMarkers(markers) {
	for (let i = 0; i < markers.length; i++) {
		// console.log(markers[i]);
		markers[i].setMap(null);
	}
}

function hideOverlays(overlays) {
	for (let i = 0; i < overlays.length; i++) {
		overlays[i].setMap(null);
	}
}

// function closeSearchOverLay() {
// 	for (let i = 0; i < searchOverLays.length; i++) {
// 		searchOverLays[i].setMap(null);
// 	}
// }

export { displayMarker, hideMarkers, hideOverlays };
