<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ChannelService, { Channel } from '@/common/services/channelService';

const channels = ref<Channel[]>([]);

interface ChannelTypeDictionary {
  [key: string]: {
    image: string
  }
};
const channelTypeDictionary: ChannelTypeDictionary = {
  sms: {
    image: '',
  },
  email: {
    image: '',
  }
};

onMounted(async () => {
  channels.value = await ChannelService.getChannels();
});
</script>

<template>
  <div class="mt-10">
    
  </div>
</template>

<style scoped>
</style>
