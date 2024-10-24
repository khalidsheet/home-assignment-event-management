<script setup>
  const model = defineModel();
  const props = defineProps(['text']);
</script>
<template>
    <v-snackbar
      v-model="model"
      :timeout="2500"
      v-on:update:model-value="model = $event"
    >
      {{ props.text }}
    </v-snackbar>
</template>
