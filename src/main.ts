import { createPinia } from 'pinia'
import { createApp } from 'vue'

import BadgeDirective from 'primevue/badgedirective'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import App from './App.vue'
import router from './router'

import '@/assets/styles.scss'

const app = createApp(App)

// Настройка UI библиотеки PrimeVue
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.component('Toast', Toast)

app.directive('tooltip', Tooltip)
app.directive('badge', BadgeDirective)
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

// Базовая настройка vue
app.use(router)
app.use(createPinia())
app.mount('#app')
