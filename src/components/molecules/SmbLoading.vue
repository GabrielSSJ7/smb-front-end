<script lang="ts" setup>
import { defineProps, PropType } from 'vue';

type SkeletonType = 'card' | 'paragraph' | 'list-item-avatar' | 'article' | 'table';

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  typeLoading: {
    type: String,
    default: 'skeleton',
  },
  skeletonType: {
    type: String as PropType<SkeletonType>,
    required: false,
    default: 'card',
  },
});
</script>

<style lang="scss">
.smb-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 150px !important;
  min-height: 100px;
  height: 100%;

  &__loader {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <v-container class="smb-loading">
    <template v-if="typeLoading === 'skeleton' && loading">
      <v-skeleton-loader class="smb-loading__loader" :type="skeletonType"></v-skeleton-loader>
    </template>

    <template v-if="typeLoading === 'progress' && loading">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
    </template>
  </v-container>
</template>
