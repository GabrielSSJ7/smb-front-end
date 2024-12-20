<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import SmbTable, { Row } from "@/components/molecules/SmbTable.vue";
import HeaderCampaignsList from "@/components/organisms/HeaderCampaignsList.vue";
import SmbLoading from '@/components/molecules/SmbLoading.vue';

import CampaignService, { ICampaign, IResponseCampaign } from '@/common/services/campaignService';

const tab = ref(1);
const type = ref('1');
const filterSelected = ref<string>('');
const isLoading = ref(true);
const snackbarError = ref(false);
const snackbarSuccess = ref(false);

const page = ref<string | number>(1);
const limit = ref(10);
const tableLength = ref(1);

const statusDictionary: { [key: string]: string } = {
  '1': 'Ativo',
  '0': 'Pausada',
};

const statusActionDictionary: { [key: string]: string } = {
  '1': 'Pausar',
  '0': 'Ativar',
};

const filterDictionary: { [key: string]: string } = {
  'Ativas': '1',
  'Pausadas': '0',
};

const typeDictionary: { [key: string]: string } = {
  '1': 'event_driven',
  '2': 'time_driven',
};

const getCampaigns = () => {
  isLoading.value = true;
  const status = filterDictionary[filterSelected.value] || '';
  CampaignService.getCampaigns(
    {
      page: page.value as number,
      limit: limit.value,
      status,
      type: typeDictionary[type.value]
    }
  ).then((response: IResponseCampaign) => {
    tableLength.value = response.total;
    page.value = response.page;
    rows.value = response.data.map((row: ICampaign) => {
      const createdAtDate = new Date(row.created_at);
      const year = createdAtDate.getUTCFullYear();
      const month = createdAtDate.getUTCMonth() + 1; // Months are zero-indexed
      const day = createdAtDate.getUTCDate();

      return {
        name: row.name,
        status: statusDictionary[row.active.toString()],
        envio: '--',
        created_at: `${day}/${month}/${year}`,
        cliques: '--',
        action:
        {
          text: statusActionDictionary[row.active.toString()],
          actionLabel: statusActionDictionary[row.active.toString()],
          actionIcon: 'mdi-chevron-down',
          actionColor: 'primary',
          actionVariant: 'flat',
          actionOptions: [
            {
              title: 'Visualizar',
              callback: () => { },
            },
            {
              title: 'Excluir',
              callback: () => { },
            },
          ],
          actionCallbackButton: () => {
            const active = row.active ? 0 : 1;
            CampaignService.updateCampaign(row.id, { active })
              .then(() => { snackbarSuccess.value = true; })
              .finally(() => getCampaigns());
          },
        },
      };
    });
  }).catch(() => {
    snackbarError.value = true;
  }).finally(() => { isLoading.value = false });
};

const columns = ref([
  { text: 'Informações da Campanha', key: 'name', icon: 'mdi-email' },
  { text: 'Status', key: 'status' },
  { text: 'Envio', key: 'envio' },
  { text: 'Abertura', key: 'created_at' },
  { text: 'Cliques', key: 'cliques' },
  { text: 'Ações', key: 'action' },
]);

const rows = ref<Row[]>([]);

const onFilterChange = ((value: string) => {
  filterSelected.value = value;
});

const onTypeChange = ((value: number) => {
  type.value = value.toString();
});

const onPaginationChange = ((value: number) => {
  page.value = value;
  getCampaigns();
});

watch(tab, () => {
  console.log('tab', tab.value);
  onTypeChange(tab.value);
});

watch([filterSelected, type], () => {
  getCampaigns();
});

onMounted(() => {
  getCampaigns();
});
</script>

<style lang="scss">
.campaings-list-template {
  &__tabs {
    background-color: #fff;
  }
}
</style>

<template>
  <div class="campaings-list-template w-100">
    <v-tabs v-model="tab" align-tabs="center" class="campaings-list-template__tabs" color="primary">
      <v-tab :value="1">Automáticas</v-tab>
      <v-tab :value="2">Pontuais</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" class="px-5">
      <header-campaigns-list @on-filter-change="onFilterChange" />
      <v-card class="pa-5">
        <template v-if="!isLoading">
          <smb-table :rows="rows" :columns="columns" :page="Number(page)" :length="tableLength"
            @pagination:change="onPaginationChange" />
        </template>
        <template v-else>
          <smb-loading type-loading="skeleton" skeleton-type="table" :loading="isLoading" />
        </template>
      </v-card>
    </v-tabs-window>
    <v-snackbar v-model="snackbarError">
      Ocorreu um erro ao carregar as campanhas

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbarError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar :timeout="2000" color="success" variant="tonal" v-model="snackbarSuccess">
      Status atualizado com sucesso!
    </v-snackbar>
  </div>
</template>
