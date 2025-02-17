import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
  isAuthReady: boolean
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
  }),

  actions: {
    async register({ email, password, displayName }: FormData) {
      const { $auth } = useNuxtApp()

      try {
        const userCredential: UserCredential =
          await createUserWithEmailAndPassword($auth, email, password)
        await this.setUser(userCredential.user)
        navigateTo('/dashboard')
      } catch (error: any) {
        this.errorMessage = error.message
      }
    },

    async login({ email, password }: FormData) {
      const { $auth } = useNuxtApp()
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          $auth,
          email,
          password
        )
        await this.setUser(userCredential.user)
        navigateTo('/dashboard')
      } catch (error: any) {
        this.errorMessage = error.message
      }
    },

    async setUser(user: User | null) {
      this.user = user
      this.isAuthReady = !!user

      if (user) {
        this.user = user
        const token = await user.getIdToken()
        useCookie('authToken').value = token
      }
    },

    async initAuth() {
      const { $auth, ssrContext } = useNuxtApp()

      if (process.server) {
        this.user = ssrContext?.event.context.user || null
        this.isAuthReady = !!this.user
      } else {
        onAuthStateChanged($auth, async (user) => {
          await this.setUser(user)
        })
      }
    },

    async logOut() {
      const { $auth } = useNuxtApp()
      await signOut($auth)
      this.user = null
      this.isAuthReady = false
      useCookie('authToken').value = null
      navigateTo('/')
    },
  },
})
