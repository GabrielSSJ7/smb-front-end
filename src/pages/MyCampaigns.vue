<script lang="ts" setup>
import BreadCrumb from "@/components/molecules/BreadCrumb.vue";
import CampaignsListTemplate from "@/components/templates/CampaignsListTemplate.vue";
</script>

<style lang="scss" scoped>
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
      <p class="text-h5">Lista de Campanhas</p>
      <p class="text-body-2">Gerencie todas as suas campanhas criadas.</p>
    </div>
    <div class="smb-campaigns-list__content">
      <campaigns-list-template></campaigns-list-template>
    </div>
  </div>
</template>
