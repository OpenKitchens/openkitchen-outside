<script setup lang="ts">
import { ref } from 'vue'

const websocket = ref("")
const username = ref("")
const password = ref("")

const login = () => {
  console.log("callSocket");
  //@ts-ignore
  fetch(websocket.value, {
    method: 'POST', // POSTリクエストを指定
    headers: {
      'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
    },
    body: JSON.stringify({
      type: { login: true },
      username: username.value,
      password: password.value
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('サーバーからのメッセージ:', data);
      localStorage.setItem("token", data);
      localStorage.setItem("websocket", websocket.value);
      window.location.href = "/"
    })
    .catch(error => {
      console.error('エラーが発生しました:', error);
    });
}

</script>

<template>
  <div class="background" data-bs-theme="light">
    <div style="background-color: #0000003f;">
      <div class="login-container">

        <div class="card fadeUp">
          <div class="card-body">
            <h1 class="card-title text-center">お帰りなさい👋</h1>
            <p class="text-center">Systemにログインしましょう</p>
            <div class="mb-3">
              <input type="text" id="password" class="form-control" v-model="websocket" placeholder="urlを入力"
                required>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="ユーザー名を入力" aria-label="Recipient's username"
                aria-describedby="basic-addon2" v-model="username">
              <span class="input-group-text" id="basic-addon2">@open</span>
            </div>
            <div class="mb-3">
              <input type="password" id="password" class="form-control" v-model="password" placeholder="パスワードを入力"
                required>
            </div>
            <button class="btn btn-primary w-100" type="button" @click="login">login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url("https://tadaup.jp/0600004861.png");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card {
  width: 500px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.75) !important;
}

.card-body {
  padding: 50px 70px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgb(13, 110, 253);
}

p {
  margin-bottom: 4rem;
}

*:focus {
  outline: none;
  box-shadow: none;
}

.fadeIn {
  animation-name: fadeInAnime;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes fadeInAnime {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeUp {
  animation-name: fadeUpAnime;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes fadeUpAnime {
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>