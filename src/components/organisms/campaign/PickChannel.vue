<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ChannelService, { Channel } from '@/common/services/channelService';
import SmbLoading from '@/components/molecules/SmbLoading.vue';
import EmailModalEventType from '@/components/organisms/channel/email/ModalEventType.vue';

const channels = ref<Channel[]>([]);
const isLoading = ref(true);
const snackbarError = ref(false);
const openEmailModal = ref(false);
const channelId = ref('');

interface ChannelTypeDictionary {
  [key: string]: {
    image: string;
    color?: string;
    title: string;
    description: string;
    callback?: () => void;
  }
};
const channelTypeDictionary: ChannelTypeDictionary = {
  sms: {
    image: 'mdi-message-text',
    color: '#15c86a',
    title: 'Mensagem de texto',
    description: 'Envie mensagens de texto personalizadas para seus clientes.'
  },
  email: {
    image: 'mdi-email',
    title: 'E-mail',
    color: '#ffca00',
    description: 'Envie e-mails personalizados para seus clientes.',
    callback: () => {
      openEmailModal.value = true;
    }
  }
};

const getChannels = () => {
  ChannelService.getChannels().then((response) => {
    channels.value = response.data;
  }).catch(() => { snackbarError.value = true; }).finally(() => {
    isLoading.value = false;
  });
};

const pickChannel = (channel: string, id: string) => {
  channelTypeDictionary[channel].callback?.();
  channelId.value = id;
};

const onOpenEmailModalChange = (value: boolean) => {
  openEmailModal.value = value;
};

onMounted(() => {
  getChannels();
});
</script>

<template>
  <v-container class="pick-channel">
    <v-row justify="center">
      <v-col cols="12">
        <v-card class="pa-4" v-if="!isLoading">
          <v-card-title class="headline">Escolha um canal</v-card-title>
          <v-card-subtitle class="pick-channel__card-subtitle text-caption">
            Nao se preocupe, você criar e ativar mais de uma campanha,
            de acordo com a sua estratégia!
          </v-card-subtitle>
          <v-divider class="my-4"></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="6" v-for="(channel, index) in channels" :key="index">
                <v-card outlined class="pick-channel__item" @click="pickChannel(channel.type, channel.id)">
                  <v-card-title class="d-flex flex-column justify-center text-caption font-weight-bold">
                    <v-icon :color="channelTypeDictionary[channel.type]?.color" left>{{
                      channelTypeDictionary[channel.type]?.image }}</v-icon>
                    <span>{{ channelTypeDictionary[channel.type]?.title }}</span>
                  </v-card-title>
                  <v-card-text class="text-caption text-center">
                    <span>{{ channelTypeDictionary[channel.type]?.description }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <smb-loading :loading="isLoading" type-loading="progress" v-else></smb-loading>
      </v-col>
      <v-snackbar v-model="snackbarError" color="error" top>
        Ocorreu um erro ao carregar os canais. Tente novamente.
      </v-snackbar>
    </v-row>

    <email-modal-event-type :is-active="openEmailModal" :channel-id="channelId" @update:is-active="onOpenEmailModalChange" />

  </v-container>
</template>

<style lang="scss" scoped>
.pick-channel {
  max-width: 600px;

  &__item {
    &:hover {
      cursor: pointer;
      background-color: #f5f5f5;
    }
  }
}

.v-card-title {
  display: flex;
  align-items: center;
}

.v-icon {
  margin-right: 8px;
}

.v-card-subtitle {
  white-space: pre-line;
  text-overflow: initial !important;
}
</style>
