<script lang="ts" setup>
import { ref } from 'vue';
import CardTotalProfiles from '@/components/molecules/campaign/CardTotalProfiles.vue';
import PickChannel from '@/components/organisms/campaign/PickChannel.vue';

</script>

<template>
  <div>
    <card-total-profiles />
  </div>

  <div class="mt-10">
    <pick-channel />
  </div>
</template>

<style scoped>

</style>
