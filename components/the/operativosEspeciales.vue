<template>

  <v-container class="fill-height" style="min-height: 434px" fluid>
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col v-for="(image, index) in storeImages.listOperativos" :key="index" class="d-flex child-flex" cols="12"
          sm="6" md="4">
          <card-image-description @abrir-dialog="estructurarDialog" :fecha="image.fecha" :text="image.descripsion"
            :title="image.titulo" :images="image.imagenes" />
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>

  <dialog-general-simple id-boton="dialogIMages">
    <template #contenido>
      <v-carousel show-arrows="hover">
        <v-carousel-item v-for="image in imagesSelected" :key="image" :src="image" cover></v-carousel-item>
      </v-carousel>
    </template>
  </dialog-general-simple>
</template>


<script setup lang="ts">
const show = ref(false)
import { useOperativosEspecialesImagesStore } from '~/stores/operativosEspeciales/imagesStore';

const storeImages = useOperativosEspecialesImagesStore()
onMounted(() => {
  storeImages.obtenerOperativos()
})

const imagesSelected = ref<string[]>([])
function estructurarDialog(images: string[]) {
  const dialogButton = document.getElementById('dialogIMages')?.click()
  imagesSelected.value = images
}
</script>