<script setup lang="ts">
defineProps<{
  timeLine: {
    title: string;
    headerImage: string;
    message: string;
    myIcon: string;
    uuid: string;
    myName: string;
    socket: string;
    serverSocket: string;
    serverName: string;
    serverEmoji: string;
  }[][];
}>();

</script>

<template>
  <div v-for="timeLineChild in timeLine">
    <div class="container mt-4" v-for="thread in timeLineChild">
      <div class="card">
        <img :src="thread.headerImage" class="card-img-top" style="object-fit: cover; height: 300px;" alt=""
          v-if='thread.headerImage'>
        <div class="card-body">
          <div class="d-flex align-items-center thread-author">
            <img :src="thread.myIcon" class="rounded-circle me-2 author-icon" alt="myName Avatar">
            <span class="fw-bold author-name">{{ thread.myName }}</span>
          </div>
          <h5 class="card-title card-title-small" style="font-size: 1.25rem;font-weight: bold;"><router-link :to="'/thread?='+thread.uuid+'&'+thread.socket" style="color: white">{{ thread.title }}</router-link></h5>
        </div>
        <div class="card-footer">
          <small class="text-muted">{{ thread.serverEmoji }} {{ thread.serverName }}</small>
          <a href="#" class="btn btn-outline-light btn-sm ms-2">サーバに追加</a>
          <a href="#" class="btn btn-sm ms-2"><img src="@/components/icons/reply.svg" class="icons" alt="Reply Icon"></a>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-4">
    <div class="card" v-show="!timeLine || timeLine[0] == null">
      <div class="card-body" style="background-color: rgb(75, 35, 255);border-radius:5px;border-color: rgb(75, 35, 255);">
        <img src="@/components/icons/openkitchen-dark.svg" style="width:70%; margin: 15%;">
        <h2 class="card-title">ようこそOpenKitchenへ</h2>
        <p class="card-text" style="padding: 15px 30px;">完全分散型の日本製BBS<br>ノスタルジーをモダンに再解釈してまた会いましょう</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icons {
  width: 1.7em;
  height: 1.7em;
  filter: invert(100%);
}

.thread-author {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.author-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.author-name {
  font-size: 1rem;
  font-weight: 500;
}

.card-title {
  padding: 15px 30px;
  margin: 0;
}

.card-title-small {
  padding: 10px 20px;
  margin: 0;
}
@media screen and (max-width: 480px) {
  .card-img-top{
    height: 200px !important;
  }
  h5 {
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
  }
}
</style>