<template>
  <v-alert
    class="text-h7"
    type="error"
    icon="mdi-delete-empty"
    border="top"
    elevation="10"
    density="compact"
    rounded="lg"
    variant="elevated"
    :text="props.mensaje || ''"
  >
  </v-alert>
</template>

<script setup>
const props = defineProps(['mensaje'])


</script>