<template>
	<div>
		<div
			v-show="$route.path === '/'"
			style="height: 60px; position: relative; width: 100%; background-color: #75D0E7; opacity: 0.9; z-index: 2;"
		>
			<img
				@click="
					$router.push({
						path: '/',
					})
				"
				style="position: relative; top: 12px; width: 275px;"
				src="../assets/headerlogo.png"
			/>
		</div>
		<div
			v-show="$route.path === '/map'"
			style="height: 60px; position: relative; width: 100%; background-color: #75D0E7; opacity: 0.9; z-index: 2;"
		>
			<img
				@click="
					$router.push({
						path: '/',
					})
				"
				style="position: relative; bottom: 107px; width: 275px;"
				src="../assets/headerlogo.png"
			/>
		</div>
		<div
			v-show="$route.path === '/map'"
			style="position: absolute; top: 19px; z-index: 4; left: 10px; color:#ffffff;"
		>
			<img
				style="width: 25px;"
				src="../assets/backback.png"
				@click="
					$router.push({
						path: '/',
					})
				"
			/>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
