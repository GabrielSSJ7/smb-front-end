<template>
  <div class="smb-select-button">
    <v-btn :color="color" :variant="variant" class="smb-select-button__label-btn text-body-2 font-weight-bold" :class="`color-${color}`"
      @click="callbackButton">
      {{ label }}
    </v-btn>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn :color="color" v-bind="props" :variant="variant" :append-icon="icon"
          class="smb-select-button__menu-btn text-body-2 font-weight-bold" :class="`color-${color}`">
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in props.items" :key="index" :value="index">
          <v-list-item-title @click="item.callback" class="text-body-2">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

interface Item {
  title: string;
  callback: () => void;
};

export type Variant = 'elevated' | 'flat' | 'outlined' | 'text' | 'tonal' | 'plain';

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  callbackButton: {
    type: Function as PropType<() => void>,
  },
  label: {
    type: String,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
    default: 'mdi-chevron-down',
  },
  variant: {
    type: String as unknown as PropType<Variant>,
    default: 'elevated',
  },
});
</script>

<style lang="scss">
.smb-select-button {

  &__label-btn {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-right: none !important;

    &--primary {
      color: white !important;
    }

  }

  &__menu-btn {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-left: none !important;

    min-width: 0 !important;
    width: 32px !important;

    .v-btn {
      &__append {
        margin-inline: 0 !important;
      }
    }
  }

  .v-btn {
    &__append {
      margin-inline: 0 !important;
    }

    &.color-primary {
      color: white !important;
    }
  }
}
</style>
