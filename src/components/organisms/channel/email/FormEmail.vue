<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCampaignStore } from '@/common/store/useCampaignStore';
import { useFeedbackStore } from '@/common/store/useFeedbackStore';
import { RuleEnum } from '@/common/enums/rulesEnum';
import SmbButtonCheck from '@/components/molecules/SmbButtonCheck.vue';
import BeeFree from '@/components/organisms/beeFree/BeeFree.vue';
import TriggerConfiguration from '@/components/organisms/campaign/TriggerConfiguration.vue';
import CampaignService from '@/common/services/campaignService';

interface Rule {
  [key: string]: {
    title: string;
    icon: string;
  };
}

const rules: Rule = {
  [RuleEnum.AbandonedCart]: {
    title: 'Abandono de carrinho',
    icon: 'mdi-cart',
  },
  [RuleEnum.ViewFrequency]: {
    title: 'Frequência de Visualizações',
    icon: 'mdi-eye',
  },
  [RuleEnum.Birthday]: {
    title: 'Aniversário',
    icon: 'mdi-cake-variant',
  },
  [RuleEnum.Inactivity]: {
    title: 'Inatividade',
    icon: 'mdi-account-off',
  },
};

interface RulesValue {
  [key: string]: boolean;
}

const store = useCampaignStore();
const storeFeedback = useFeedbackStore();
const router = useRouter();

const templateData = ref({ metadata: '', html: '' });
const campaignName = ref('');
const campaignParams = ref({});
const channelData = ref({
  subject: '',
});
const snackbarError = ref(false);

const rulesValue = ref<RulesValue>({
  [RuleEnum.AbandonedCart]: false,
  [RuleEnum.Inactivity]: false,
  [RuleEnum.Birthday]: false,
  [RuleEnum.ViewFrequency]: false,
});

const disableOtherRules = (rule: string) => {
  Object.keys(rulesValue.value).forEach((key) => {
    if (key !== rule) {
      rulesValue.value[key] = false;
    }
  });
};

const triggerConfigs = ref({
  startDate: null as Date | null,
  endDate: null as Date | null,
  selectedMonths: [] as string[],
  selectedDays: [] as string[],
  customHours: '',
  customMinutes: '',
});

const onClickFinish = () => {
  const rule_id = Object.keys(rulesValue.value).find((key) => rulesValue.value[key]);
  const channel_id = store.campaign.channel_id;
  const client_id = "4d6ef6cc-8a46-4685-b66c-217210626b6e";

  const content = templateData.value.html;
  const contentParameters = JSON.parse(templateData.value.metadata);

  const campaign = {
    rule_id,
    channel_id,
    client_id,
    name: campaignName.value,
    content,
    content_parameters: contentParameters,
    channel_data: {
      subject: channelData.value.subject,
    },
    type: store.campaign.type,
    start_date: triggerConfigs.value.startDate,
    end_date: triggerConfigs.value.endDate,
    monthly_pattern: triggerConfigs.value.selectedMonths.join(','),
    daily_pattern: triggerConfigs.value.selectedDays.join(','),
    hourly_pattern: triggerConfigs.value.customHours,
    minutely_pattern: triggerConfigs.value.customMinutes,
  };

  CampaignService.createCampaign(campaign)
  .then(() => {
    router.push({ name: 'Campaigns' });
    storeFeedback.showSnackbackSuccess('Campanha criada com sucesso!');
    store.resetCampaign();
  })
  .catch((error) => {
    snackbarError.value = true;
  });
};

const validationStepRule = computed(() => {
  return !Object.values(rulesValue.value).some((value) => value);;
});

const validationSetpContentDesign = computed(() => {
  return !templateData.value.metadata || !templateData.value.html;
});

const validationStepCampaignData = computed(() => {
  return !campaignName.value;
});
</script>

<template>
  <v-stepper-vertical class="pa-5">
    <template v-slot:default="{ step }">
      <v-stepper-vertical-item :complete="step > 1" details title="Gatilhos da Campanha" value="1">

        <v-row align="start" class="mb-10">
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="6" v-for="(rule, index) in Object.keys(rules)" :key="index">
                <smb-button-check :icon="rules[rule].icon" :label="rules[rule].title" v-model="rulesValue[rule]"
                  @update:model-value="disableOtherRules(rule)" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <template v-slot:next="{ next }">
          <v-btn variant="flat" color="primary" @click="next" :disabled="validationStepRule">
            Continuar
          </v-btn>
        </template>

        <template v-slot:prev></template>
      </v-stepper-vertical-item>

      <v-stepper-vertical-item :complete="step > 2" title="Conteúdo e Design" value="2">
        <div class="mb-10">
          <bee-free v-model="templateData"></bee-free>
        </div>

        <template v-slot:prev="{ prev }">
          <v-btn variant="flat" color="outlined" @click="prev">
            Voltar
          </v-btn>
        </template>
        <template v-slot:next="{ next }">
          <v-btn variant="flat" color="primary" @click="next" :disabled="validationSetpContentDesign">
            Continuar
          </v-btn>
        </template>
      </v-stepper-vertical-item>

      <v-stepper-vertical-item title="Dados da Campanha" value="3">
        <div class="d-flex">
          <div class="pe-5 w-50">
            <v-text-field variant="outlined" label="Nome da Campanha" v-model="campaignName"></v-text-field>
          </div>

          <div class="w-50">
            <v-select variant="outlined" label="Parâmetros de Campanha" disabled></v-select>
          </div>
        </div>

        <template v-slot:prev="{ prev }">
          <v-btn variant="flat" color="outlined" @click="prev">
            Voltar
          </v-btn>
        </template>
        <template v-slot:next="{ next }">
          <v-btn variant="flat" color="primary" @click="next" :disabled="validationStepCampaignData">
            Continuar
          </v-btn>
        </template>
      </v-stepper-vertical-item>

      <v-stepper-vertical-item subtitle="Confirmação" title="Disparo da Campanha" value="4">
        <div>
          <trigger-configuration v-model="triggerConfigs"></trigger-configuration>
        </div>

        <template v-slot:next>
          <v-btn variant="flat" color="primary" @click="onClickFinish">
            Criar Campanha
          </v-btn>
        </template>
        <template v-slot:prev="{ prev }">
          <v-btn variant="flat" color="outlined" @click="prev">
            Voltar
          </v-btn>
        </template>
      </v-stepper-vertical-item>

    </template>
  </v-stepper-vertical>
  <snackbar-error v-model="snackbarError"></snackbar-error>
</template>
