import { defineStore } from 'pinia';

export const useCampaignStore = defineStore('campaign-store', {
  state: () => ({
    campaign: {
      channel: '',
      channel_id: '',
      type: '',
    },
  }),
  actions: {
    resetCampaign() {
      this.campaign = {
        channel: '',
        channel_id: '',
        type: '',
      };
    }
  },
});
