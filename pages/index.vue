<script lang="ts" setup>
import { useAuthStore } from '~/stores/authStore'

definePageMeta({
  title: 'Index',
  ssr: false,
  middleware: [
    function (to, from) {
      const authStore = useAuthStore()
      console.log('I got here', authStore.user)
    },
  ],
})

const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

async function signUp() {
  const authStore = useAuthStore()

  await authStore.login(form.value)
  if (authStore.user) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <h1>Index page</h1>
  <form @submit.prevent="signUp">
    <div>
      <input
        type="email"
        placeholder="email"
        name="email"
        v-model="form.email"
      />
    </div>
    <div>
      <input
        type="password"
        placeholder="password"
        name="password"
        v-model="form.password"
      />
    </div>
    <button type="submit">Login</button>
    <router-link to="/register">Register</router-link>
  </form>
</template>

<style>
div {
  margin-bottom: 10px;
}
</style>
