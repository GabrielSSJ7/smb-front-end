<template>
  <v-col class="recurrent-timer-weekdays mt-5">
    <div class="recurrent-timer-weekdays__label-bold text-uppercase">Dias da semana:</div>

    <div class="recurrent-timer-weekdays__days d-flex">
      <template v-for="(day, index) in days" :key="index">
        <div
          @click="clickDay(day)"
          class="recurrent-timer-weekdays__day-container"
          :class="{
            'recurrent-timer-weekdays__day-selected': includeDay(day),
          }"
        >
          <span>{{ day.label }}</span>
        </div>
      </template>
    </div>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "Weekdays",
  emits: ["changeData"],
  props: {
    weeklyRules: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const selectedDays = ref<any>({
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    });

    const days = [
      { label: "D", value: "sunday" },
      { label: "S", value: "monday" },
      { label: "T", value: "tuesday" },
      { label: "Q", value: "wednesday" },
      { label: "Q", value: "thursday" },
      { label: "S", value: "friday" },
      { label: "S", value: "saturday" },
    ];

    const includeDay = (day: any) => {
      return selectedDays.value[day.value];
    };

    const clickDay = (day: any) => {
      if (!includeDay(day)) selectedDays.value[day.value] = true;
      else selectedDays.value[day.value] = false;

      emit("changeData", selectedDays.value);
    };

    onMounted(() => {
      if (props.weeklyRules) selectedDays.value = props.weeklyRules;
    });

    return {
      selectedDays,
      days,
      includeDay,
      clickDay,
    };
  },
});
</script>

<style lang="scss">
.recurrent-timer-weekdays {
  padding: 0;
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

  &__day-container {
    margin: 0 toRem(15px);
    &:first-child {
      margin-left: 0;
    }

    > span {
      color: #a1a1a1;
      border: 2px solid #a1a1a1;
      border-radius: 50%;
      width: toRem(20px);
      height: toRem(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: toRem(12px);
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  &__day-selected {
    > span {
      background-color: #5888cd;
      border-color: #5888cd;
      color: white;
    }
  }
}
</style>

