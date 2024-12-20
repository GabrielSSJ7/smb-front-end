<script lang="ts" setup>
import BreadCrumb from '@/components/molecules/BreadCrumb.vue';
import CreateCampaignTemplate from '@/components/templates/CreateCampaignTemplate.vue';
import { onUnmounted } from 'vue';
import { useCampaignStore } from '@/common/store/useCampaignStore';

const store = useCampaignStore();

onUnmounted(() => {
  store.resetCampaign();
});
</script>
<style lang="scss">
.smb-campaigns-list {
  &__container {
    background-color: #fff;
  }
}
</style>
<template>
  <div class="smb-campaigns-list">
    <div class="px-5 smb-campaigns-list__container">
      <BreadCrumb />
      <p class="text-h5">Nova Campanha</p>
      <p class="text-body-2 pb-5">Crie novas campanhas inteligentes</p>
    </div>
    <div class="smb-campaigns-list__content">
      <create-campaign-template></create-campaign-template>
    </div>
  </div>
</template>
