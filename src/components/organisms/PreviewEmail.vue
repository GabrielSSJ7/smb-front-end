<script lang="ts" setup>
import { defineEmits } from 'vue';
import PreviewEmailSvg from '@/assets/img/campaign-target-preview.svg';

const emits = defineEmits(['click']);
</script>
<style lang="scss">
.smb-preview-email {
  &__inside-card {
    background-color: #f6f7fb;
    cursor: pointer;
  }
}
</style>
<template>
  <v-container class="smb-preview-email border-dotted border-thin ma-10 pa-5">
    <v-row class="smb-preview-email__inside-card" @click="emits('click')">
      <v-col cols="12" class="text-center">
        <img :src="PreviewEmailSvg" alt="Preview Email" />
      </v-col>
    </v-row>
  </v-container>
</template>
