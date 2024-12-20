<script lang="ts" setup>
import CardTotalProfiles from '@/components/molecules/campaign/CardTotalProfiles.vue';
import PickChannel from '@/components/organisms/campaign/PickChannel.vue';
import FormCampaign from '@/components/organisms/campaign/FormCampaign.vue';
import { useCampaignStore } from '@/common/store/useCampaignStore';

const store = useCampaignStore();

</script>

<template>
  <section class="mt-15" id="profile-and-pick-channel" v-if="!store.campaign.channel">
    <card-total-profiles />
    <pick-channel />
  </section>

  <section id="create-campaign" v-else>
    <form-campaign />
  </section>
</template>

<style scoped>

</style>
