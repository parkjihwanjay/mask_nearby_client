<template>
	<div>
		<div v-show="$route.path === '/'" class="foot" style="position: relative; bottom: 120px;">
			<div id="hosp1" class="menu_select">
				<img class="hosp2" src="../assets/cvs.png" />
				<br />
				<p id="foot_text">오프라인 판매처</p>
			</div>
			<div
				id="def1"
				style="position: relative; left: 2px;"
				class="menu_selected"
				onclick="alert('서비스 준비 중입니다')"
			>
				<img class="def2" src="../assets/earth.png" />
				<br />
				<p id="foot_text">온라인 판매처</p>
			</div>
		</div>
		<div v-show="$route.path === '/map'" class="foot" style="position: absolute; bottom: 0;">
			<div id="hosp1" class="menu_select">
				<img class="hosp2" src="../assets/cvs.png" />
				<br />
				<p id="foot_text">오프라인 판매처</p>
			</div>
			<div
				id="def1"
				style="position: relative; left: 2px;"
				class="menu_selected"
				onclick="alert('서비스 준비 중입니다')"
			>
				<img class="def2" src="../assets/earth.png" />
				<br />
				<p id="foot_text">온라인 판매처</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
