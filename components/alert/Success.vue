<template>
  <v-alert
    max-width="300"
    class="text-h6 ml-auto"
    type="success"
    icon="mdi-package-variant-closed-plus"
    border="top"
    prominent
    elevation="10"
    density="compact"
    rounded="lg"
    variant="elevated"
    :text="props.mensaje"
  >
  </v-alert>
</template>

<script setup>
const props = defineProps(['mensaje'])


</script>