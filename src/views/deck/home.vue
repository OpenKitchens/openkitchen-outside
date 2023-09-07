<script setup lang="ts">
import leftSideBar from '@/components/modules/leftSideBar.vue'
import mainContent from '@/components/modules/mainContent.vue'
import rightSideBar from '@/components/modules/rightSideBar.vue'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

if (!localStorage.getItem('websocket')) {
  const router = useRouter()
  router.push('/login')
}

//client鯖と通信する用
//@ts-ignore
const socket = new WebSocket(localStorage.getItem('websocket'))

// WebSocketの接続状態を追跡するref
const socketReady = ref(false)

//UIの構成
const UI = ref({})

socket.onopen = function () {
  console.log('WebSocket接続が確立されました')
  socket.send(JSON.stringify({ type: { renderingEngine: true } })) // サーバーにメッセージを送信
}

socket.onmessage = function (event) {
  UI.value = JSON.parse(event.data)
  console.log(event.data)
  socketReady.value = true
}

socket.onclose = function () {
  console.log('WebSocket接続がクローズされました')
}
</script>

<template>
  <div v-if="socketReady" class="holy-grail">
    <main class="holy-grail__main">
      <!-- Left sidebar -->
      <aside class="holy-grail__left" style="overflow-y: scroll; height: 100%">
        <leftSideBar
          :myName="UI.myName as string"
          :myHash="UI.myHash as string"
          :myHeader="UI.myHeader as string"
          :myIcon="UI.myIcon as string"
          :myBio="UI.myBio as string"
          :friends="UI.friends"
          :servers="UI.servers"
        />
      </aside>

      <!-- Main content -->
      <article class="holy-grail__middle" style="width: 55%; overflow-y: scroll; height: 100%">
        <mainContent :timeLine="UI.timeLine" />
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
  height: calc(100vh - 56px);
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

@media screen and (min-width: 960px) {
  .holy-grail__right {
    display: none;
  }
  .holy-grail__middle {
    margin-right: 60px;
  }
}
</style>
