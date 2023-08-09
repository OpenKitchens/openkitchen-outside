<script setup>
import { ref } from "vue"
import rightSideBar from "@/components/modules/rightSideBar.vue";

const query = ref(decodeURI(window.location.search.substring(8)))

const socket = new WebSocket(query.value);
const socketReady = ref(false);

//UIの構成
const UI = ref({});

socket.onopen = function () {
  console.log('WebSocket接続が確立されました');
  socket.send(JSON.stringify({ type: { openServer: true } })); // サーバーにメッセージを送信
};

socket.onmessage = function (event) {
  UI.value = JSON.parse(event.data);
  console.log(event.data)
  socketReady.value = true
}

socket.onclose = function () {
  console.log('WebSocket接続がクローズされました');
};
</script>

<template>
  <div class="holy-grail">
    <div class="holy-grail__main">
      <div class="container mt-4 holy-grail__middle" style="width: 55%; overflow-y: scroll; height: 100%">
        <div class="card">
          <img :src="UI.image" class="card-img-top" style="object-fit: cover; height: 200px;" alt="Sample Image">
          <div class="card-body">
            <div class="emoji">{{ UI.emoji }}</div>
            <h5 class="card-title mt-5">{{ UI.title }}</h5>
            <p class="card-text mt-3">{{ UI.serverInformation }}</p>
          </div>
        </div>
      </div>

      <nav class="holy-grail__right" style="overflow-y: scroll; height: calc(100vh - 50px)">
        <rightSideBar />
      </nav>
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

.content {
  position: relative;
  z-index: 1;
  /* コンテンツを画像より上に配置 */
}

.card-title {
  font-size: 25px;
  font-weight: bold;
  position: relative;
  left: 50px;
}

.emoji {
  font-size: 70px;
  position: absolute;
  top: 150px;
  left: 50px;
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
  margin-left: 100px;
}

.holy-grail__middle {
  /* Take the remaining width */
  flex-grow: 1;
}

.holy-grail__right {
  width: calc(27.5% - 30px);
  margin-right: 100px;
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

.card-text{
  white-space: pre-wrap;
  margin-left: 50px;
  margin-right: 50px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 7px;
}
</style>
