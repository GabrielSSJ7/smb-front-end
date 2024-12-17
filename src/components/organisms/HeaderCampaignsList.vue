<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const items = ref([
  'Todas',
  'Ativas',
  'Pausadas',
  'Enviando',
  'Enviadas',
]);

const filterSelected = ref<string>('Todas');

const emit = defineEmits(['onFilterChange']);

watch(filterSelected, (newValue) => {
  if (newValue === 'Todas') {
    return emit('onFilterChange', '');
  }
  emit('onFilterChange', newValue);
});
</script>

<style lang="scss">
.header-campaigns-list {
  &__select-container {
    .v-input__control {
      height: toRem(50px);
      .v-field {
        box-shadow: none !important;
        &__input {
          // padding-top: toRem(8px);
          margin-top: toRem(5px);
        }
      }
    }
  }
}
</style>

<template>
  <v-row class="header-campaigns-list pt-5" justify="space-between" align="center">
    <!-- <v-col cols="9" class="text-h5">
    <v-text-field label="Buscar campanhas" variant="outlined" class="header-campaigns-list__input">
            <template v-slot:prepend-inner>
              <v-icon>
                mdi-magnify
              </v-icon>
            </template>
    </v-text-field>
    </v-col> -->

    <v-col cols="3" class="text-h5">
      <div>
        <v-select
          v-model="filterSelected"
          class="header-campaigns-list__select-container" label="Filtrar por" variant="solo" chips
          :items="items" density="compact"></v-select>
      </div>
    </v-col>

    <v-col cols="3">
      <router-link to="/campanhas/nova-campanha">
        <v-btn class="w-100" color="primary" prepend-icon="mdi-plus">Nova campanha</v-btn>
      </router-link>
    </v-col>
  </v-row>
</template>
