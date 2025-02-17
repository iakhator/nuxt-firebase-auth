import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  await authStore.initAuth()

  const publicPages = ['/', '/register']
  const authRequired = !publicPages.includes(to.path)

  // console.log(authRequired, 'requried', authStore.isAuthReady, 'authready')

  if (authRequired && !authStore.isAuthReady) {
    return navigateTo('/')
  }

  if (authStore.isAuthReady && publicPages.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})
