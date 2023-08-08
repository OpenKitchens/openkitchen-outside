<script setup lang="ts">
import leftSideBar from "@/components/modules/leftSideBar.vue";
import mainContent from "@/components/modules/mainContent.vue";
import rightSideBar from "@/components/modules/rightSideBar.vue";
import { reactive, ref } from "vue";

//client鯖と通信する用
//@ts-ignore
const socket = new WebSocket(localStorage.getItem('websocket'));

// WebSocketの接続状態を追跡するref
const socketReady = ref(false);

//UIの構成
const UI = ref({});


socket.onopen = function () {
  console.log('WebSocket接続が確立されました');
  socket.send(JSON.stringify({ type: { renderingEngine: true } })); // サーバーにメッセージを送信
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
    title: "魔改造でぺったんこになった水冷式｢PlayStation 5 slim｣。薄さなんと2cm",
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
  <div v-if="socketReady" class="holy-grail">
    <main class="holy-grail__main">
      <!-- Left sidebar -->
      <aside class="holy-grail__left" style="overflow-y: scroll; height: calc(100vh - 50px)">
        <leftSideBar :myName="(UI.myName as string)" :myHash="(UI.myHash as string)" :myHeader="(UI.myHeader as string)"
          :myIcon="(UI.myIcon as string)" :myBio="(UI.myBio as string)" :friends="UI.friends" :servers="UI.servers"
          @addServer="addServer" />
      </aside>

      <!-- Main content -->
      <article class="holy-grail__middle" style="width: 55%; overflow-y: scroll; height: calc(100vh - 50px)">
        <mainContent :topThread="timeLine.topThread" :threadList="timeLine.threadList" />
      </article>

      <!-- Right sidebar -->
      <nav class="holy-grail__right" style="overflow-y: scroll; height: calc(100vh - 50px)">
        <rightSideBar />
      </nav>
    </main>
    <footer></footer>
  </div>
</template>

<style scoped>
.holy-grail {
  display: flex;
  flex-direction: column;
}

.holy-grail__main {
  /* Take the remaining height */
  flex-grow: 1;

  /* Layout the left sidebar, main content and right sidebar */
  display: flex;
  flex-direction: row;
}

.holy-grail__left {
  width: calc(27.5% - 30px);
  margin-left: 60px;
}

.holy-grail__middle {
  /* Take the remaining width */
  flex-grow: 1;
}

.holy-grail__right {
  width: calc(27.5% - 30px);
  margin-right: 60px;
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
</style>
