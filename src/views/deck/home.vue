<script setup>
import leftSideBar from "@/components/modules/leftSideBar.vue";
import mainContent from "@/components/modules/mainContent.vue";
import { ref } from "vue";

import { useRouter } from 'vue-router';

if (!localStorage.getItem('websocket')) {
  const router = useRouter();
  router.push('/about');
}

// WebSocketの接続状態を追跡するref
const socketReady = ref(false);

//UIの構成
const UI = ref({});

//client鯖と通信する用
//@ts-ignore
fetch(localStorage.getItem('websocket'), {
  method: 'POST', // POSTリクエストを指定
  headers: {
    'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
  },
  body: JSON.stringify({ type: { renderingEngine: true } }) // POSTデータをJSON形式に変換して指定
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
  <div v-if="socketReady" class="holy-grail">
    <main class="holy-grail__main">
      <!-- Left sidebar -->
      <aside class="holy-grail__left" style="overflow-y: scroll; height: 100%">
        <leftSideBar :myName="UI.myName" :myHash="UI.myHash" :myHeader="UI.myHeader" :myIcon="UI.myIcon" :myBio="UI.myBio"
          :friends="UI.friends" :servers="UI.servers" />
      </aside>

      <!-- Main content -->
      <article class="holy-grail__middle" style="width: 55%; overflow-y: scroll; height: 100%">
        <mainContent :timeLine="UI.timeLine" />
      </article>

      <!-- Right sidebar -->
      <!--<nav class="holy-grail__right" style="overflow-y: scroll; height: calc(100vh - 50px)">-->
      <nav class="holy-grail__right" style="overflow-y: scroll;">
        <!--<rightSideBar />-->
      </nav>
    </main>
    <footer></footer>
  </div>
</template>

<style scoped>
.holy-grail {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.holy-grail__main {
  /* Take the remaining height */
  flex-grow: 1;
  height: calc(100vh - 56px);
  /* Layout the left sidebar, main content and right sidebar */
  display: flex;
  flex-direction: row;
}

.holy-grail__left {
  width: calc(25.5% - 30px);
  /*margin-right: 60px;*/
  margin-left: 120px;
}

.holy-grail__middle {
  /* Take the remaining width */
  flex-grow: 1;
}

.holy-grail__right {
  /*width: calc(27.5% - 30px);*/
  /*margin-right: 60px;*/
  margin-left: 170px;
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

@media screen and (max-width: 1112px) {
  .holy-grail__left {
    width: calc(25.5% - 30px);
    /*margin-right: 60px;*/
    margin-left: 30px;
  }

  .holy-grail__right {
    /*width: calc(27.5% - 30px);*/
    /*margin-right: 60px;*/
    margin-left: 10px;
  }
}


@media screen and (max-width: 480px) {
  .holy-grail__main{
    margin-left: 5px;
    margin-right: 5px;
  }
  .holy-grail__left{
    display: none;
  }
}
</style>
