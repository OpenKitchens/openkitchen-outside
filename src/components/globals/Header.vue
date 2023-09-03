<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';

const pages = ref("home")
const socketReady = ref(false);

const router = useRouter();

const onPagesChange = (page) => {
  pages.value = page
  router.push({ name: page });
}

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


const formData = {
  title: "",
  headerImage: "",
  selectedServer: "",
  message: ""
};

const isTitleValid = ref(true);
const isServerSelected = ref(true);
const isMessageValid = ref(true);

const submitForm = () => {
  isTitleValid.value = formData.title !== "";
  isServerSelected.value = formData.selectedServer !== "";
  isMessageValid.value = formData.message !== "";

  if (isTitleValid.value && isServerSelected.value && isMessageValid.value) {

    console.log("接続先サーバー" + formData.selectedServer)
    //client鯖と通信する用
    //@ts-ignore
    fetch(localStorage.getItem('websocket'), {
      method: 'POST', // POSTリクエストを指定
      headers: {
        'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
      },
      body: JSON.stringify(
        {
          type: { threadPost: true },
          title: formData.title,
          headerImage: formData.headerImage,
          message: formData.message,
          socket: formData.selectedServer
        }
      ) // POSTデータをJSON形式に変換して指定
    }).then(response => response.json())
      .then(data => {
        router.push('/thread?=' + data.data + '&' + localStorage.getItem('websocket'))
      })
      .catch(error => {
        console.error('エラーが発生しました:', error);
      });
  } else {
    event.preventDefault();
    event.stopPropagation();
  }

  const form = event.currentTarget;
  form.classList.add("was-validated");
};

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
  <div class="modal fade" id="threadPOST" tabindex="-1" aria-labelledby="threadPOSTLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="threadPOSTLabel">スレッドを投稿</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="row g-3 needs-validation" @submit.prevent="submitForm" novalidate>
            <div class="mb-3">
              <label for="title" class="col-form-label">Title</label>
              <input v-model="formData.title" type="text" class="form-control" id="title" required />
              <div class="invalid-feedback" v-if="!isTitleValid">
                タイトルを入力してください。
              </div>
              <div class="valid-feedback">
                OK!
              </div>
            </div>

            <div class="mb-3">
              <label for="headerImage" class="col-form-label">ヘッダー画像</label>
              <input v-model="formData.headerImage" type="text" class="form-control" id="headerImage" />
            </div>

            <div class="mb-3">
              <label class="serverSelect" for="serverSelect">Server</label>
              <select v-model="formData.selectedServer" class="form-control" id="serverSelect" required>
                <option selected disabled value="">サーバーを選択してください</option>
                <option v-for="server in UI.servers" :key="server.title" :value="server.socket">{{ server.emoji }} {{
                  server.title }}</option>
              </select>


              <div class="invalid-feedback" v-if="!isServerSelected">
                Serverを選択してください。
              </div>
              <div class="valid-feedback">
                OK!
              </div>
            </div>

            <div class="mb-3">
              <label for="messageField" class="col-form-label">メッセージ</label>
              <textarea v-model="formData.message" class="form-control" id="messageField" required></textarea>
              <div class="invalid-feedback" v-if="!isMessageValid">
                メッセージを入力してください。
              </div>
              <div class="valid-feedback">
                OK!
              </div>
            </div>
            <div class="col-12">
              <button data-bs-dismiss="modal" class="btn btn-primary" type="submit" style="width: 100%;">スレッドを投稿</button>
            </div>
          </form>
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
  width: 16px;
}

.createThreads {
  width: 170px !important;
  border-radius: 50px;
}

.code {
  border-radius: 50px;
  padding-left: 20px;
  background-color: rgb(44, 41, 37) !important;
  border: solid 1px #444;
}
</style>
