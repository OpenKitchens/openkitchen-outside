<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';

const pages = ref("home")

const router = useRouter();

const onPagesChange = (page: string): void => {
  pages.value = page
  router.push({ name: page });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("threadPOSTForm");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function (event) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  });
});

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

//UI.servers.title UIstate.ui.servers.emoji
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
          <input class="form-control code me-2" type="code" placeholder="code" aria-label="code">
          <button type="button" class="btn btn-light createThreads" data-bs-target="#threadPOST"
            data-bs-toggle="modal">スレッド投稿</button>
        </form>
      </div>
    </div>
  </nav>


  <!--スレ立て-->
  <div class="modal fade" id="threadPOST" tabindex="-1" aria-labelledby="threadPOSTLabel" aria-hidden="true"
    v-if="socketReady">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="threadPOSTLabel">スレッドを投稿</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate id="threadPOSTForm">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Title</label>
              <input type="text" class="form-control" id="recipient-name" required />
              <div class="invalid-feedback">
                タイトルを入力してください。
              </div>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">ヘッダー画像</label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>

            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">
                Server
              </label>
              <select class="form-select" id="inputGroupSelect01" required>
                <option selected disabled value="">サーバーを選択してください</option>
                <option v-for="server in UI.servers" :key="server.title">
                  {{ server.emoji }} {{ server.title }}
                </option>
              </select>
              <div class="invalid-feedback">
                サーバーを選択してください。
              </div>
            </div>

            <div class="mb-3">
              <label for="message-text" class="col-form-label">メッセージ</label>
              <textarea class="form-control" id="message-text" required></textarea>
              <div class="invalid-feedback">
                メッセージを入力してください。
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            閉じる
          </button>
          <button type="button" class="btn btn-primary darkButton" id="submitButton">投稿</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: rgb(44, 41, 37) !important;
  border-bottom: solid 1px #444;
}

.container-fluid {
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

.createThreads {
  width: 160px;
  border-radius: 50px;
}

.code {
  border-radius: 50px;
  padding-left: 20px;
  background-color: rgb(44, 41, 37) !important;
  border: solid 1px #444;
}
</style>