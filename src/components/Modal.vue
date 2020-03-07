<template>
  <div class="modal">
    <div class="modal__overlay"></div>
    <!-- <div class="modal__content"> -->
    <div class="modal__content">
      <div class="modal-header">
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
</template>

<script>
export default {
  name: "Modal"
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
