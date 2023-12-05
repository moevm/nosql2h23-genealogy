// Utilities
import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('app',() => {
  const userId = ref(localStorage.getItem('userId'))
  const serverPort = '8081'
  return {
    userId,
    serverPort
  }
})
