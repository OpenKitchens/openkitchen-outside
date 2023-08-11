import { defineStore } from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    ui: null as any, // WebSocket データの型に合わせて調整
  }),
  actions: {
    setWebsocketData(data: any) { // WebSocket データの型に合わせて調整
      this.ui = data;
    },
  },
});