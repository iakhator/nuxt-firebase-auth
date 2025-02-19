import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  // await authStore.initAuth()
  //

  // Fetch CSRF token if not already available
  if (!authStore.csrfToken) {
    await authStore.fetchCsrfToken()
  }

  await authStore.fetchUser()

  const publicPages = ['/', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authStore.isAuthReady) {
    return navigateTo('/')
  }

  if (authStore.isAuthReady && publicPages.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})
