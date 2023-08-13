<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router';

if(!localStorage.getItem('websocket')){
  const router = useRouter();
  const route = useRoute();
  if(route.path === "signIn"){

  }else{
    router.push('/login');
  }
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>