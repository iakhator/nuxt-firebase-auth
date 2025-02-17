<script lang="ts" setup>
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Profile</h1>
    <p>Welcome, {{ authStore.user?.email }}</p>
    <button @click="signOut">Log Out</button>
  </div>
</template>
