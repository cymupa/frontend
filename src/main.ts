import { createPinia } from 'pinia'
import { createApp } from 'vue'

import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import BadgeDirective from 'primevue/badgedirective'
import StyleClass from 'primevue/styleclass'
import Tooltip from 'primevue/tooltip'

import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import Toast from 'primevue/toast'

import App from './App.vue'
import router from './router'

import { russian } from '@/assets/locales/ru'
import '@/assets/styles.scss'

const app = createApp(App)

// Настройка UI библиотеки PrimeVue
app.use(PrimeVue, { locale: russian, ripple: true })
app.use(ToastService)
app.use(ConfirmationService)

app.component('Toast', Toast)

app.directive('tooltip', Tooltip)
app.directive('badge', BadgeDirective)
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

// Базовая настройка vue
app.use(router)
app.use(createPinia())
app.mount('#app')
