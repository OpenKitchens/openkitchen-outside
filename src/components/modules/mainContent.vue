<script setup lang="ts">
defineProps<{
  topThread: {
    background: string;
    icon: string;
    user: string;
    title: string;
    serverEmoji: string;
    server: string;
  };
  threadList: {
    title: string;
    user: string;
    icon: string;
    serverEmoji: string;
    server: string;
    link: string;
    badge: number;
  }[];
}>();
</script>

<template>
  <div class="container mt-4">
    <div class="card">
      <img :src="topThread.background" class="card-img-top" style="object-fit: cover; height: 300px;" alt="Sample Image">
      <div class="card-body">
        <h5 class="card-title" style="font-size: 27px;">{{ topThread.title }}</h5>
        <p class="card-text"></p>
        <div class="d-flex align-items-center">
          <img :src="topThread.icon" class="rounded-circle me-2 author-icon" alt="User Avatar">
          <span class="fw-bold">{{ topThread.user }}</span>
        </div>
      </div>
      <div class="card-footer">
        <small class="text-muted">{{ topThread.serverEmoji }} {{ topThread.server }}</small>
        <button class="btn btn-outline-light btn-sm ms-2">サーバに追加</button>
        <button class="btn btn-sm ms-2"><img src="@/components/icons/reply.svg" class="icons"></button>
      </div>
    </div>
  </div>


  <div class="container mt-3" v-for="thread in threadList">
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center thread-author">
          <img :src="thread.icon" class="rounded-circle me-2 author-icon" alt="User Avatar">
          <span class="fw-bold author-name">{{ thread.user }}</span>
        </div>
        <h5 class="card-title card-title-small" style="font-size: 1.25rem;">{{ thread.title }}</h5>
      </div>
      <div class="card-footer">
        <small class="text-muted">{{ thread.serverEmoji }} {{ thread.server }}</small>
        <a href="#" class="btn btn-outline-light btn-sm ms-2">サーバに追加</a>
        <a href="#" class="btn btn-sm ms-2"><img src="@/components/icons/reply.svg" class="icons" alt="Reply Icon"></a>
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
}

.card-title-small {
  padding: 10px 20px;
  margin: 0;
}
</style>