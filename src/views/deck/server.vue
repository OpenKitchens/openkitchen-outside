<script setup>
import { ref } from "vue"

const query = ref(window.location.search)
</script>

<template>
  <div>
    <p>クエリパラメータ: {{ query }}</p>
  </div>
</template>