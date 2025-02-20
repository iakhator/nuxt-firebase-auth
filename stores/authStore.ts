import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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

  // actions: {
  //   async register({ email, password, displayName }: FormData) {
  //     const { $auth } = useNuxtApp()

  //     try {
  //       const userCredential: UserCredential =
  //         await createUserWithEmailAndPassword($auth, email, password)
  //       await this.setUser(userCredential.user)
  //       navigateTo('/dashboard')
  //     } catch (error: any) {
  //       this.errorMessage = error.message
  //     }
  //   },

  //   async login({ email, password }: FormData) {
  //     const { $auth } = useNuxtApp()
  //     try {
  //       const userCredential: UserCredential = await signInWithEmailAndPassword(
  //         $auth,
  //         email,
  //         password
  //       )
  //       await this.setUser(userCredential.user)
  //       navigateTo('/dashboard')
  //     } catch (error: any) {
  //       this.errorMessage = error.message
  //     }
  //   },

  //   async setUser(user: User | null) {
  //     this.user = user
  //     this.isAuthReady = !!user

  //     if (user) {
  //       this.user = user
  //       const token = await user.getIdToken()

  //       useCookie('authToken').value = token
  //     }
  //   },

  //   async initSessionAuth() {
  //     const { $auth, ssrContext } = useNuxtApp()

  //     if (import.meta.server) {
  //       const { data } = await useFetch('/api/auth/user')
  //     }
  //   },

  //   async initAuth() {
  //     const { $auth, ssrContext } = useNuxtApp()
  //     // if (process.server) {
  //     //   this.user = ssrContext?.event.context.user || null
  //     //   this.isAuthReady = !!this.user
  //     // } else {
  //     //   onAuthStateChanged($auth, async (user) => {
  //     //     await this.setUser(user)
  //     //   })
  //     // }
  //     //
  //     if (import.meta.server) {
  //       const { data } = await useFetch('/api/auth')
  //       this.user = data.value?.user
  //       this.isAuthReady = !!this.user
  //     } else {
  //       onAuthStateChanged($auth, async (user) => {
  //         await this.setUser(user)
  //       })
  //     }
  //   },

  //   async logOut() {
  //     const { $auth } = useNuxtApp()
  //     await signOut($auth)
  //     this.user = null
  //     this.isAuthReady = false
  //     useCookie('authToken').value = null
  //     navigateTo('/')
  //   },
  // },
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

    async login({ email, password }: FormData) {
      await this.fetchCsrfToken()
      const { $auth } = useNuxtApp()
      try {
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
        }
        return await navigateTo('/dashboard')
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
