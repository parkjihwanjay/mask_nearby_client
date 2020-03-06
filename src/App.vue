<template>
	<div id="app" style="height: 100%; background-color: #F4FDFF; overflow: hidden;">
		<Header></Header>
		<router-view></router-view>
		<Modal v-show="showModal" @closeModal="showModal = false" />
	</div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Modal from './components/Modal.vue';
export default {
	name: 'App',
	components: {
		Header,
		Modal,
		Footer,
		// HelloWorld
	},
	data() {
		return {
			showModal: true,
		};
	},
};
</script>

<style scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.footer-btn {
	display: flex;
	position: absolute;
	bottom: 30px;
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
}

.footer-btn-parent {
	display: flex;
	justify-content: center;
}
</style>
