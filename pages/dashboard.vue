<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'
import {
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
} from 'firebase/auth'
const { $auth } = useNuxtApp()

definePageMeta({
  title: 'Dashboard',
  // middleware: ['auth'],
})

function signOut() {
  const authStore = useAuthStore()
  authStore.logOut()
}
const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Dashboard page {{ authStore.user?.displayName }}</h1>
    <button @click="signOut">Log Out</button>
  </div>
</template>
