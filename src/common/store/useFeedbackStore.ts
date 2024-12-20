import { defineStore } from 'pinia';

export const useFeedbackStore = defineStore('feedback-store', {
  state: () => ({
    snackbackError: {
      show: false,
      message: '',
    },
    snackbackSuccess: {
      show: false,
      message: '',
    },
  }),
  actions: {
    showSnackbackError(message: string) {
      this.snackbackError.show = true;
      this.snackbackError.message = message;
    },
    showSnackbackSuccess(message: string) {
      this.snackbackSuccess.show = true;
      this.snackbackSuccess.message = message;
    },
    hideSnackbackError() {
      this.snackbackError.show = false;
    },
    hideSnackbackSuccess() {
      this.snackbackSuccess.show = false;
    },
  },
});
