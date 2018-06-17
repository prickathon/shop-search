import Vue from 'vue'
import Main from "./main.vue"

Vue.config.devtools = true;

new Vue({
    el: '#app',
    render: h => h(Main)
})