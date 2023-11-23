// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AuthorizationPage from "@/components/AuthorizationPage.vue";
import RegistrationPage from "@/components/RegistrationPage.vue";
import ProfilePage from "@/components/ProfilePage.vue";
import StatisticsPage from "@/components/StatisticsPage.vue"
import RecommendationPage from "@/components/RecommendationPage.vue";
import TreePage from "@/components/TreePage.vue";
import VisualizeTreePage from "@/components/VisualizeTreePage.vue";

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
    component: StatisticsPage
  },
  {
    path: '/recommendation',
    component: RecommendationPage
  },
  {
    path: '/myTree',
    component: TreePage
  },
  {
    path: '/VisualizeTree',
    component: VisualizeTreePage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
