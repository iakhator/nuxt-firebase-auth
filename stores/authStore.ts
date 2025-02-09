import {
  getAuth,
  signInWithCustomToken,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
interface FormData {
  email: string
  displayName?: string
  password: string
}

interface AuthState {
  user: User | null
  token: string | null
  errorMessage: string | null
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
    token: null,
    errorMessage: null,
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

    async observeAuthState() {
      const { $auth } = useNuxtApp()

      if ($auth) {
        onAuthStateChanged($auth, async (user) => {
          if (user) {
            this.user = user
            this.token = await user.getIdToken()
          } else {
            this.user = null
            this.token = null
          }

          this.loading = false
        })
      }
    },

    logOut() {
      const { $auth } = useNuxtApp()
      signOut($auth)
      this.user = null
      this.token = null
    },
  },
})
