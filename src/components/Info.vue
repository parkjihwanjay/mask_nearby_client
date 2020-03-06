<template>
  <div
    class="devinfo"
    style="width: 100%; display: flex; flex-direction: row; justify-content: flex-end; align-items: center; "
  >
    <div style="position: absolute; bottom: 5px; right: 5px; font-size: 13px;">데이터 자문 및 개발: 이두희</div>
    <div
      style="position: absolute; bottom: 20px; right: 5px; font-size: 13px;"
    >문의: withjuwon@gmail.com</div>
    <div
      style="position: absolute; bottom: 35px; right: 5px; font-size: 13px;"
    >기획 및 개발: 김준태, 박지환, 이인우, 최주원</div>
    <div style="position: absolute; bottom: 35px; right: 5px; font-size: 13px;">
      <img style="position: relative; width: 70px; right: 111px; top: 33px;" src="/img/yogiyo.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Info"
};
</script>

<style scoped>
@media (max-height: 400px) {
  .devinfo {
    display: none;
  }
}
</style>
