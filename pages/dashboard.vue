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
  auth: true,
  // middleware: ['auth'],
})

function signOut() {
  const authStore = useAuthStore()
  authStore.logOut()
}
const authStore = useAuthStore()
</script>

<template>
  <h1>Dashboard page login</h1>
  <button @click="signOut">Log Out</button>
</template>
