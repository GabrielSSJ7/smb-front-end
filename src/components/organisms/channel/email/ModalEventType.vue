<script lang="ts" setup>
import { defineProps, defineEmits, toRef } from 'vue';
import { useCampaignStore } from '@/common/store/useCampaignStore';

const store = useCampaignStore();

const props = defineProps({
  channelId: String,
  isActive: Boolean,
});

const emit = defineEmits(['update:isActive']);

const isActive = toRef(props, 'isActive');

const pickChannel = (type: string) => {
  store.campaign.channel = 'email';
  store.campaign.channel_id = props.channelId || '';
  store.campaign.type = type;
  emit('update:isActive', false);
};
</script>

<style lang="scss" scoped>
.modal-event-type {
  &__card {
    height: 100px;
  }
}
</style>

<template>
  <v-dialog v-model="isActive" max-width="800" class="modal-event-type">
    <v-card title="Qual o tipo de campanha que você quer criar?" class="pa-5">

      <v-row class="pa-5">
        <v-col cols="6">
          <v-card @click="pickChannel('time_driven')" class="modal-event-type__card pa-4"  >
            <v-card-title class=" text-center text-body-2 font-weight-bold">Mensagem Automática</v-card-title>
            <v-card-text class="text-center text-caption">Automatize campanhas de WhatsApp de acordo
              com gatilhos inteligentes.</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card @click="pickChannel('event_driven')" class="modal-event-type__card pa-4">
            <v-card-title class="text-center text-body-2 font-weight-bold">Mensagem pontual</v-card-title>
            <v-card-text class="text-center text-caption">Dispare uma única campanha.</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="error" variant="flat" text="Cancelar" @click="emit('update:isActive', false)"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
