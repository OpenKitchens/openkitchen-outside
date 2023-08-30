<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps<{
  myName: string;
  myHash: string;
  myHeader: string;
  myIcon: string;
  myBio: string;
  servers: { emoji: string; title: string; badge: string, socket: string }[];
  friends: { title: string; image: string }[];
}>();

const serverSocket = ref("")
const title = ref("サーバに参加しあの頃へ行きましょう")
const subTitle = ref("サーバに参加しあの頃へ行きましょう")

function join() {

  //@ts-ignore
  fetch(localStorage.getItem('websocket'), {
    method: 'POST', // POSTリクエストを指定
    headers: {
      'Content-Type': 'application/json' // リクエストのコンテンツタイプを指定
    },
    body: JSON.stringify(
      {
        type: { addServer: true },
        socket: serverSocket.value,
        temporaryId: localStorage.getItem("token")
      }
    ) // POSTデータをJSON形式に変換して指定
  })
    .catch(error => {
      console.error('エラーが発生しました:', error);
    });

  title.value = "サーバー参加の申請をしました！"
  subTitle.value = "しばらく待ってリロードしたら多分いけると思いますよ"
  //@ts-ignore
  document.getElementById("addserverlabel").style = "background-color: rgba(5, 255, 105, 0.25);"
}

const goToServer = (socket: string) => {
  console.log(socket)
  router.push({ name: 'server', query: { socket: socket } });
}
</script>

<template>
  <div class="card mt-4" style="width: calc(100% - 10px); margin: 5px">
    <img :src="myHeader" class="card-img-top" />
    <div class="card-body">
      <img :src="myIcon" class="rounded-circle user-image" />
      <div class="contents">
        <h5 class="card-title">{{ myName }}</h5>
        <p class="card-text">{{ myBio }}</p>
      </div>
    </div>
  </div>

  <div class="container mt-5">
    <div class="title">Server</div>
    <ul class="custom-list-unstyled" v-for="server in servers">
      <p @click="goToServer(server.socket)">{{ server.emoji }} {{ server.title }}</p>
    </ul>
    <div class="d-grid gap-2 mx-auto mt-3">
      <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addserver">サーバーを追加</button>
    </div>
  </div>

  <div class="modal fade" id="addserver" tabindex="-1" aria-labelledby="addserver" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 center" id="addserverlabel"
            style="margin: 0 0 0 calc(50% - 60px); font-weight: bold;">サーバーに参加</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="margin: 0;"></button>
        </div>

        <div class="description">
          <h5 class="text-center">{{ title }}</h5>
          <p class="text-center">{{ subTitle }}</p>
        </div>

        <div class="modal-body">
          <label for="exampleFormControlInput1" class="form-label">サーバーのurlを入力</label>
          <div class="input-group flex-nowrap mb-3">
            <input type="text" class="form-control" placeholder="https://server.io" aria-label="Recipient's username"
              aria-describedby="basic-addon3" v-model="serverSocket">
            <span class="input-group-text scheme-mode-disable" id="basic-addon3">@server</span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" @click="join">サーバーに参加</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-image {
  width: 75px;
  height: 75px;
  position: absolute;
  border: solid 2px rgb(16, 17, 17);
  top: calc(12vw - 35px);
}

.card-img-top {
  height: 12vw;
}

.thread-icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.contents {
  margin-top: 30px;
}

.other-icon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
}

/* Add your custom CSS styles here */
.custom-list-unstyled {
  list-style: none;
  padding-left: 0;
}

.custom-list-unstyled {
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 5px;
}

.custom-list-unstyled.active {
  background-color: rgba(0, 94, 255, 0.5) !important;
  color: #fff;
}

.custom-list-unstyled:hover {
  background-color: rgba(0, 94, 255, 0.5) !important;
  color: #fff;
}

.modal-header {
  border: none;
}

.modal-content {
  background-image: url('https://tadaup.jp/0723000629.png');
  background-size: 100%;
  height: 500px;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.5);
  color: #000 !important;
}

::placeholder {
  color: #000;
}

.input-group-text {
  background-color: rgba(255, 255, 255, 0.85);
  color: #000;
}

.description {
  margin: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 5px;
}

p {
  margin: 0;
}

.modal-dialog {
  margin-top: 10%;
  margin-bottom: 10%;
}

.modal-footer {
  border: none;
}
</style>
