import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/base.css';
axios.defaults.baseURL = 'http://localhost:3000';

Vue.prototype.$axios = axios
new Vue({
    render: h => h(App),
}).$mount('#app')