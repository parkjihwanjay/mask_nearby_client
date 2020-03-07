<template>
  <div class="topmodal">
    <div class="modal" style="display: none;">
      <div class="modal__overlay"></div>
      <!-- <div class="modal__content"> -->
      <div class="modal__content">
        <div
          class="modal-header"
          style="background-image: linear-gradient(306deg, #79d3e6 105%, #83d6e8 73%, #89d8e9 23%, #ffffff -5%);"
        >
          <div class="modal-header__title">
            <div>마스크 알리미</div>
            <button class="closeBtn">
              <img @click="$emit('closeModal')" class="img" src="../assets/closeBtn.png" alt="닫기" />
            </button>
          </div>

          <div class="modal-header__subtitle">주변 편의점 마스크 재고현황을 확인해보세요!</div>
        </div>
        <div class="modal-body" style="height: 343px;">
          <!-- <div class="modal-body__img">
					<img class="img" src="../assets/modalList.png" alt="목록" />
          </div>-->
          <div
            class="modal-body__text"
            style="position: relative; left: 5px; bottom: 10px; width: 260px;"
          >
            <ul>
              <li>
                현재 등록된 모든 편의점에 재고가 없습니다.
                <br />빠른 시일 내에 공적마스크 재고 현황을 추가하겠습니다.
              </li>
              <li>
                재고현황은 11시-23시 사이에 확인하실 수
                <br />있습니다.
              </li>
              <li>
                재고현황은 요기요가 제공하는 정보에 기반
                <br />하고 있습니다.
              </li>
              <li>
                마스크 재고현황 정보(약국, 마트 등)를 제공
                <br />해주실 수 있는 관계자 분들은 메일주세요!
              </li>
              <li>
                마스크 알리미는 코로나 알리미를 제작했던
                <br />대학생 4명의 아이디어와 노력에 이두희님의
                <br />데이터 기술 자문이 더해져 만들어졌습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="modal2">
      <div class="modal__overlay"></div>
      <!-- <div class="modal__content"> -->
      <div class="modal__content">
        <div
          class="modal-header"
          style="width: 220px; height: 60px; background-image: linear-gradient(306deg, #79d3e6 105%, #83d6e8 73%, #89d8e9 23%, #ffffff -5%);"
        >
          <div class="modal-header__title" style="width: 220px; font-size: 13px;">
            <div style="text-align: left; position: relative; bottom: 5px;">
              오늘 마스크 구매
              <br />가능 여부를 확인하세요!
            </div>
            <button class="closeBtn" style="position: relative; padding-left: 0px; right: 40px;">
              <img
                @click="$emit('closeModal')"
                class="img"
                style="width: 15px; height: 15px;"
                src="../assets/closeBtn.png"
                alt="닫기"
              />
            </button>
          </div>

          <div class="modal-header__subtitle">주변 편의점 마스크 재고현황을 확인해보세요!</div>
        </div>
        <div class="modal-body2" style>
          <!-- <div class="modal-body__img">
					<img class="img" src="../assets/modalList.png" alt="목록" />
          </div>-->
          <div
            class="modal-body__text"
            style="position: relative; left: 5px; bottom: 10px; width: 260px;"
          >
            <select
              id="selectoption"
              style="position: absolute; border-radius: 7px; border: solid; border-width: 1px; border-color: #7ed4e7; width: 180px; height: 38px; top: 35px; left: 15px; background-color: #ffffff; font-size: 11px; padding-left: 6px;"
              name="year"
            >
              <option value="선택해주세요" selected="selected">선택해주세요</option>
              <option value="바나나">바나나</option>
              <option value="사과">사과</option>
            </select>
            <img
              src="../assets/down-arrow.png"
              style="z-index: 0; position: relative; left: 175px; top: 30px; width: 10px;"
            />
            <button
              style="position: relative; left: 49px; top: -10px; width: 113px;
  height: 35px;
  border-radius: 19px;
  background-color: #7ed4e7; color: #ffffff;"
            >확인하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {}
};
</script>

<style scoped>
.modal-body__text ul {
  /* padding: 0; */
  padding-inline-start: 25px;
  width: 89%;
}
.modal-body__text li {
  padding-bottom: 28px;
  text-align: left;
  /* padding: 0; */
  /* padding-inline-start: 30px; */
}
</style>
