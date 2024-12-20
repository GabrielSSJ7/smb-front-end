<template>
  <div>
      <!-- Summary Display -->
      <v-row>
        <v-col cols="8">
          <!-- Date and Time Pickers -->
          <v-row>
            <v-col>
              <v-date-input v-model="startDate" label="Começa em" variant="outlined" locale="pt-br"></v-date-input>
            </v-col>
            <v-col>
              <v-date-input v-model="endDate" label="Termina em" variant="outlined" required locale="pt-br"></v-date-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <span class="text-body-1 font-weight-bold">Todo Mês:</span>
              <v-row>
                <v-checkbox 
                  v-model="selectedMonths"
                  v-for="month in monthsOfYear"
                  :key="month.label"
                  :label="month.label"
                  :value="month.value"
                ></v-checkbox>
              </v-row>
            </v-col>
          </v-row>

          <!-- Day of the Week Selector -->
          <v-row>
            <v-col>
              <span class="text-body-1 font-weight-bold">Dias da Semana</span>
              <v-row>
                <v-checkbox v-for="day in daysOfWeek" :key="day.value" :label="day.label" v-model="selectedDays"
                  :value="day.value"></v-checkbox>
              </v-row>
            </v-col>
          </v-row>

          <!-- Recurrence Frequency Selector -->
          <v-row>
            <!-- Custom Recurrence Rules -->
            <v-col>
              <v-text-field v-model="customHours" variant="outlined"
                label="Horários (separado por vírgula)"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="customMinutes" variant="outlined"
                label="Minutos (separado por vírgula)"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title>Configurações:</v-card-title>
            <v-card-text>
              <div><span class="font-weight-bold">Começa em:</span> {{ startDateFormatted }}</div>
              <div><span class="font-weight-bold">Termina em:</span> {{ endDateFormatted }}</div>
              <div><span class="font-weight-bold">{{ monthLabel }}:</span> {{ monthLabels || timeSetupLabel }}</div>
              <div><span class="font-weight-bold">{{ weekLabel }}:</span> {{ selectedDays.map((day) => abvSelectedDays[day]).join(', ')|| timeSetupLabel }}</div>
              <div><span class="font-weight-bold">{{ hoursLabel }}:</span> {{ customHours || timeSetupLabel }}</div>
              <div><span class="font-weight-bold">{{ minutesLabel }}:</span> {{ customMinutes || timeSetupLabel }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, watch, toRef } from 'vue';
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const timeSetupLabel = ref('* * * * *');
const selectedMonths = ref<string[]>([]);
const monthsOfYear = ref([
  { label: 'Janeiro', value: '1', abv: 'Jan' },
  { label: 'Fevereiro', value: '2', abv: 'Fev' },
  { label: 'Março', value: '3', abv: 'Mar' },
  { label: 'Abril', value: '4', abv: 'Abr' },
  { label: 'Maio', value: '5', abv: 'Mai' },
  { label: 'Junho', value: '6', abv: 'Jun' },
  { label: 'Julho', value: '7', abv: 'Jul' },
  { label: 'Agosto', value: '8', abv: 'Ago' },
  { label: 'Setembro', value: '9', abv: 'Set' },
  { label: 'Outubro', value: '10', abv: 'Out' },
  { label: 'Novembro', value: '11', abv: 'Nov' },
  { label: 'Dezembro', value: '12', abv: 'Dez' }
]);
const daysOfWeek = ref([
  { label: 'Segunda', value: '1', abv: 'Seg' },
  { label: 'Terça', value: '2', abv: 'Ter' },
  { label: 'Quarta', value: '3', abv: 'Qua' },
  { label: 'Quinta', value: '4', abv: 'Qui' },
  { label: 'Sexta', value: '5', abv: 'Sex' },
  { label: 'Sábado', value: '6', abv: 'Sáb' },
  { label: 'Domingo', value: '7', abv: 'Dom' }
]);
const selectedDays = ref<string[]>([]);
const abvSelectedDays = ref<{[key:string]: string }>({
  '1': 'Seg',
  '2': 'Ter',
  '3': 'Qua',
  '4': 'Qui',
  '5': 'Sex',
  '6': 'Sáb',
  '7': 'Dom'
});
const customHours = ref('');
const customMinutes = ref('');

const hoursLabel = computed(() => (customHours.value.length > 1 ? 'Nas horas' : 'Na hora'));
const minutesLabel = computed(() => (customMinutes.value.length > 1 ? 'Nos minutos' : 'No minuto'));

const monthLabel = computed(() => {
  if (selectedMonths.value.length > 1) return 'Nos meses';
  if (selectedMonths.value.length === 1) return 'No mês';
  return 'No mês';
});

const monthLabels = computed(() =>
  selectedMonths.value.map(month => monthsOfYear.value.find(m => m.value === month)?.abv).join(', ')
);

const weekLabel = computed(() => {
  if (selectedDays.value.length > 1) return 'Nos dias';
  if (selectedDays.value.length === 1) return 'No dia';
  return 'No dia';
});

const formatDate = (date: Date | null) => {
  if (!date) return '';
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const startDateFormatted = computed(() => formatDate(startDate.value));
const endDateFormatted = computed(() => formatDate(endDate.value));

const props = defineProps({
  modelValue: {
    type: Object as () => {
      startDate: Date | null;
      endDate: Date | null;
      selectedMonths: string[];
      selectedDays: string[];
      customHours: string;
      customMinutes: string;
    },
    required: true,
    default: () => ({
      startDate: null,
      endDate: null,
      selectedMonths: [],
      selectedDays: [],
      customHours: '',
      customMinutes: ''
    })
  }
});

const emit = defineEmits(['update:modelValue']);

const modelValue = toRef(props, 'modelValue');


watch([startDate, endDate, selectedMonths, selectedDays, customHours, customMinutes], () => {
  emit('update:modelValue', {
    startDate: startDate.value,
    endDate: endDate.value,
    selectedMonths: selectedMonths.value,
    selectedDays: selectedDays.value,
    customHours: customHours.value,
    customMinutes: customMinutes.value
  });
}, { deep: true });

watch(modelValue, (value) => {
  startDate.value = value.startDate;
  endDate.value = value.endDate;
  selectedMonths.value = value.selectedMonths;
  selectedDays.value = value.selectedDays;
  customHours.value = value.customHours;
  customMinutes.value = value.customMinutes;
}, { immediate: true });
</script>
