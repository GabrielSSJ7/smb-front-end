import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import MyCampaigns from '@/pages/MyCampaigns.vue'
import CreateCampaign from '@/pages/CreateCampaign.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/campanhas' },
  { path: '/campanhas', component: MyCampaigns, name: 'Campaigns' },
  { path: '/campanhas/nova-campanha', component: CreateCampaign, name: 'CreateCampaign' },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes,
})
