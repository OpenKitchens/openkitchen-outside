<script setup lang="ts">
import Header from '@/components/globals/Header.vue'

import home from '@/components/pages/deck/home.vue';
import bookmark from '@/components/pages/deck/bookmark.vue';
import message from '@/components/pages/deck/message.vue';
import notification from '@/components/pages/deck/notification.vue';

import { ref } from 'vue'
import { useRouter } from 'vue-router';

if(!localStorage.getItem('websocket')){
  const router = useRouter();
  router.push('/signIn');
}

const pages = ref("home")

const onPagesChange = (page: string): void => {
  pages.value = page
}
</script>
<template>
  <Header v-on:pagesChange="onPagesChange"></Header>

  <home v-show="pages === 'home'"></home>
  <bookmark show="pages === 'bookmark'"></bookmark>
  <message show="pages === 'message'"></message>
  <notification show="pages === 'notification'"></notification>
</template>
