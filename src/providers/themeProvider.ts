import { usePrimeVue } from 'primevue/config'
import { onBeforeMount } from 'vue'

import { useLayout } from '../layout/composables/useLayout.ts'

export const themeProvider = () => {
  const { layoutConfig } = useLayout()
  const $primevue = usePrimeVue()

  onBeforeMount(() => {
    const theme = localStorage.getItem('theme')
    if (!theme) {
      return
    }

    $primevue.changeTheme(layoutConfig.theme.value, theme, 'theme-css', () => {
      layoutConfig.theme.value = theme
      layoutConfig.darkTheme.value = theme.includes('dark')
    })
  })
}
