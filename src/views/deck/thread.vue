<script setup>
import { ref } from 'vue'
import rightSideBar from '@/components/modules/rightSideBar.vue'

import { useRouter } from 'vue-router'

if (!localStorage.getItem('websocket')) {
  const router = useRouter()
  router.push('/login')
}

const uuid = ref(decodeURI(window.location.search.substring(2, 38)))
const thread = ref(decodeURI(window.location.search.substring(39)))
const socketReady = ref(false)
const formData = ref('')

//UIの構成
const UI = ref({})
const Me = ref({})
const Reply = ref()
const ReplyButton = ref("リプライ")

//@ts-ignore
fetch(thread.value, {
  method: 'POST', // POSTリクエストを指定
  headers: {
    'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
  },
  body: JSON.stringify({ type: { getThread: true }, uuid: uuid.value }) // POSTデータをJSON形式に変換して指定
})
  .then((response) => response.json())
  .then((data) => {
    UI.value = data
    console.log(data)
    socketReady.value = true
    console.log(UI.value.data.threadMessage)
    Reply.value = UI.value.data.threadMessage.map((jsonString) => JSON.parse(jsonString))
  })
  .catch((error) => {
    console.error('エラーが発生しました:', error)
  })

//自分のiconを取得
fetch(localStorage.getItem('websocket'), {
  method: 'POST', // POSTリクエストを指定
  headers: {
    'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
  },
  body: JSON.stringify({ type: { renderingEngine: true } }) // POSTデータをJSON形式に変換して指定
})
  .then((response) => response.json())
  .then((data) => {
    Me.value = data
    console.log(data)
    socketReady.value = true
  })
  .catch((error) => {
    console.error('エラーが発生しました:', error)
  })

//メッセージを送信
//@ts-ignore
function sendMessage() {
  ReplyButton.value = "送信中..."
  fetch(thread.value, {
    method: 'POST', // POSTリクエストを指定
    headers: {
      'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
    },
    body: JSON.stringify({
      type: { postMessage: true },
      uuid: uuid.value,
      message: formData.value,
      icon: Me.value.myIcon,
      name: Me.value.myName
    }) // POSTデータをJSON形式に変換して指定
  })
    .then((response) => response.json())
    .then((data) => {
      Reply.value = data.data.map((jsonString) => JSON.parse(jsonString))

      console.log(Reply.value)
      formData.value = ""
      ReplyButton.value = "リプライ"
    })
    .catch((error) => {
      console.error('エラーが発生しました:', error)
    })
}

function getMessage() {
  fetch(thread.value, {
    method: 'POST', // POSTリクエストを指定
    headers: {
      'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
    },
    body: JSON.stringify({ type: { getMessage: true }, uuid: uuid.value }) // POSTデータをJSON形式に変換して指定
  })
    .then((response) => response.json())
    .then((data) => {
      Reply.value = data.data.map((jsonString) => JSON.parse(jsonString))

      console.log(Reply.value)
    })
    .catch((error) => {
      console.error('エラーが発生しました:', error)
    })
}


setInterval(() => {   getMessage() }, 10000);

</script>
<template>
  <div class="holy-grail" v-if="socketReady">
    <div class="holy-grail__main">
      <!--<div class="container mt-4 holy-grail__middle" style="width: 65%; overflow-y: scroll; height: calc(100vh - 82px)">-->
      <div
        class="container mt-4 holy-grail__middle"
        style="width: 100%; overflow-y: scroll; height: calc(100vh - 82px)"
      >
        <div class="card threads">
          <div class="thread-card">
            <img
              :src="UI.data.threadInfo.headerImage"
              class="card-img-top"
              style="object-fit: cover; height: 350px; border-radius: 0"
              v-if="UI.data.threadInfo.headerImage"
              alt="Sample Image"
            />
            <div class="card-title">
              <div class="d-flex align-items-center thread-author">
                <img
                  :src="UI.data.threadInfo.myIcon"
                  class="rounded-circle me-2 author-icon"
                  alt="myName Avatar"
                />
                <span class="fw-bold author-name">{{ UI.data.threadInfo.myName }}</span>
              </div>
              <h3 class="mt-4" style="font-weight: 900">{{ UI.data.threadInfo.title }}</h3>
            </div>
            <div class="card-body">
              <div class="holy-grail__middle">
                <p class="mt-4" style="font-weight: 900">{{ UI.data.threadInfo.message }}</p>
              </div>
            </div>

            <ul class="list-group list-group-flush">
              <li class="list-group-item"></li>
              <li class="list-group-item">
                <div class="input-group" style="width: 95%; margin: auto">
                  <span class="input-group-text" id="addon-wrapping"
                    ><img :src="Me.myIcon" class="user-image"
                  /></span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData"
                    placeholder="テキストを入力"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    @click="sendMessage"
                  >
                    {{ ReplyButton }}
                  </button>
                </div>
              </li>
              <!--メッセージリプ欄-->
              <li class="list-group-item">
                <button class="btn btn-primary" type="button" @click="getMessage">リロード</button>
              </li>
              <li class="list-group-item" v-for="reply in Reply">
                <div class="d-flex align-items-center thread-author">
                  <img
                    :src="reply.icon"
                    class="rounded-circle me-2 author-icon sharp"
                    alt="myName Avatar"
                  />
                  <span class="fw-bold author-name sharp">{{ reply.name }}</span>
                </div>
                <p>{{ reply.message }}</p>
              </li>
              <li class="list-group-item"></li>
            </ul>
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

.thread-card {
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
  padding-bottom: 0;
}

.threads {
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

.thread-author {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.author-icon {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.author-name {
  font-size: 1.2rem;
  font-weight: lighter;
}

.author-icon.sharp {
  width: 27px;
  height: 27px;
}

.author-name.sharp {
  font-size: 15px;
}

.card-body {
  margin: 0;
  padding: 20px;
  padding-left: 40px;
  padding-right: 40px;
  font-weight: lighter !important;
}

.card-body p {
  font-weight: 500 !important;
}

.user-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
}

.btn-primary {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
}

@media screen and (max-width: 1112px) {
  .holy-grail__main {
    margin-left: 10%;
    margin-right: 10%;
  }
}

@media screen and (max-width: 480px) {
  .holy-grail__main {
    margin-left: 5px;
    margin-right: 5px;
  }

  .input-group-text {
    display: none;
  }

  .card-img-top {
    height: 200px !important;
  }

  .form-control {
    border-radius: 6px 0 0 6px !important;
  }

  .card-title {
    padding: 20px 25px !important;
  }

  p.mt-4 {
    margin: 0 !important;
    padding: 0 !important;
  }

  .card-body {
    padding: 15px 25px !important;
  }
}
</style>