<template>
  <v-alert
    max-width="300"
    class="text-h5 ml-auto"
    type="success"
    icon="mdi-package-variant-closed-plus"
    border="top"
    prominent
    elevation="10"
    density="compact"
    rounded="lg"
    variant="elevated"
    :text="props.mensaje"
    style="position: absolute;z-index: 50;top:80px ; right: 10px;"
  >
  </v-alert>
</template>

<script setup>
const props = defineProps(['mensaje'])


</script>