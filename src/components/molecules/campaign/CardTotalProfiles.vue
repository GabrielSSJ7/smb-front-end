<script lang="ts" setup>
import { ref } from 'vue';

const totalProfiles = ref(25);
</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-card class="pa-2" outlined>
          <v-row align="center">
            <v-col cols="auto">
              <v-icon color="green">mdi-circle</v-icon>
            </v-col>
            <v-col>
              <div class="text-caption font-weight-bold">Lista de contatos</div>
              <div class="text-caption">{{ totalProfiles }} cadastrados</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  border: 1px solid green;
  background-color: #e9ffea;
}
</style>
