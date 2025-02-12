import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (import.meta.server) return

  await authStore.initAuth()

  const publicPages = ['/', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authStore.user) {
    return navigateTo('/')
  }

  if (authStore.user && publicPages.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})
