import {
  getAuth,
  signInWithCustomToken,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getIdToken,
} from 'firebase/auth'
import type { User, UserCredential } from 'firebase/auth'
interface FormData {
  email: string
  displayName?: string
  password: string
}

interface AuthState {
  user: User | null
  errorMessage: string | null
  token: string | null
  loading: boolean
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
    token: null,
    loading: true,
  }),

  actions: {
    async register({ email, password, displayName }: FormData) {
      const { $auth } = useNuxtApp()

      try {
        const user: UserResponse = await $fetch('/api/auth/register', {
          method: 'post',
          body: { email, password, displayName },
        })

        if (user.token) {
          await signInWithCustomToken($auth, user.token)
          this.user = $auth.currentUser
        }
      } catch (error: any) {
        console.log(error, 'error')
        this.errorMessage = error.message
      }
    },

    async login({ email, password }: FormData) {
      const { $auth } = useNuxtApp()

      // try {
      //   const user: UserResponse = await $fetch('/api/auth/login', {
      //     method: 'post',
      //     body: { email, password },
      //   })
      //   await signInWithCustomToken($auth, user.token)
      //   this.user = $auth.currentUser
      // } catch (error: any) {
      //   this.errorMessage = error.message
      // }

      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          $auth,
          email,
          password
        )
        this.user = userCredential.user
        navigateTo('/dashboard')
      } catch (error: any) {
        this.errorMessage = error.message
      }
    },

    async initAuth() {
      const { $auth } = useNuxtApp()

      return new Promise((resolve) => {
        onAuthStateChanged($auth, async (user) => {
          this.user = user
          this.token = user ? await getIdToken(user) : null
          // this.loading = false
          resolve(user)
        })
      })
    },

    async logOut() {
      const { $auth } = useNuxtApp()
      await signOut($auth)
      this.user = null
      navigateTo('/')
    },
  },
})
