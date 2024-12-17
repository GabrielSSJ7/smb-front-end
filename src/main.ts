import { createApp } from 'vue'
import './style.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import { router } from '@/router'

import BeePlugin from "@mailupinc/bee-plugin";

import "@/assets/bee.css";

const beeFree = new BeePlugin();

const beeFreePlugin = {
  install(app: any) {
    app.config.globalProperties.$beeFree = beeFree;
    app.provide("$beeFree", beeFree);
  },
};

import { createPinia } from 'pinia'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const pinia = createPinia()

import App from './App.vue'

const app = createApp(App);

app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(beeFreePlugin)
app.mount('#app')
