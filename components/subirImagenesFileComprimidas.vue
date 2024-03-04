<template>
  <v-file-input
    multiple
    show-size
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    prepend-inner-icon="mdi-camera"
    hint="solo PNG, JPEG, BMP (opcional)"
    persistent-hint
    prepend-icon=""
    label="Imagenes PC (opcional)"
    @change="previewImage"
    @click:clear="clearImagePreview"
    v-model="images"
  >
  </v-file-input>

  <!-- <v-carousel
    touch
    :interval="6000"
    :cycle="false"
    progress="warning"
    hide-delimiter-background
    hide-delimiters
    show-arrows="hover"
    v-if="imagePreview.length > 0"
  >
    <v-carousel-item v-for="(image, index) in imagePreview" :key="index">
      <v-img :src="image" alt="Preview"></v-img>
    </v-carousel-item>
  </v-carousel>

  
  <div v-else>No hay imágenes seleccionadas.</div> -->
</template>

<script setup>

const emit = defineEmits(['imagenesMostrar','imagenesComprimidas'])




/////reglas del tamaño
const compressedImages = ref([]);

//imagen (opcional)
const images = ref([]);
const imagePreview = ref([]);

function previewImage(event) {
  imagePreview.value = [];
  for (const file of images.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  //-----------------------------------------------------
  //creando imagenes comprimidas
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        const canvas = document.createElement("canvas");
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

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const compressedImageFile = new File([blob], file.name, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            compressedImages.value.push(compressedImageFile);
          },
          "image/webp",
          0.8
        );
      };
    };

    reader.readAsDataURL(file);
  }

  // store.form.imagenes = compressedImages.value
}

function clearImagePreview() {
  imagePreview.value = [];
  compressedImages.value = [];
  // if(store.form.imagenes){
  //   delete store.form.imagenes
  // }
}

const rules = [
  (value) => {
    return (
      !value ||
      !value.length ||
      value[0].size < 8000000 ||
      "cada archivo de pesar menos de 8MB"
    );
  },
]


watch(imagePreview, (newImages, oldImages) => {
  // Emitir el evento 'enviarArchivos' cuando imagePreview cambie
  emit('imagenesMostrar', newImages);
  emit('imagenesComprimidas', compressedImages.value);
});
</script>
