<script lang="ts" setup>

  async function signUp() {
    const data = await $fetch('/api/auth/createcustomuser', { method: 'post', body: { email: 'example@email.com', password: 'password' }});
    console.log(data, 'data')
  }

</script>

<template>
  <h1>Index page</h1>
  <button @click="signUp">signup</button>
</template>
