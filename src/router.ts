import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import ComponentBuild from '@/pages/ComponentBuild.vue'
import MyCampaigns from '@/pages/MyCampaigns.vue'
import CreateCampaign from '@/pages/CreateCampaign.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/campanhas' },
  { path: '/campanhas', component: MyCampaigns },
  { path: '/campanhas/nova-campanha', component: CreateCampaign },
  { path: '/component/build', component: ComponentBuild },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes,
})
