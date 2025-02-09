<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'
import {
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
} from 'firebase/auth'
const { $auth } = useNuxtApp()

// $auth.onAuthStateChanged((user) => {
//   if (user) {
//     console.log('User is signed in')
//   } else {
//     console.log('User is signed out')
//   }
// })

onMounted(() => {
  // console.log($auth, 'auth')
  // console.log($auth.currentUser, 'currentUser')
  onAuthStateChanged($auth, (user) => {
    if (user) {
      console.log('User is signed in', user)
    } else {
      console.log('User is signed out')
    }
  })
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
