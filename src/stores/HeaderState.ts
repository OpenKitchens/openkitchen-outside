import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const isHomeViewing = ref(false)
  const isBookmarkViewing = ref(false)
  const isChatViewing = ref(false)
  const isBellViewing = ref(false)

  return { isHomeViewing, isBookmarkViewing, isChatViewing, isBellViewing }
})