import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  type User,
  type UserCredential,
} from 'firebase/auth'

interface FormData {
  email: string
  displayName?: string
  password: string
}

interface AuthState {
  user: User | null
  errorMessage: string | null
  isAuthReady: boolean
  csrfToken: string | null
}

interface UserResponse {
  userDetails: {
    uid: string
    email?: string
    displayName?: string
  }
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    errorMessage: null,
    isAuthReady: false,
    csrfToken: '',
  }),

  actions: {
    async fetchCsrfToken() {
      try {
        const { data } = await useFetch('/api/auth/csrf')
        this.csrfToken = data.value?.token || ''
      } catch (error) {
        console.error('CSRF token fetch error:', error)
      }
    },

    async initAuth() {
      this.csrfToken = useCookie('csrfToken').value || null
    },

    async register({ email, password, displayName }: FormData) {
      await this.fetchCsrfToken()

      try {
        if (!this.csrfToken) {
          throw new Error('CSRF token is missing. Registration blocked.')
        }
        const { $auth } = useNuxtApp()
        const userCredential = await createUserWithEmailAndPassword(
          $auth,
          email,
          password
        )

        await updateProfile(userCredential.user, { displayName })

        const idToken = await userCredential.user.getIdToken()

        if (idToken) {
          await useFetch('/api/auth/sessionLogin', {
            method: 'POST',
            body: { idToken },
            headers: { 'X-CSRF-Token': this.csrfToken },
          })
          return await navigateTo('/dashboard')
        }
      } catch (error: any) {
        this.errorMessage = error.message
      }
    },

    async login({ email, password }: FormData) {
      await this.fetchCsrfToken()
      try {
        const { $auth } = useNuxtApp()
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          $auth,
          email,
          password
        )
        const idToken = await userCredential.user.getIdToken()

        if (idToken) {
          await useFetch('/api/auth/sessionLogin', {
            method: 'POST',
            body: { idToken },
            headers: { 'X-CSRF-Token': this.csrfToken },
          })

          return await navigateTo('/dashboard')
        }
      } catch (error: any) {
        this.errorMessage = error.message
      }
    },

    async fetchUser() {
      const { data } = await useFetch('/api/auth/user')
      this.user = data.value?.user || null
      this.isAuthReady = !!this.user
    },

    async logOut() {
      await useFetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'X-CSRF-Token': this.csrfToken },
      })
      this.user = null
      this.isAuthReady = false
      return await navigateTo('/')
    },
  },
})
