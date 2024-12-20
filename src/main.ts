import { createApp } from 'vue'
import './style.css'

import App from './App.vue'

const app = createApp(App);

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { en, pt } from 'vuetify/locale'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VStepperVertical, VStepperVerticalItem, VStepperVerticalActions } from 'vuetify/labs/VStepperVertical'
import { VDateInput } from 'vuetify/labs/VDateInput'
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
  components: {
    ...components,
    VStepperVertical,
    VStepperVerticalItem,
    VStepperVerticalActions,
    VDateInput,
  },
  directives,
  locale: {
    locale: 'pt',
    messages: { pt, en }
  },
  icons: {
    defaultSet: 'mdi',
  },
})

const pinia = createPinia()

import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/pt-br";
import DatePicker from "vue-datepicker-next";

app.component("date-picker", DatePicker);

app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(beeFreePlugin)
app.mount('#app')
