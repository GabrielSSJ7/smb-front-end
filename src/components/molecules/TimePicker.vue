<template>
  <v-col class="time-picker">
    <div class="time-picker__label-bold text-uppercase">{{ label }}</div>
    <date-picker 
      v-model:value="time" 
      value-type="format" 
      type="time" 
      :format="format" 
      :show-hour="showHour" 
      :show-minute="showMinute" 
      :disabled="disabled"
      :default-value="new Date()" 
      :disabled-time="minTime"
    ></date-picker>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";

export default defineComponent({
  name: "TimePicker",
  emits: ["dataChange"],
  props: {
    dataTime: {
      type: String,
    },
    minDate: {
      type: Date,
    },
    is24hr: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Selecione o horário: ",
    },
    format: {
      type: String,
      default: "HH:mm",
    },
    showHour: {
      type: Boolean,
      default: true,
    },
    showMinute: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const time = ref<string>("");

    const minTime = (date: Date) => {
      if (props.minDate) {
        let minDate = new Date(props.minDate);
        minDate.setMinutes(minDate.getMinutes());
        minDate.setSeconds(0);
        minDate.setMilliseconds(0);

        return date < minDate;
      }

      return false;
    };

    const setDataTime = () => {
      if (props.dataTime) {
        const [hours, minutes] = props.dataTime.split(":").map(Number);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        time.value = `${formattedHours}:${formattedMinutes}`;
      }
    };

    watch(
      () => props.dataTime,
      () => {
        setDataTime();
      }
    );

    watch(time, (newTime) => {
      emit("dataChange", newTime);
    });

    watch(
      () => props.minDate,
      (newDateTime) => {
        if (!newDateTime || !time.value) return;

        const [hours, minutes] = time.value.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes);

        if (date < newDateTime) time.value = "";
      }
    );

    onMounted(() => {
      setDataTime();
    });

    return {
      time,
      minTime,
    };
  },
});
</script>

<style lang="scss">
.vc-time-date {
  display: none;
}

.time-picker {
  &__label-bold {
    display: flex;
    gap: toRem(11px);
    font-size: toRem(16px);
    line-height: toRem(15px);
    color: #a1a1a1;
    margin-bottom: toRem(5px);
  }
}
</style>
