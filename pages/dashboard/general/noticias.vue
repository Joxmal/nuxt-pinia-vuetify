<template>
  <v-file-input
    multiple
    show-size
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Sube imagen del Mapa"
    prepend-inner-icon="mdi-camera"
    hint="solo PNG, JPEG, BMP"
    persistent-hint
    prepend-icon=""
    label="Imagen Piso"
    @change="previewImage"
    @click:clear="clearImagePreview"
    v-model="imagen"
  ></v-file-input>
  <pre>
    {{ compressedImages }}
  </pre>
  <pre>
    {{ imagen }}
  </pre>

  <v-btn @click="enviarImagenesComprimidas">enviar</v-btn>
</template>

<script setup>
import { ref } from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://oficina-sgi.pockethost.io');
definePageMeta({
  middleware: 'autenticacion',
});

const imagen = ref(null);
const compressedImages = ref([]);

const previewImage = (event) => {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const maxHeight = 800;
        let width = image.width;
        let height = image.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const compressedImageFile = new File([blob], file.name, {
            type: 'image/webp',
            lastModified: Date.now(),
          });

          compressedImages.value.push(compressedImageFile);
        }, 'image/webp', 0.8);
      };
    };

    reader.readAsDataURL(file);
  }

  console.log(compressedImages.value)
};

const clearImagePreview = () => {
  imagen.value = null;
  compressedImages.value = [];
};

async function enviarImagenesComprimidas(){
  let data = {
    imagen:compressedImages.value
  }
  
  const record = await pb.collection('mapasOficinas').create(data);
  console.log(record);
  compressedImages.value= []
}


</script>
