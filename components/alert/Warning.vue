<template>
  <v-alert
    style="transition: 1s ease-in-out;"
    max-width="300"
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