// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from "@/components/AuthorizationPage.vue";
import RegistrationPage from "@/components/RegistrationPage.vue";

const routes = [
  {
    path: '/',
    component: AuthorizationPage,
  },
  {
    path: '/registration',
    component: RegistrationPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
