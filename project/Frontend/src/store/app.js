// Utilities
import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('app',() => {
  const userId = ref(localStorage.getItem('userId'))
  return {
    userId
  }
})
