import { defineStore } from 'pinia';

export const useCampaignStore = defineStore('campaign-store', {
  state: () => ({
    campaign: {
      channel: '',
    },
  }),
  actions: {},
});
