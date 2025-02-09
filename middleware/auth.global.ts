import { useAuthStore } from '~/stores/authStore'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  console.log(authStore.user, 'authStore')

  // if (authStore.loading) return

  const publicPages = ['/', '/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authStore.user) {
    return navigateTo('/')
  }
})
