<template>
  <div>
    <div
      v-show="$route.path === '/map'"
      class="loadtogether"
      style="position: absolute; bottom:22%; width: 100%;"
    >
      <div class="loader"></div>
      <div
        class="loadtext"
        style="width: 100%; position: relative; bottom: 133px; z-index:10; font-size:12px; font-weight: bold;"
      >
        재고를 확인 중입니다
        <div style="display: flex; flex-direction: row; justify-content: center;">
          (
          <div>{{ count }}</div>
          <div>% 완료)</div>
        </div>
      </div>
    </div>
    <div
      v-show="$route.path === '/'"
      class="loadtogether"
      style="position: absolute; bottom: 10%; width: 100%;"
    >
      <div class="loader"></div>
      <div
        class="loadtext"
        style="width: 100%; position: relative; bottom: 133px; z-index:10; font-size:12px; font-weight: bold;"
      >
        재고를 확인 중입니다
        <div style="display: flex; flex-direction: row; justify-content: center;">
          (
          <div>{{ count }}</div>
          <div>% 완료)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    this.countdown();
  },
  methods: {
    countdown() {
      if (this.count != "100") {
        this.count++;
        setTimeout(this.countdown, 150);
      }
    }
  }
};
</script>

<style scoped>
/* spinner */
.loader {
  z-index: 9;
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
@media (max-width: 768px) and (max-height: 700px) {
  .loadtogether {
    bottom: ;
  }
}
/* spinner */
</style>
