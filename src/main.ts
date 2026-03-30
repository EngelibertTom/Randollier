import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'
import reveal from './directives/reveal'

const app = createApp(App)
app.use(router).use(createPinia())
app.directive('reveal', reveal)
app.mount('#app')

