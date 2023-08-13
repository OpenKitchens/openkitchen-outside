<script setup>
import { useRouter } from 'vue-router';

const route = useRoute();

if(!localStorage.getItem('websocket')){
  const router = useRouter();
  router.push('/login');
}
</script>

<template>
</template>