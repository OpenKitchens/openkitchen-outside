<script setup lang="ts">
import leftSideBarComponents from "@/components/modules/leftSideBar.vue";
/*
import mainContentComponents from "@/assets/atomic/home/mainContentComponents.vue";
import rightSideBarComponents from "@/assets/atomic/home/rightSideBarComponents.vue";
*/
import { reactive } from "vue";

//client鯖と通信する用
const socket = new WebSocket('wss://openkitchenclientserver.openkitchensmoy.repl.co');

socket.onopen = function () {
  console.log('WebSocket接続が確立されました');
  socket.send('Hello, Server!'); // サーバーにメッセージを送信
};

socket.onmessage = function (event) {
  console.log('サーバーからのメッセージ:', event.data);
};

socket.onclose = function () {
  console.log('WebSocket接続がクローズされました');
};


//初期データ
const myName = localStorage.getItem("myName");
const myIcon = localStorage.getItem("myIcon");
const myHeader = localStorage.getItem("myHeader");
const myBio = localStorage.getItem("myBio");
const myID = localStorage.getItem("myHash");
//@ts-ignore
let friends = JSON.parse(localStorage.getItem("friends")) || [{ title: "フレンドがいません", image: "icons/warning.svg" }]
//@ts-ignore
let servers = JSON.parse(localStorage.getItem("servers")) || [{ title: "サーバーに所属していません。", emoji: "", badge: "" }]

//UIの構成
const UI = reactive({
  //OpenDeckのホーム
  myName: myName,
  myHash: myID,
  myIcon: myIcon,
  myHeader: myHeader,
  myBio: myBio,
  friends: friends,
  servers: servers,
});

//初期データの格納(自分系・設定画面で実現系)
localStorage.setItem(
  "myBio",
  "Laravel(PHP)とGCPが好きなWebエンジニア。けど業務で使うのはJava/Kotlin系とReact。発言は個人の意見であり組織を代表しません。"
);
localStorage.setItem(
  "myIcon",
  "https://lh3.googleusercontent.com/a/AAcHTtfJxAxhupV-gaBkzvK52gbXss-IRzj8uk88IIg-aI5fYA=s96-c"
);
localStorage.setItem(
  "myHeader",
  "https://assets.moguravr.com/uploads/2021/09/202109211455137000.jpg"
);


const timeLine = reactive({
  topThread: {
    background:
      "https://static.reuters.com/resources/r/?m=02&d=20230704&t=2&i=1637745003&r=LYNXMPEJ63024&w=1600",
    title: "米メタ、ツイッターのような対話アプリ「Threads」発表へ",
    preview:
      "[３日 ロイター] - 米メタ・プラットフォームズは対話アプリ「Threads（スレッズ）」の立ち上げを計画している。\n新アプリは同社の写真共有アプリ、インスタグラムのテキストベースの会話アプリで、６日に発表される予定。ユーザーはインスタグラムでフォローしているアカウントをそのまま引き継ぐことができ、ユーザー名も変わらない。\nツイッター運営会社はここ数日、閲覧数の制限や「TweetDeck（ツイートデック）」の認証制度導入など、さまざまな制限を発表している。\n",
    user: "9e61633c0c104a64d719e53871538f73688291d3ffd02dff5f55e3ae7de093d0",
    icon: "https://static.wikia.nocookie.net/discord/images/e/e6/Mee6.png",
    link: "9e61633c0c104a64d719e53871538f73688291d3ffd02dff5f55e3ae7de093d0/米メタ、ツイッターのような対話アプリ「Threads」発表へ",
    serverEmoji: "🎙",
    server: "雑談サーバー",
  },
  threadList: [
    {
      title: "【VRChat】自鯖のリンク貼ってけ",
      user: "52d16e3c0c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0",
      icon: "https://lh3.googleusercontent.com/a/AAcHTtfJxAxhupV-gaBkzvK52gbXss-IRzj8uk88IIg-aI5fYA=s96-c",
      serverEmoji: "🍔",
      server: "openkitchen開発部",
      link: "52d16e3c0c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0/【VRChat】自鯖のリンク貼ってけ",
      badge: 512,
    },
    {
      title: "あ、Github落ちた…",
      user: "12d6e63c0c10ea64d779e58871538f73978291d3ffd72dff5f75e3ae7de07370",
      icon: "https://static.wikia.nocookie.net/discord/images/e/e6/Mee6.png",
      serverEmoji: "🐈‍⬛",
      server: "GitHubの民",
      link: "12d6e63c0c10ea64d779e58871538f73978291d3ffd72dff5f75e3ae7de07370/あ、Github落ちた…",
      badge: 287,
    },
    {
      title: "【悲報】GitHubサーバーダウン...",
      user: "52d16e3c0c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0",
      icon: "https://neconeconews.com/wp-content/uploads/popcat1_close.png",
      serverEmoji: "🎙",
      server: "雑談サーバー",
      link: "52d16e3c0c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0/【悲報】GitHubサーバーダウン...",
      badge: 114,
    },
    {
      title: "【organization】ワクワク参加レポジトリ",
      user: "65a1e340c104a64d719e58871538f73988291d3ffd02dff5f55e3ae7de093d0",
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
    <header>
      <headerComponents :myName="(UI.myName as string)" :myHash="(UI.myHash as string)" :myIcon="(UI.myIcon as string)" />
    </header>
    <main class="holy-grail__main">
      <!-- Left sidebar -->
      <aside class="holy-grail__left" style="overflow-y: scroll; height: calc(100vh - 50px)">
        <leftSideBarComponents :myName="(UI.myName as string)" :myHash="(UI.myHash as string)"
          :myHeader="(UI.myHeader as string)" :myIcon="(UI.myIcon as string)" :myBio="(UI.myBio as string)"
          :friends="UI.friends" :servers="UI.servers" />
      </aside>

      <!-- Main content -->
      <article class="holy-grail__middle" style="width: 55%; overflow-y: scroll; height: calc(100vh - 50px)">
        <mainContentComponents :topThread="timeLine.topThread" :threadList="timeLine.threadList" />
      </article>

      <!-- Right sidebar -->
      <nav class="holy-grail__right" style="overflow-y: scroll; height: calc(100vh - 50px)">
        <rightSideBarComponents />
        <rightSideBarComponents />
        <rightSideBarComponents />
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
  width: calc(25% - 30px);
  margin-left: 30px;
}

.holy-grail__middle {
  /* Take the remaining width */
  flex-grow: 1;
}

.holy-grail__right {
  width: calc(20% - 30px);
  margin-right: 30px;
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
