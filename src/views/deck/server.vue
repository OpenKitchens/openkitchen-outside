<script setup>
import { ref, reactive } from "vue"
import mainContent from "@/components/modules/mainContent.vue";
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

const timeLine = reactive({
  topThread: {
    background:
      "https://media.loom-app.com/gizmodo/dist/images/2022/06/21/220622_ps5slim.jpg?w=1280",
    title: "【魔改造】薄さ2cmの水冷式 「PlayStation 5 slim」",
    user: "Dirt君",
    icon: "https://static.wikia.nocookie.net/discord/images/e/e6/Mee6.png",
    link: "9e61633c0c104a64d719e53871538f73688291d3ffd02dff5f55e3ae7de093d0/米メタ、ツイッターのような対話アプリ「Threads」発表へ",
    serverEmoji: "🎙",
    server: "雑談サーバー",
  },
  threadList: [
    {
      title: "【VRChat】自鯖のリンク貼ってけ",
      user: "OpenKitchen",
      icon: "https://lh3.googleusercontent.com/a/AAcHTtfJxAxhupV-gaBkzvK52gbXss-IRzj8uk88IIg-aI5fYA=s96-c",
      serverEmoji: "🍔",
      server: "openkitchen開発部",
      link: "52d16e3c0c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0/【VRChat】自鯖のリンク貼ってけ",
      badge: 512,
    },
    {
      title: "あ、Github落ちた…",
      user: "Dirt君",
      icon: "https://static.wikia.nocookie.net/discord/images/e/e6/Mee6.png",
      serverEmoji: "🐈‍⬛",
      server: "GitHubの民",
      link: "12d6e63c0c10ea64d779e58871538f73978291d3ffd72dff5f75e3ae7de07370/あ、Github落ちた…",
      badge: 287,
    },
    {
      title: "【悲報】GitHubサーバーダウン...",
      user: "OpenKitchen 猫々猫氏",
      icon: "https://neconeconews.com/wp-content/uploads/popcat1_close.png",
      serverEmoji: "🎙",
      server: "雑談サーバー",
      link: "52d16e3c0c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0/【悲報】GitHubサーバーダウン...",
      badge: 114,
    },
    {
      title: "【organization】ワクワク参加レポジトリ",
      user: "BigSur氏",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png",
      serverEmoji: "🐈‍⬛",
      server: "GitHubの民",
      link: "65a1e340c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0/【organization】ワクワク参加レポジトリ",
      badge: 71,
    },
  ],
});

</script>

<template>
  <div class="holy-grail">
    <div class="holy-grail__main">
      <div class="container mt-4 holy-grail__middle" style="width: 65%; overflow-y: scroll; height: calc(100vh - 82px)">
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
                <mainContent :topThread="timeLine.topThread" :threadList="timeLine.threadList" />
              </div>
            </div>
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

.servers{
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
  margin-left: 150px;
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
</style>
