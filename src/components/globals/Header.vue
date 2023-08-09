<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';

const pages = ref("home")

const router = useRouter();

const onPagesChange = (page: string): void => {
  pages.value = page
  router.push({ name: page });
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <img v-show="pages === 'home'" src="../icons/house-door-fill.svg">
            <img v-show="pages !== 'home'" src="../icons/house-door.svg">
            <a class="nav-link" @click="onPagesChange('home')"><span
                :class="{ 'active': pages === 'home' }">ホーム</span></a>
          </li>
          <li class="nav-item">
            <img v-show="pages === 'bookmark'" src="../icons/bookmark-fill.svg">
            <img v-show="pages !== 'bookmark'" src="../icons/bookmark.svg">
            <a class="nav-link" @click="onPagesChange('bookmark')"><span
                :class="{ 'active': pages === 'bookmark' }">ブックマーク</span></a>
          </li>
          <li class="nav-item">
            <img v-show="pages === 'message'" src="../icons/chat-fill.svg">
            <img v-show="pages !== 'message'" src="../icons/chat.svg">
            <a class="nav-link" @click="onPagesChange('message')"><span
                :class="{ 'active': pages === 'message' }">メッセージ</span></a>
          </li>
          <li class="nav-item">
            <img v-show="pages === 'notification'" src="../icons/bell-fill.svg">
            <img v-show="pages !== 'notification'" src="../icons/bell.svg">
            <a class="nav-link" @click="onPagesChange('notification')"><span
                :class="{ 'active': pages === 'notification' }">通知</span></a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="code" placeholder="code" aria-label="code">
          <button type="button" class="btn btn-light">スレッド投稿</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar{
  background-color: rgb(44, 41, 37) !important;
  border-bottom: solid 1px #444;
}
.container-fluid{
  margin-left: 30px;
  margin-right: 30px;
}
.nav-item {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
}

.active {
  /*border-bottom: solid 2px #1da1f2;*/
  font-weight: 500 !important;
  color: #ffffff;
}

img {
  filter: invert(100%);
}

.btn{
  width: 160px;
  border-radius: 50px;
}

.form-control{
  border-radius: 50px;
  padding-left: 20px;
  background-color: rgb(44, 41, 37) !important;
  border: solid 1px #444;
}
</style>