<template>
  <div>
    <input type="file" @change="previewImage" />
    <v-img :src="imagePreview" v-if="imagePreview" />
  </div>
</template>

<script>
definePageMeta({
  middleware:'autenticacion',
})
export default {
  data() {
    return {
      imagePreview: null
    };
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
};
</script>