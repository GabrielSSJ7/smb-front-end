<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: {
    type: String,
  },
  icon: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue']);

const handleClick = () => {
  emits('update:modelValue', !props.modelValue);
};
</script>

<style lang="scss">
.smb-button-check {
  padding: 0.5em 1em;
  cursor: pointer;
  transition: background-color 300ms;
  min-width: 200px;
  max-width: 300px;

  &:hover {
    background-color: #f5f5f5;
  }

  &__checked {
    background-color: #343434;

    &:hover {
      background-color: #343434;
      opacity: 0.8;
      transition: 300ms;
    }
  }

  &__label_checked {
    color: white;
  }
}
</style>

<template>
  <div class="smb-button-check border rounded" :class="{ 'smb-button-check__checked': modelValue }"
    @click="handleClick">
    <v-row>
      <v-col cols="2" :class="{ 'smb-button-check__label_checked': modelValue }">
        <v-icon>{{ icon }}</v-icon>
      </v-col>
      <v-col cols="10" class="text-body-2" align-self="center" :class="{ 'smb-button-check__label_checked': modelValue }">
        <span>{{ label }}</span>
      </v-col>
    </v-row>
  </div>
</template>
