<script lang="ts" setup>
import SideMenu from '@/components/organisms/SideMenu.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFeedbackStore } from './common/store/useFeedbackStore';

const route = useRoute();
const store = useFeedbackStore();

const embeddedIframe = computed(() => {
  if (route.meta.iframe) return true;

  return false;
});
</script>
<style lang="scss">
.smb {
  min-height: 100vh;

  &__main {
    position: relative;
    flex: 1 0 auto;
    background-color: #f1f2f6;
    transition: all 2s ease;

    &::before {
      position: fixed;
      content: "";
      height: 45vh;
      width: 100%;
      background: linear-gradient(180deg, transparent 0%, transparent 100%);
      z-index: -2;
    }

    &.padding-bottom {
      padding-bottom: toRem(100px);
    }
  }
}
</style>
<template>
  <v-theme-provider>
    <div class="smb d-flex align-items-stretch">
      <main class="smb__main d-flex w-100">
        <side-menu />
        <router-view v-slot="{ Component, route }">
          <transition name="fade-in-up">
            <section :key="route.name ? route.matched[0].name : route.name" class="flex-fill">
              <div class="smb__section" :class="[embeddedIframe ? '' : ['nave-c-px-4', 'container']]">
                <component :is="Component"></component>
              </div>
            </section>
          </transition>
        </router-view>
      </main>
    </div>

   <v-snackbar v-model="store.snackbackError.show" color="error" top>
      {{ store.snackbackError.message }}
   </v-snackbar>

   <v-snackbar :timeout="2000" color="success" v-model="store.snackbackSuccess.show">
      {{ store.snackbackSuccess.message }}
   </v-snackbar>

  </v-theme-provider>
</template>
