<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

import Header from '@/components/globals/Header.vue'

if(!localStorage.getItem('websocket')){
  const router = useRouter();
  router.push('/signIn');
}
</script>

<template>
  <Header></Header>
  <RouterView />
</template>

<style scoped></style>