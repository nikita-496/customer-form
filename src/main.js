import Vue from "vue";
import App from "./App.vue";

Vue.config.devtools = true;

require("./assets/css/style.scss"); // require style.scss

new Vue({
  render: (h) => h(App),
}).$mount("#app");
