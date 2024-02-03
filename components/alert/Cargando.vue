<template>
  <v-alert
    style="transition: 1s ease-in-out;"
    max-width="300"
    class="text-h7"
    type="info"
    :icon="false"
    elevation="10"
    density="compact"
    rounded="lg"
    variant="elevated"
    :text="props.mensaje || ''"
  >

  <v-icon size="30px"  class="icono" icon="mdi-sync"></v-icon>
  </v-alert>
</template>

<script setup>
const props = defineProps(['mensaje'])


</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

.icono {
  animation: rotate 2s linear infinite;
}
</style>