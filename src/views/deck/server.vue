<script setup>
import { ref, reactive } from "vue"
import mainContent from "@/components/modules/mainContent.vue";
import rightSideBar from "@/components/modules/rightSideBar.vue";

import { useRouter } from 'vue-router';

if (!localStorage.getItem('websocket')) {
  const router = useRouter();
  router.push('/about');
}

const query = ref(decodeURI(window.location.search.substring(8)))
const socketReady = ref(false);

//UIの構成
const UI = ref({});

//@ts-ignore
fetch(query.value, {
  method: 'POST', // POSTリクエストを指定
  headers: {
    'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
  },
  body: JSON.stringify({ type: { openServer: true } }) // POSTデータをJSON形式に変換して指定
})
  .then(response => response.json())
  .then(data => {
    UI.value = data;
    console.log(data)
    socketReady.value = true
  })
  .catch(error => {
    console.error('エラーが発生しました:', error);
  });

</script>

<template>
  <div class="holy-grail">
    <div class="holy-grail__main">
      <!--<div class="container mt-4 holy-grail__middle" style="width: 65%; overflow-y: scroll; height: calc(100vh - 82px)">-->
      <div class="container mt-4 holy-grail__middle" style="width: 100%; overflow-y: scroll; height: calc(100vh - 82px)">
        <div class="card servers">
          <div class="card-header text-center">
            {{ UI.title }}
          </div>
          <div class="server-card">
            <img :src="UI.image" class="card-img-top" style="object-fit: cover; height: 200px;border-radius: 0;"
              alt="Sample Image">
            <div class="card-title">
              <h4 class="mt-3" style="font-weight: bold;">{{ UI.emoji }} {{ UI.title }}</h4>
              <p class="mt-3">{{ UI.serverInformation }}</p>
            </div>
            <div class="card-body">
              <div class="holy-grail__middle mt-3">
                <mainContent :timeLine="[UI.threads]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--<nav class="holy-grail__right" style="overflow-y: scroll; height: calc(100vh - 50px)">
        <rightSideBar />
      </nav>-->
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  height: 200px;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 画像を縮小・拡大して全体をカバー */
  z-index: -1;
  /* 画像を背景に配置 */
}

.server-card {
  height: calc(100vh - 102px);
  overflow-y: scroll;
}

.content {
  position: relative;
  z-index: 1;
  /* コンテンツを画像より上に配置 */
}

.card-title {
  margin: 0;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  background-color: rgb(27, 88, 204);
}

.servers {
  overflow: hidden;
  height: calc(100vh - 92px);
}

.holy-grail {
  display: flex;
  flex-direction: column;
}

.holy-grail__main {
  /* Take the remaining height */
  flex-grow: 1;
  height: calc(100vh - 56px);
  /* Layout the left sidebar, main content and right sidebar */
  display: flex;
  flex-direction: row;
  /*margin-left: 150px;*/
  margin-left: 20%;
  margin-right: 20%;
}

.holy-grail__middle {
  /* Take the remaining width */
  margin: 0;
}

.holy-grail__right {
  width: calc(27.5% - 30px);
  margin-right: 150px;
}

.holy-grail__left::-webkit-scrollbar {
  display: none;
}

.holy-grail__middle::-webkit-scrollbar {
  display: none;
}

.holy-grail__right::-webkit-scrollbar {
  display: none;
}

.card-header {
  font-size: 20px;
  font-weight: bold;
}

@media screen and (max-width: 1112px) {
  .holy-grail__main{
    margin-left: 10%;
    margin-right: 10%;
  }
}
</style>
