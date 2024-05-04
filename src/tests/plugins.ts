import router from '@/router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

export const plugins = [PrimeVue, ToastService, createPinia(), router]
