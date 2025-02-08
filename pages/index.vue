<script lang="ts" setup>

import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
import type { User } from "firebase/auth"
import { useAuthStore} from '~/stores/authStore';
  const form = ref({
    email: '',
    password: '',
    displayName: ''
  });

  // const user = ref<User | null>(null);
  // const errorMessage = ref<string>('');

  async function signUp() {
   const  authStore = useAuthStore();

   authStore.register(form.value)
  }

</script>

<template>
  <h1>Index page</h1>
  <form @submit.prevent="signUp">
    <div>
      <input type="email" placeholder="email" name="email" v-model="form.email" />
    </div>
    <div>
      <input type="text" placeholder="displayName" name="displayName" v-model="form.displayName"/>
    </div>
    <div>
      <input type="password" placeholder="password" name="password" v-model="form.password"/>
    </div>
    <button type="submit">signup</button>
  </form>
</template>

<style>
div {
  margin-bottom: 10px;
}
</style>
