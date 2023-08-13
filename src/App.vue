<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

if(!localStorage.getItem('websocket')){
  const router = useRouter();
  router.push('/login');
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>