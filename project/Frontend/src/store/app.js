// Utilities
import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('app',() => {
  const userId = ref(localStorage.getItem('userId'))
  const serverPort = '8081'
  const domain = '127.0.0.1'
  return {
    userId,
    serverPort,
    domain
  }
})
