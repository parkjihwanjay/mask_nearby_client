<template>
  <div class="top" style="width: 100%; height: 100%; position: relative; bottom: 0px;">
    <!-- <div style="width: 80vw; max-width: 700px;">
      <img class="questionmark" style="position: relative; width: 25px; top: 10px; left: -10px;" src="../assets/qms.png" />
    </div>-->
    <div class="logos">
      <img
        class="logoimg"
        style="width: 40vh; position: relative; bottom: 2.5vh;"
        src="../assets/horizontal.png"
      />
    </div>
    <!-- <div
      class="toptext"
      style="position: relative; width: 100%; font-size: 1.4em; font-weight: bold; top: -21vh;"
    >
      <img style="width: 44vh;" src="../assets/headtext5.png" />
    </div>-->
    <div
      class="yearcheck"
      @click="checkDate"
      style="width: 100%; font-size: 12px; position: relative; top: -13%; height: 50px; z-index: 5;"
    >
      <template v-if="birthDate.length">
        <div>{{ birthDate }}년생 이신 분은</div>
        <div style="color:#006ecb; font-weight: bold;">{{ buyPossible }}</div>
      </template>
      <template v-else>
        <div>마스크 5부제에 따른</div>
        <div style="color:#006ecb; font-weight: bold;">오늘의 구매 가능 여부를 확인해보세요!</div>
      </template>
      <div
        ref="check"
        style="position: relative; top: 10px; display: inline; right: 3px; color:#006ecb;"
      >{{ checkComment }}</div>
      <img
        style="position: relative; width: 11px; top: 10px;display:inline;"
        src="../assets/reload.png"
      />
    </div>
    <div
      class="input-back-back"
      style="position: absolute; width: 100%; height: 100%; top: 37%; z-index: 0;"
    >
      <div class="input-backg">
        <div
          class="search-input"
          style="width: 80vw; height: 6.5vh;"
          id="search-input"
          type="text"
          value
        >
          <input
            @keyup.enter="search()"
            v-model="keyWord"
            value
            type="text"
            class="search-input-in"
            id="srch"
            placeholder="목적지를 검색하세요"
          />
          <button @click="search()" class="search-btn" id="search-btn">
            <img class="search-icon" src="../assets/qna.png" />
          </button>
        </div>
      </div>
    </div>
    <div class="btn-container" style="width: 100%; position: absolute; bottom: 17%;">
      <button
        v-show="showLocButton"
        @click="getAndDisplayLocation()"
        class="btn btn--shockwave is-active"
        style="color:#ffffff; -webkit-text-fill-color: #ffffff;"
      >
        <img
          class="searchbtn"
          style="position: absolute; width: 11rem; right: 0px;"
          src="../assets/searchbutton.png"
        />
        현재 위치로 보기
      </button>
    </div>
    <Spinner v-if="spinnerLoading" />
    <Info />
  </div>
</template>

<script>
import hideVirtualKeyboard from "hide-virtual-keyboard";
import axios from "axios";
import Spinner from "./Spinner.vue";
import Info from "./Info.vue";
export default {
  name: "Main",
  data() {
    return {
      keyWord: "",
      latitude: "",
      longitude: "",
      maskData: "",
      spinnerLoading: false,
      showLocButton: true
    };
  },
  components: {
    Spinner,
    Info
  },
  props: ["birthDate"],
  computed: {
    checkComment() {
      if (!this.birthDate.length) return "확인하기";
      else return "다시 확인하기";
    },
    buyPossible() {
      let today = new Date().getDay();
      // today = 2;
      today = String(today);
      // console.log(this.birthDate[3]);
      if (today === "0" || today === "6") return "구매하실 수 있는 날 입니다.";
      if (
        today === this.birthDate[3] ||
        today === String(Number(this.birthDate[3]) + 5)[1]
      ) {
        // console.log(String(Number(this.birthDate[3]) + 5)[1]);
        return "구매하실 수 있는 날 입니다.";
      } else return "구매하실 수 없는 날 입니다.";
    }
  },
  methods: {
    checkDate() {
      this.$emit("checkDate");
    },
    search() {
      console.log("search");
      hideVirtualKeyboard();
      this.checkHour();
      // if (!this.checkHour()) {
      // 	return;
      // }
      if (!this.keyWord.length) return alert("검색어를 입력해주세요");
      this.showLocButton = false;
      this.spinnerLoading = true;
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(this.keyWord, this.placesSearchCB);
    },
    async placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(data[0].y, data[0].x);
        this.latitude = coords.Ha;
        this.longitude = coords.Ga;
        await this.getMaskInfo();
      }
    },
    checkHour() {
      const hour = new Date().getHours();
      if (10 > hour || hour >= 23) {
        alert(
          "재고 현황은 11시에서 23시에만 제공되어 현재는 다 soldout으로 표시합니다! 위치 확인 후 아침에 이용해주세요 :)"
        );
        // return false;
      }
      // return true;
    },
    getAndDisplayLocation() {
      this.checkHour();
      // if (!this.checkHour()) {
      // 	return;
      // }
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        this.showLocButton = !this.showLocButton;
        this.spinnerLoading = true;
        navigator.geolocation.getCurrentPosition(
          this.geolocationSuccess,
          this.geolocationFail
        );
      } else {
        this.showLocButton = !this.showLocButton;
        this.spinnerLoading = false;
        alert("위치 허용을 해주세요");
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      }
    },
    async geolocationSuccess(position) {
      this.latitude = position.coords.latitude; // 위도
      this.longitude = position.coords.longitude; // 경도
      await this.getMaskInfo();
    },

    geolocationFail(error) {
      if (error.code == error.PERMISSION_DENIED) {
        this.showLocButton = !this.showLocButton;
        this.spinnerLoading = false;
        alert("위치 허용을 해주세요");
      }
    },
    async getMaskInfo() {
      try {
        // 정부 서버 요청
        const res = await axios.get();
        this.spinnerLoading = false;
        this.$router.push({
          path: "/map",
          name: "KakaoMap",
          params: {
            maskData: res.data,
            latitude: this.latitude,
            longitude: this.longitude
          }
        });
      } catch (e) {
        try {
          // 두희님 서버 요청
          const res = await axios.get(
            `https://mask-api.com/gov?lat=${this.latitude}&lng=${this.longitude}`
          );
          this.spinnerLoading = false;
          this.showLocButton = !this.showLocButton;
          this.$router.push({
            path: "/map",
            name: "KakaoMap",
            params: {
              maskData: res.data,
              latitude: this.latitude,
              longitude: this.longitude
            }
          });
        } catch (e) {}
        this.showLocButton = !this.showLocButton;
        this.spinnerLoading = false;
        alert("서버 접속이 많아서 재시도 해 주세요");
        console.log(e);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* // spinner */
.loader {
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
  background: #f4fdff;
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
  .btn-container {
    bottom: 21% !important;
  }
  .searchbtn {
    width: 6.4rem !important;
    line-height: 6.4rem;
  }
  .toptext {
    bottom: 61.6vh !important;
  }
  .loadtogether {
    bottom: 5% !important;
    /* position: relative;
    top: px !important; */
  }
}

@media (max-height: 400px) {
  .btn-container {
    display: none;
  }
  .devinfo {
    display: none;
  }
  .yearcheck {
    display: none;
  }
  .input-back-back {
    top: 50% !important;
  }
  .logoimg {
    width: 50vh !important;
    bottom: -8vh !important;
  }
  .toptext {
    top: -10vh !important;
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
