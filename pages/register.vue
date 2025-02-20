<script lang="ts" setup>
import { useAuthStore } from '~/stores/authStore'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  displayName: '',
})

async function signUp() {
  const authStore = useAuthStore()

  await authStore.register(form.value)
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
        type="text"
        placeholder="displayName"
        name="displayName"
        v-model="form.displayName"
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
    <button type="submit">Sign Up</button>
    <router-link to="/">Login</router-link>
  </form>
</template>

<style>
div {
  margin-bottom: 10px;
}
button {
  margin-right: 10px;
}
</style>
