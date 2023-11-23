// Utilities
import { defineStore } from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('app',() => {
  const userId = ref('4:3a60676e-a8e6-488e-8033-bd8204f859b7:5')
  return {
    userId
  }
})
