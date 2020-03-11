<template>
  <div class="topmodal">
    <div class="modal" v-if="showInfoModal">
      <div class="modal__overlay"></div>
      <!-- <div class="modal__content"> -->
      <div class="modal__content">
        <div
          class="modal-header"
          style="background-image: linear-gradient(306deg, #79d3e6 105%, #83d6e8 73%, #89d8e9 23%, #ffffff -5%);"
        >
          <div class="modal-header__title">
            <div style="padding-left:65px">마스크 알리미</div>
            <button class="closeBtn">
              <img
                @click="$emit('closeModal')"
                class="img"
                src="../assets/closeBtn.png"
                alt="닫기"
              />
            </button>
          </div>

          <!-- <div class="modal-header__subtitle">
            마스크 공적 판매처 재고현황을 확인해보세요!
          </div> -->
        </div>
        <div class="modal-body">
          <!-- <div class="modal-body__img">
					<img class="img" src="../assets/modalList.png" alt="목록" />
          </div>-->
          <div
            class="modal-body__text"
            style="position: relative; left: 5px; bottom: 10px; width: 260px;"
          >
            <ul>
              <!-- <li>
                <strong>공공 마스크 재고 현황을 제공합니다.</strong>
              </li>-->
              <li style="font-size: 12.5px;">
                <strong>
                  약국 재고 현황은 실시간이 아니며, 부정확할 수 있습니다. 마스크
                  판매에 힘써주시는 약사 분들의 노고를 생각해주시면
                  감사하겠습니다.
                </strong>
              </li>
              <li style="font-size: 12.5px;">
                <strong>
                  정보 공개를 원치않으시는 약사분은 한국정보화진흥원
                  (maskdata@nia.or.kr) 으로 문의해주시기 바랍니다.
                </strong>
              </li>
            </ul>
            <a target="blank" href="">
              <div class="donation">
                <img src="../assets/donation.png" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal2" v-if="showDateModal">
      <div class="modal__overlay"></div>
      <!-- <div class="modal__content"> -->
      <div class="modal__content">
        <div
          class="modal-header"
          style="width: 220px; height: 57px; background-image: linear-gradient(306deg, #79d3e6 105%, #83d6e8 73%, #89d8e9 23%, #ffffff -5%);"
        >
          <div
            class="modal-header__title"
            style="width: 220px; font-size: 12px;"
          >
            <div style="text-align: left; position: relative; bottom: 5px;">
              오늘 마스크 구매가능 여부를
              <br />확인하세요!
            </div>
            <button
              class="closeBtn"
              style="position: relative; padding-left: 0px; right: 40px;"
            >
              <img
                @click="$emit('closeModal')"
                class="img"
                style="width: 15px; height: 15px;"
                src="../assets/closeBtn.png"
                alt="닫기"
              />
            </button>
          </div>

          <div class="modal-header__subtitle">
            마스크 공적 판매처 재고현황을 확인해보세요!
          </div>
        </div>
        <div class="modal-body2" style>
          <!-- <div class="modal-body__img">
					<img class="img" src="../assets/modalList.png" alt="목록" />
          </div>-->
          <div
            class="modal-body__text"
            style="position: relative; left: 5px; bottom: 10px; width: 260px;"
          >
            <img
              src="../assets/down-arrow.png"
              style="z-index: 0; position: relative; left: 175px; top: 30px; width: 10px;"
            />
            <select
              id="selectoption"
              style="position: absolute; border-radius: 7px; border: solid; border-width: 1px; border-color: #7ed4e7; width: 180px; height: 38px; top: 35px; left: 15px; background-color: rgba(255,255,255,0); font-size: 11px; padding-left: 8px;"
              name="year"
              v-model="birthDate"
            >
              <option value="선택해주세요" selected="selected"
                >출생연도 선택하기</option
              >
              <option v-for="date in dateList" :value="date">{{ date }}</option>
              <!-- <option value="1996">1996</option>
              <option value="1997">1997</option>
              <option value="1998">1998</option>-->
            </select>
            <button
              @click="clickButton"
              style="position: relative; left: 49px; top: -10px; width: 113px;
  height: 35px;
  border-radius: 19px;
  background-color: #7ed4e7; color: #ffffff;
  -webkit-text-fill-color: #ffffff;
  "
            >
              확인하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    clickButton() {
      this.$emit("clickButton", this.birthDate);
    }
  },
  data() {
    return {
      birthDate: "선택해주세요",
      dateList: []
    };
  },
  props: ["showInfoModal", "showDateModal"],
  created() {
    for (let i = 2003; i >= 1900; i--) {
      this.dateList.push(String(i));
    }
  }
};
</script>

<style scoped>
.donation {
  margin-bottom: 10px;
  position: relative;
  top: -7px;
  left: -7px;
  width: 278px;
  height: 169px;
}
.donation img {
  width: 100%;
  height: 100%;
}
.modal-body__text ul {
  /* padding: 0; */
  padding-inline-start: 25px;
  width: 89%;
  margin-bottom: 0;
}
.modal-body__text li {
  padding-bottom: 28px;
  text-align: left;
  /* padding: 0; */
  /* padding-inline-start: 30px; */
}
select::-ms-expand {
  display: none;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
}
</style>
