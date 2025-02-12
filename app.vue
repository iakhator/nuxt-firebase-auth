<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'

onMounted(async () => {
  const authStore = useAuthStore()
  await authStore.initAuth()
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
