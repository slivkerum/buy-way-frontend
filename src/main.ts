import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import VueTheMask from 'vue-the-mask'

createApp(App).use(router).use(pinia).use(VueTheMask).mount('#app')
