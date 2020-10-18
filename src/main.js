import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/base.css';
axios.defaults.baseURL = 'http://192.168.31.16:8818';

Vue.prototype.$axios = axios
new Vue({
    render: h => h(App),
}).$mount('#app')