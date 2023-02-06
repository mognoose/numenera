import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CampaignView from '../views/CampaignView.vue'
import CharacterView from '../views/CharacterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:id',
    name: 'CampaignView',
    component: CampaignView
  },
  {
    path: '/:id/:player',
    name: 'CharacterView',
    component: CharacterView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
