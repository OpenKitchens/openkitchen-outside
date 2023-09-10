<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import Header from '@/components/globals/Header.vue'

const route = useRoute();
</script>

<template>
  <Header v-if='route.path != "/signIn" && route.path != "/login" && route.path != "/about"' />
  <RouterView />
</template>

<style scoped></style>