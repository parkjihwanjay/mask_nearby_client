<template>
  <div class="top" style="width: 100%; height: 100%; position: relative; z-index: 0; bottom: 60px;">
    <div class="map" id="map" ref="map">
      <div class="input-back-back" style="position: relative; top: 60px; z-index:2;">
        <div class="input-backg">
          <div class="search-input2" id="search-input2" type="text" value>
            <input
              v-model="keyWord"
              @keyup.enter="search()"
              value
              type="text"
              class="search-input-in2"
              placeholder="목적지를 검색하세요"
            />
            <button class="search-btn" id="search-btn" @click="search()">
              <img class="search-icon" src="../assets/qna.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Spinner v-if="spinnerLoading" />
    <div class="color-info">
      <img src="../assets/color-info.png" />
    </div>
  </div>
</template>

<script>
import hideVirtualKeyboard from "hide-virtual-keyboard";

import axios from "axios";
import Spinner from "./Spinner.vue";
import { displayMarker, hideMarkers, hideOverlays } from "../utils/marker.js";
export default {
  name: "KaKaoMap",
  components: {
    Spinner
  },
  data() {
    return {
      keyWord: "",
      latitude: "",
      longitude: "",
      spinnerLoading: false,
      area: 2000,
      // 배포
      maskData: [],
      //테스트 용
      // maskData: [
      //   {
      //     addr: "서울특별시 서대문구 모래내로 359 (홍은동)",
      //     code: "11858524",
      //     created_at: "2020/03/07 19:40:00",
      //     lat: 37.5818747,
      //     lng: 126.9358991,
      //     name: "대유약국",
      //     remain_cnt: 58,
      //     sold_cnt: 292,
      //     sold_out: false,
      //     stock_cnt: 350,
      //     stock_t: "10:44",
      //     tel: "02-379-4416",
      //     type: "01"
      //   },
      //   {
      //     addr: "경상북도 구미시 1공단로 169 (공단동)",
      //     code: "37847465",
      //     created_at: "2020/03/07 19:40:00",
      //     lat: 36.10233,
      //     lng: 128.3818679,
      //     name: "구미대형약국",
      //     remain_cnt: 16,
      //     sold_cnt: 434,
      //     sold_out: false,
      //     stock_cnt: 450,
      //     stock_t: "11:15",
      //     tel: "054-463-8275",
      //     type: "02"
      //   },
      //   {
      //     addr: "전라북도 익산시 선화로3길 16-10 (모현동1가)",
      //     code: "35808705",
      //     created_at: "2020/03/07 19:40:00",
      //     lat: 35.9500036,
      //     lng: 126.9388925,
      //     name: "선한약국",
      //     remain_cnt: 6,
      //     sold_cnt: 444,
      //     sold_out: false,
      //     stock_cnt: 450,
      //     stock_t: "11:14",
      //     tel: "063-855-7713",
      //     type: "03"
      //   }
      // ],
      //
      soldoutMarkers: [],
      maskMarkers: []
      // overlays : [],
      // baseUrl: process.env.VUE_APP_BASE_URL
    };
  },
  created() {
    // 배포 용
    this.maskData = this.$route.params.maskData;
    this.longitude = this.$route.params.longitude;
    this.latitude = this.$route.params.latitude;

    // test 용
    // this.latitude = 37.548236103794;
    // this.longitude = 127.026326090073;
  },
  mounted() {
    const mapContainer = this.$refs.map; // 지도를 표시할 div

    const mapOption = {
      center: new kakao.maps.LatLng(this.latitude, this.longitude), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    window.map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    // 지도 축소 제한
    window.map.setMaxLevel(5);

    // this.soldoutMarker = [];
    // window.soldoutMarker = [];
    // window.markers = [];
    window.overlays = [];

    // const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    this.displayMasks(this.maskData);
    // this.getPharm();

    let dragcount = 0;

    kakao.maps.event.addListener(window.map, "dragend", async () => {
      // 지도 중심좌표를 얻어옵니다
      hideOverlays(window.overlays);
      let latlng = window.map.getCenter();
      // this.latitude = latlng.Ha;
      // this.longitude = latlng.Ga;
      // this.getMasks();
      dragcount += 1;
      // const diff = Math.abs(
      //   this.latitude - latlng.Ha + (this.longitude - latlng.Ga)
      // );
      // if (diff > 0.001) {
      //   this.latitude = latlng.Ha;
      //   this.longitude = latlng.Ga;
      //   this.getMasks();
      // }
      if (dragcount % 2 === 0) {
        this.latitude = latlng.Ha;
        this.longitude = latlng.Ga;
        this.getMasks();
      }
    });

    // if (!window.markers.length) {
    // 	alert('주변에 마스크 재고가 있는 편의점을 찾지 못했습니다');
    // 	this.$router.push('/');
    // }
  },
  methods: {
    checkHour() {
      const hour = new Date().getHours();
      if (10 > hour || hour >= 23) {
        alert(
          "재고 현황은 11시에서 23시에만 제공되어 현재는 다 soldout으로 표시합니다! 위치 확인 후 아침에 이용해주세요 :)"
        );
      }
    },
    // async getPharm() {
    //   const pharm = await axios.get(this.baseUrl + "pharm.json");
    //   console.log(pharm);
    // },
    // fetchData() {
    //   axios.get(this.baseUrl + "p.json").then(response => {
    //     console.log(response);
    //   });
    // },
    async getMasks() {
      window.map.setDraggable(false);
      // window.markers = [];
      this.maskMarkers = [];
      this.spinnerLoading = true;
      try {
        // 요청 서버를 정부 서버로
        const res = await axios.get(
          `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${this.latitude}&lng=${this.longitude}&m=${this.area}`
          // "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json"
        );

        const locPosition = new kakao.maps.LatLng(
          this.latitude,
          this.longitude
        );

        window.map.setCenter(locPosition);

        this.maskData = res.data.stores;
        this.displayMasks(this.maskData);
        this.spinnerLoading = false;
        window.map.setDraggable(true);

        // if (!window.markers.length) {
        // 	alert('주변에 마스크 재고가 있는 편의점을 찾지 못했습니다');
        // }
      } catch (e) {
        try {
          // 두희님 서버
          const res = await axios.get(
            `https://mask-api.com/gov?lat=${this.latitude}&lng=${this.longitude}`
          );
          const locPosition = new kakao.maps.LatLng(
            this.latitude,
            this.longitude
          );

          window.map.setCenter(locPosition);

          this.maskData = res.data;
          this.displayMasks(this.maskData);
          this.spinnerLoading = false;
          window.map.setDraggable(true);
        } catch (e) {
          this.spinnerLoading = false;
          window.map.setDraggable(true);
          alert("서버 접속이 많아서 재시도 해 주세요");
        }
      }
    },
    maskInfo(masks) {
      let maskInfo = "";
      let masksTotal = 0;
      for (let i = 0; i < masks.length; i++) {
        if (masks[i].stock_amount != null) {
          masksTotal += masks[i].stock_amount;
        }
      }
      maskInfo =
        maskInfo + "<div class='mask-total-num'>" + masksTotal + "</div>";
      return maskInfo;
    },
    displayMasks(maskData) {
      // console.log("maskdata");
      // console.log(maskData);
      for (let i = 0; i < maskData.length; i++) {
        if (maskData[i].sold_out) continue;

        this.displayMask(maskData[i]);
      }
    },
    displaySoldout(maskItem) {
      const imageSrc = "/img/soldout.png", // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(40, 45), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const locPosition = new kakao.maps.LatLng(maskItem.lat, maskItem.lng);

      window.map.setLevel(5);

      const soldoutMarker = new kakao.maps.Marker({
        map: window.map,
        position: locPosition,
        image: markerImage
      });
      soldoutMarker.setMap(window.map);
      this.soldoutMarkers.push(soldoutMarker);
    },
    displayMask(maskItem) {
      // console.log("maskItem");
      // console.log(maskItem);
      let imageSrc;
      let imageType;
      let imageColor;

      let remainStatus;
      // console.log(maskItem.type);
      let imageSize = new kakao.maps.Size(40, 45); // 마커이미지의 크기입니다
      let imageOption = { offset: new kakao.maps.Point(20, 45) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      if (maskItem.type === "01") {
        imageType = "pharm";
        // imageSrc = "/img/pharm.png"; // 마커이미지의 주소입니다
      } else if (maskItem.type === "02") {
        // 02가 하나로 마트라고 가정
        imageType = "hanaro";
      } else {
        // 03이 우체국이라고 가정
        imageType = "post";
      }

      if (maskItem.remain_stat === "plenty") {
        // 녹색 이미지(100개 이상)
        imageColor = "green";
        remainStatus = "많음(100개 이상)";
      } else if (maskItem.remain_stat === "some") {
        // 노랑색 이미지(30~99개)
        remainStatus = "보통(30~100개)";
        imageColor = "yellow";
      } else if (maskItem.remain_stat === "few") {
        // 빨강색 이미지(1~29개)
        remainStatus = "적음(1~30개)";
        imageColor = "red";
      } else {
        // 회색 이미지(0개)
        remainStatus = "없음(0개)";
        imageColor = "gray";
      }

      imageSrc = `/img/${imageType}${imageColor}.png`;
      // console.log(imageSrc);
      // imageSrc = "/img/pharm.png";
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      const locPosition = new kakao.maps.LatLng(maskItem.lat, maskItem.lng);

      // window.map.setLevel(5);

      const marker = new kakao.maps.Marker({
        map: window.map,
        position: locPosition,
        image: markerImage,
        zIndex: 0
      });
      let long3;
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      // 마커에 클릭이벤트를 등록합니다
      if (maskItem.name) {
        let longlong = "left : -6px;";
        // const maskOverlay = this.maskInfo(maskItem.masks);
        if (maskItem.created_at === null) {
          maskItem.created_at = "정보없음";
          longlong = "left : 22px;";
        }
        const content =
          '<div class="wrap">' +
          '    <div class="info">' +
          '        <div class="title">' +
          maskItem.name +
          '            <div class="close" onclick="closeSearchOverLay()" title="닫기"></div>' +
          "        </div>" +
          '        <div class="body">' +
          '            <div class="desc">' +
          '                <div class="ellipsis">' +
          "재고 상태 : " +
          remainStatus +
          "</div>" +
          '<div class="cool" style="position: relative; font-size: 12px;' +
          longlong +
          'top: 0px;">업데이트 시간 : ' +
          maskItem.created_at +
          "</div>" +
          '<div class="namu">' +
          // '<div class="smallicons phone"></div><a style="text-decoration: none;" href="tel:' +
          // maskItem.tel +
          // ' "class="link"><div class="font-in-overlay" style="right: 10px;bottom: -3px;color: white;position: relative;">전화걸기</div></a>' +
          '<div class="smallicons pin"></div><a style="text-decoration: none;" href="https://map.kakao.com/link/to/' +
          maskItem.name +
          "," +
          maskItem.lat +
          "," +
          maskItem.lng +
          ' "class="link"><div class="font-in-overlay" style="right: 10px;bottom: -3px;color: white;position: relative;">길찾기</div></div>' +
          "            </div>" +
          "        </div>" +
          "    </div>" +
          "</div>";

        const overLay = new kakao.maps.CustomOverlay({
          content: content,
          map: window.map,
          position: locPosition
        });

        overLay.setMap(null);

        kakao.maps.event.addListener(marker, "click", () => {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          hideOverlays(window.overlays);
          // overLay.setMap(null);
          overLay.setMap(window.map);
          // seracrOverLays.push(overLay);
        });
        window.overlays.push(overLay);
      }

      // 지도 중심좌표를 접속위치로 변경합니다
      // window.map.setCenter(locPosition);
      marker.setMap(window.map);
      this.maskMarkers.push(marker);
      // window.markers.push(marker);
    },
    hideMarkers(markers) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
    },
    menuToggle() {
      const nav = this.$refs.nav;
      nav.classList.toggle("active");
    },
    search() {
      hideVirtualKeyboard();
      // this.checkHour();
      if (!this.keyWord.length) return alert("검색어를 입력해주세요");
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(this.keyWord, this.addresssSearchCB);
    },
    async addresssSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        this.spinnerLoading = true;
        const coords = new kakao.maps.LatLng(data[0].y, data[0].x);
        this.latitude = coords.Ha;
        this.longitude = coords.Ga;
        const locPosition = new kakao.maps.LatLng(
          this.latitude,
          this.longitude
        );

        window.map.setCenter(locPosition);

        await this.getMasks();
      }
    }
    // async getMaskInfo() {
    //   this.maskMarkers = [];
    //   this.spinnerLoading = true;
    //   try {
    //     const res = await axios.get(
    //       `?lat=${this.latitude}&lng=${this.longitude}`
    //     );
    //     this.maskData = res.data;
    //     for (let i = 0; i < this.maskData.length; i++) {
    //       if (!this.maskData[i].soldout) this.displaySoldout(this.maskData[i]);
    //       else this.displayMask(this.maskData[i]);
    //     }
    //     this.spinnerLoading = false;
    //   } catch (e) {
    //     this.spinnerLoading = false;
    //     alert("서버 접속이 많아서 재시도 해 주세요");
    //   }
    // }
  }
};
</script>

