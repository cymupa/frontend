import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVueStyled from 'primevue/styled'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import PrimeOne from 'primevue/themes/primeone'
import Aura from 'primevue/themes/primeone/aura'
const app = createApp(App)

app.use(PrimeVueStyled)

app.use(createPinia())
app.use(router)
app.mount('#app')
