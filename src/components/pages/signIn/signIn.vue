<script setup>
import { ref } from 'vue'

const currentCardIndex = ref(0);
const websocket = ref("")
const username = ref("")
const password = ref("")
const serverIconImage = ref("")
const serverIcon = ref("")
const servername = ref("")
const myIconImage = ref("")
const myHeaderImage = ref("")
const serverInformation = ref("")
const myBio = ref("")

const cards = [
  { title: 'さぁ冒険に出よう', text: 'Client鯖はどこですか？Client鯖のwebsocketを入力してください' },
  { title: 'これが本当に君の鯖？', text: 'Client鯖にコールしています' },
  { title: '夏のあの日を思い出して', text: 'ユーザー名とパスワードを入力してアカウントを作成してください' },
  { title: 'もう少しアナタの過去を探索します', text: 'プロフィールでアナタについて教えてください' },
  { title: '自分だけのサーバーを作成しましょう', text: '自分だけのコミュニティ。広大なネットの中にたったひとつの草の根を' },
  { title: 'アカウントを作成しました', text: 'ノスタルジーに逃げ込みたい。草の根WSSへようこそ' },
  // 必要に応じて追加のカードをここに追加
];

const switchNextCard = () => {
  if (currentCardIndex.value < cards.length - 1) {
    currentCardIndex.value++;
  } else {
    currentCardIndex.value = 0;
  }
};

const specialInput = ref("");

const callSocket = () => {
  console.log("callSocket");

  fetch(websocket.value, {
    method: 'POST', // POSTリクエストを指定
    headers: {
      'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
    },
    body: JSON.stringify({
      type: { connectTest: true }
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('サーバーからのメッセージ:', data);
      switchNextCard(); // 次のカードに切り替える
    })
    .catch(error => {
      console.error('エラーが発生しました:', error);
    });

  const switchNextCardAndPerformAction = () => {
    if (currentCardIndex.value === 1) {
      callSocket(); // 特別な処理を実行
    } else if (currentCardIndex.value === 4) {
      console.log("4")
      createAccount(); // 特別な処理を実行
    } else {
      switchNextCard(); // 次のカードに切り替える
    }
  };

  const callSocketAndNextCard = () => {
    callSocket(); // WebSocketを呼び出す
    switchNextCard(); // 次のカードに切り替える
  }

  const createAccount = () => {
    console.log("callSocket");

    fetch(websocket.value, {
      method: 'POST', // POSTリクエストを指定
      headers: {
        'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
      },
      body: JSON.stringify({
        type: { createAccount: true },
        username: username.value,
        password: password.value,
        socket: websocket.value,
        myIconImage: myIconImage.value,
        emoji: serverIcon.value,
        myHeaderImage: myHeaderImage.value,
        myBio: myBio.value,
        serverIconImage: serverIconImage.value,
        serverInformation: serverInformation.value,
        servername: servername.value
      })
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("token", data.data)
        switchNextCard(); // 次のカードに切り替える
      })
      .catch(error => {
        console.error('エラーが発生しました:', error);
      });
  }
}
</script>

<template>
  <div class="background" data-bs-theme="light">
    <div style="background-color: #0000003f;">
      <div class="login-container">
        <div v-for="(card, index) in cards" :key="index">
          <div class="card fadeUp" v-show="currentCardIndex === index">
            <div class="card-body">
              <h1 class="card-title text-center">{{ card.title }}</h1>
              <p class="text-center">{{ card.text }}</p>
              <div v-if="index === 0">
                <div class="input-group mb-3">
                  <input type="text" v-model="websocket" class="form-control" placeholder="https://example.com">
                </div>
                <button class="btn btn-primary w-100" type="button" @click="callSocketAndNextCard">Next</button>
              </div>
              <div v-if="index === 1">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" :placeholder="websocket">
                </div>
                <button class="btn btn-primary w-100" type="button" @click="switchNextCardAndPerformAction">Next</button>
              </div>
              <div v-if="index === 2">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="ユーザー名を入力" aria-label="Recipient's username"
                    aria-describedby="basic-addon2" v-model="username">
                  <span class="input-group-text" id="basic-addon2">@open</span>
                </div>
                <div class="mb-3">
                  <input type="password" id="password" class="form-control" v-model="password" placeholder="パスワードを入力"
                    required>
                </div>
                <button class="btn btn-primary w-100" type="button" @click="switchNextCardAndPerformAction">Next</button>
              </div>

              <div v-if="index === 3">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="myIconImage" placeholder="アイコンをurlで挿入" required>
                </div>
                <div class="mb-3">
                  <input type="text" class="form-control" v-model="myHeaderImage" placeholder="ヘッダー画像をurlで挿入" required>
                </div>
                <div class="mb-3">
                  <label for="Bio" class="form-label">Bio</label>
                  <textarea class="form-control" id="Bio" rows="3" v-model="myBio"></textarea>
                </div>
                <button class="btn btn-primary w-100" type="button" @click="switchNextCardAndPerformAction">Next</button>
              </div>

              <div v-if="index === 4">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="serverIconImage" placeholder="サーバーのヘッダーをurlで入力"
                    required>
                </div>
                <label for="serverlabel" class="form-label">サーバーの絵文字</label>
                <div class="input-group mb-3 serverlcon">
                  <input type="text" class="form-control servericonform" id="serverlabel" v-model="serverIcon"
                    maxlength="1" required>
                </div>
                <div class="input-group flex-nowrap mb-3">
                  <input type="text" class="form-control" placeholder="サーバー名を入力" aria-label="Recipient's username"
                    aria-describedby="basic-addon3" v-model="servername">
                  <span class="input-group-text scheme-mode-disable" id="basic-addon3">@server</span>
                </div>
                <div class="mb-3">
                  <label for="Bio" class="form-label">serverの概要</label>
                  <textarea class="form-control" id="Bio" rows="3" v-model="serverInformation"></textarea>
                </div>
                <button class="btn btn-primary w-100" type="button" @click="switchNextCardAndPerformAction">Next</button>
              </div>

              <div v-if="index === 5">
                <router-link to="/" class="btn btn-primary w-100" type="button">さぁ始めよう</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  background-image: url("https://tadaup.jp/0521482331.png");
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

.servericonform {
  width: 100px;
  height: 100px;
  font-size: 50px;
  text-align: center;
}

.serverlcon {
  width: 100px;
  height: 100px;
  margin: auto;
}
</style>