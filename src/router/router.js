import Main from "../components/Main.vue";
import KakaoMap from "../components/KakaoMap.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/map",
    name: "KakaoMap",
    component: KakaoMap
    // beforeEnter: (to, from, next) => {
    // 	// console.log(new Date().getHours());

    // 	to.params.maskData ? next() : next('/');
    // 	// if (!to.params.maskData) next('/');
    // 	// else next();
    // },
  },
  {
    path: "*",
    beforeEnter: (to, from, next) => {
      next("/");
    }
  }
];

export default routes;
