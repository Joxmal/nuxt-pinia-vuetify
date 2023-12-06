<template>

        <v-alert
          max-width="300"
          class="text-h5 ml-auto"
          type="error"
          icon="mdi-delete-empty"
          border="top"
          prominent
          elevation="10"
          density="compact"
          rounded="lg"
          variant="elevated"
          :text="props.mensaje"
          style="position: absolute;z-index: 4;top:80px ; right: 500px;"
        >
        </v-alert>

</template>

<script setup>
const props = defineProps(['mensaje'])


</script>