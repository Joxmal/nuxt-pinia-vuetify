<template>
  <v-alert
    max-width="300"
    class="text-h6 ml-auto"
    type="success"
    :icon="props.icon"
    border="top"
    elevation="10"
    density="compact"
    rounded="lg"
    variant="elevated"
    :text="props.mensaje"
  >
  </v-alert>
</template>

<script setup>
const props = defineProps({
  mensaje:{
    type: String
  },
  icon:{
    type: String,
    default: "mdi-package-variant-closed-plus"
  }
})


</script>