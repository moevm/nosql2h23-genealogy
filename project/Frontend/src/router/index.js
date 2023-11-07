// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from "@/components/AuthorizationPage.vue";
import RegistrationPage from "@/components/RegistrationPage.vue";
import ProfilePage from "@/components/ProfilePage.vue";
import StatisticsPage from "@/components/StaticsPage.vue"

const routes = [
  {
    path: '/',
    component: AuthorizationPage,
  },
  {
    path: '/registration',
    component: RegistrationPage,
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/statistics',
    component: StaticsPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
