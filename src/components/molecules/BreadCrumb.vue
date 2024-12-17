<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href: string;
}

const route = useRoute();

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const pathArray = route.path.split('/').filter((p) => p);
  return pathArray.map((path, index) => ({
    title: path.charAt(0).toUpperCase() + path.slice(1), // Changed from text to title
    disabled: index === pathArray.length - 1,
    href: '/' + pathArray.slice(0, index + 1).join('/'),
  }));
});
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>
