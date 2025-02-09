import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth'
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
  }),

  actions: {
    async register({ email, password, displayName }: FormData) {
      const { $auth } = useNuxtApp()

      try {
        const user: UserResponse = await $fetch('/api/auth/register', {
          method: 'post',
          body: { email, password, displayName },
        })

        await signInWithCustomToken($auth, user.token)
        this.user = $auth.currentUser
      } catch (error: any) {
        console.log(error, 'error')
        this.errorMessage = error.message
      }
    },
    logOut() {
      const { $auth } = useNuxtApp()
      signOut($auth)
      this.user = null
    },
  },
})
