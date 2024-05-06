import router from '@/router'

export const logOut = async () => {
  // call api
  // localStorage.clear()
  await router.replace('/login')
}