<style scoped>
.color-info {
  position: absolute;
  bottom: 9px;
  right: 0px;
  z-index: 9;
  width: 127px;
  height: 127px;
  padding-right: 5px;
  padding-bottom: 5px;
}

.color-info img {
  width: 100%;
  height: 100%;
}

.footer-btn {
  display: flex;
  position: absolute;
  bottom: 60px;
  justify-content: center;
  align-items: center;
  width: 283px;
  height: 50px;
  object-fit: contain;
  border-radius: 28px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #75d0e7;
  font-weight: bold;
  color: white;
  -webkit-text-fill-color: white;
  font-size: 16px;
  z-index: 99999;
  cursor: pointer;
}

.footer-btn-parent {
  display: flex;
  justify-content: center;
}

.loader {
  z-index: 99;
  position: relative;
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 15em;
  height: 15em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #75d0e7 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #75d0e7 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #75d0e7 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #75d0e7 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #75d0e7 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #75d0e7;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  background: white;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* spinner */
.input-back-back {
  bottom: 10vh;
}
.close {
  background: url("../assets/overclose.png");
}
.search-input {
  max-width: 700px;
}
.btn-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.btn {
  width: 11rem;
  line-height: 11rem;
  background: #75d0e7;
  border-radius: 50%;
  text-align: center;
  margin: 1.6rem;
  font-size: 0.8rem;
  border: none;
  padding: 0;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  outline: none;
}

@media (max-width: 768px) and (max-height: 700px) {
  .input-back-back {
    bottom: 11vh;
  }
  .btn {
    width: 6.4rem;
    line-height: 6.4rem;
  }
  .toptext {
    bottom: 61.6vh !important;
  }
  .loadtogether {
    position: relative;
    top: 0px !important;
  }
}

.btn--shockwave.is-active {
  -webkit-animation: shockwaveJump 1s ease-out infinite;
  animation: shockwaveJump 1s ease-out infinite;
}
.btn--shockwave.is-active:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  -webkit-animation: shockwave 1s 0.65s ease-out infinite;
  animation: shockwave 1s 0.65s ease-out infinite;
}
.btn--shockwave.is-active:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  -webkit-animation: shockwave 1s 0.5s ease-out infinite;
  animation: shockwave 1s 0.5s ease-out infinite;
}

@-webkit-keyframes shockwaveJump {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  40% {
    -webkit-transform: scale(1.08);
    transform: scale(1.08);
  }
  50% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  55% {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
  }
  60% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes shockwaveJump {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  40% {
    -webkit-transform: scale(1.08);
    transform: scale(1.08);
  }
  50% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  55% {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
  }
  60% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes shockwave {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), inset 0 0 1px rgba(0, 0, 0, 0.15);
  }
  95% {
    box-shadow: 0 0 50px transparent, inset 0 0 30px transparent;
  }
  100% {
    -webkit-transform: scale(2.25);
    transform: scale(2.25);
  }
}
@keyframes shockwave {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), inset 0 0 1px rgba(0, 0, 0, 0.15);
  }
  95% {
    box-shadow: 0 0 50px transparent, inset 0 0 30px transparent;
  }
  100% {
    -webkit-transform: scale(2.25);
    transform: scale(2.25);
  }
}
.btn--jump.is-active {
  -webkit-animation: 0.4s jump ease infinite alternate;
  animation: 0.4s jump ease infinite alternate;
}

@-webkit-keyframes jump {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }
  100% {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
}

@keyframes jump {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }
  100% {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
}
</style>
