import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import type { User } from "firebase/auth"

interface FormData {
  email: string,
  displayName?: string,
  password: string
}

interface AuthState {
  user: User | null;
  token: string | null;
  errorMessage: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    errorMessage: null
  }),

  actions: {
    async register({ email, password, displayName }: FormData) {

      console.log(email, password, displayName, 'data')
      const { $auth } = useNuxtApp();
      
      try {
        const {userDetails, token} = await $fetch('/api/auth/register', { 
          method: 'post', body: { email, password, displayName }
        });
        await signInWithCustomToken($auth, token);
        this.user = $auth.currentUser;
            
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    }
  }
})
