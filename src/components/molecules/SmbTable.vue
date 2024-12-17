<script setup lang="ts">
import { ref, defineProps, PropType, toRef, defineEmits, watch } from 'vue';
import SmbButtonSelect, { Variant } from '@/components/molecules/SmbButtonSelect.vue';

export interface Column {
  text: string;
  key?: string; // Optional since not all columns have keys
  icon?: string;
}

export interface ActionOption {
  title: string;
  callback: () => void;
}

export interface RowAction {
  text: string;
  actionLabel: string;
  actionIcon: string;
  actionColor: string;
  actionVariant: string;
  actionOptions: ActionOption[];
  actionCallbackButton: () => void;
}

export interface Row {
  name: string;
  text?: string;
  icon?: string;
  status?: string;
  date?: string;
  action?: RowAction;
}

const props = defineProps({
  columns: {
    type: Array as PropType<Column[]>,
    required: true,
  },
  rows: {
    type: Array as PropType<Row[]>,
    required: true,
  },
  page: {
    type: Number,
    default: 1,
  },
  length: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['pagination:change']);

const currentPage = toRef(props.page);

watch(currentPage, (newValue) => {
  emit('pagination:change', newValue);
});
</script>

<style lang="scss">
.smb-table {
  &__td-text-icon {
    margin-left: toRem(1px) !important;

    >i {
      color: #343434;
    }
  }

  td {
    text-align: left !important;

    .smb-table-status {
      padding: 0.5em 1em;
      border-radius: 4px;
      color: white;
      display: inline-block;
      font-size: 0.675rem;
      font-weight: 500;
      line-height: 1.75;
      text-align: center;
      text-transform: uppercase;
      opacity: 0.8;
    }

    .smb-table-status-Ativo {
      background-color: #1976d2 !important;
      color: white !important;
    }

    .smb-table-status-Pausada {
      background-color: #f44336 !important;
      color: white !important;
    }
  }

  .smb-select-button__label-btn {
    font-size: toRem(12px) !important;
    max-width: 65px;
  }

}
</style>

<template>
  <v-table class="smb-table">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index" class="text-left font-weight-bold">
          <span>{{ column.text }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          <div v-if="column.key">
            <div v-if="column.key === 'status'">
              <div :class="`smb-table-status smb-table-status-${row[column.key]}`">
                <span>{{ row[column.key] }}</span>
              </div>
            </div>
            <div v-else-if="column.key === 'action'">
              <smb-button-select :items="row[column.key]?.actionOptions || []" :label="row[column.key]?.actionLabel"
                :icon="row[column.key]?.actionIcon" :variant="row[column.key]?.actionVariant as Variant"
                :color="row[column.key]?.actionColor" :callback-button="row[column.key]?.actionCallbackButton" />
            </div>
            <div v-else>
              <v-icon v-if="column.icon">{{ column.icon }}</v-icon> <span>{{ row[column.key] }}</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div class="d-flex w-100 justify-center align-center">
    <v-pagination v-model="currentPage" :length="length" rounded="circle"></v-pagination>
  </div>
</template>
