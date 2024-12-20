<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import TimePicker from '@/components/molecules/TimePicker.vue';

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    required: true,
  },
});

const selectedHours = ref({});

const hours = [
  { label: "00h", value: "0" },
  { label: "01h", value: "1" },
  { label: "02h", value: "2" },
  { label: "03h", value: "3" },
  { label: "04h", value: "4" },
  { label: "05h", value: "5" },
  { label: "06h", value: "6" },
  { label: "07h", value: "7" },
  { label: "08h", value: "8" },
  { label: "09h", value: "9" },
  { label: "10h", value: "10" },
  { label: "11h", value: "11" },
  { label: "12h", value: "12" },
  { label: "13h", value: "13" },
  { label: "14h", value: "14" },
  { label: "15h", value: "15" },
  { label: "16h", value: "16" },
  { label: "17h", value: "17" },
  { label: "18h", value: "18" },
  { label: "19h", value: "19" },
  { label: "20h", value: "20" },
  { label: "21h", value: "21" },
  { label: "22h", value: "22" },
  { label: "23h", value: "23" },
];

const emit = defineEmits(['update:modelValue']);

const includeHour = (hour: any) => {
  return selectedHours.value[hour.value];
};

const clickHour = (hour: any) => {
  if (!includeHour(hour)) selectedHours.value[hour.value] = true;
  else selectedHours.value[hour.value] = false;

  emit("update:modelValue", selectedHours.value);
};

</script>

<template>
  <v-row class="time-select">
    <span class="time-select__label-bold">Horas de Disparo</span>
    <div class="d-flex flex-wrap">
      <template v-for="(hour, index) in hours" :key="index">
        <div @click="clickHour(hour)" class="time-select__hour-container" :class="{
          'time-select__hour-selected': includeHour(hour),
        }">
          <span>{{ hour.label }}</span>
        </div>
      </template>
    </div>
  </v-row>
</template>

<style lang="scss">
.time-select {
  &__label {
    display: flex;
    gap: toRem(11px);
    font-size: toRem(16px);
    line-height: toRem(15px);
    color: #a1a1a1;
    margin-bottom: toRem(5px);
  }

  &__label-bold {
    display: flex;
    gap: toRem(11px);
    font-size: toRem(16px);
    line-height: toRem(15px);
    color: #a1a1a1;
    margin-bottom: toRem(5px);
  }

  &__days {
    margin-top: toRem(10px);
  }

  &__hour-container {
    margin: toRem(2px) toRem(15px);

    &:first-child {
      // margin-left: 0;
    }

    >span {
      color: #a1a1a1;
      border: 2px solid #a1a1a1;
      border-radius: 50%;
      width: toRem(20px);
      height: toRem(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: toRem(15px);
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  &__hour-selected {
    >span {
      background-color: #5888cd;
      border-color: #5888cd;
      color: white;
    }
  }
}
</style>
