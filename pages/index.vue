<template>
  <h1>Index page</h1>
</template>

<script lang="ts" setup>

const {data} = await useFetch('/api/auth/createcustomuser');
</script>
