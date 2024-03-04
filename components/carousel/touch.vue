<template>
  <v-carousel
  touch
  :interval="6000"
  :cycle="false"
  progress="warning"
  hide-delimiter-background
  hide-delimiters
  show-arrows="hover"
  v-if=" typeof props.imagePreview === 'object' && props.imagePreview.length > 0 ">

    <v-carousel-item v-for="(image, index) in props.imagePreview" :key="index">

      <v-img :src="image" alt="Preview">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>

    </v-carousel-item>

  </v-carousel>
  <div v-else>No hay imágenes seleccionadas.</div>

</template>


<script setup>
const props = defineProps(['imagePreview'])
</script>