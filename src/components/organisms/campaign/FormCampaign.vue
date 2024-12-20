<script setup lang="ts">
import { useCampaignStore } from '@/common/store/useCampaignStore';
import FormEmail from '@/components/organisms/channel/email/FormEmail.vue';
import { ChannelsEnum } from '@/common/enums/channelsEnum';

const store = useCampaignStore();

const changeChannel = () => {
  store.campaign.channel = '';
};
</script>

<template>
  <div>
    <form-email v-if="store.campaign.channel == ChannelsEnum.EMAIL" />
  </div>
</template>
