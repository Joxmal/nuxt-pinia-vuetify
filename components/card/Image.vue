<template>
  <v-card
    class=""
  >
    <v-img
      class="align-end text-white"
      height="200"
      :src="props.srcImage"
      cover
    >
    <v-card-text class=" text-center ">
        <slot name="menu">
          
        </slot>
         <p style="background-color: rgba(158, 184, 175, 0.534);" class="rounded-lg text-h4 text-grey-darken-4 font-weight-bold">
          {{ props.title }}  
        </p>  
      </v-card-text>
    </v-img>
    <v-card-actions>
      <v-btn @click="$emit('boton')" class="mx-auto" color="orange" variant="tonal">
        {{props.buttonName}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

const props = defineProps({
  title:String,
  buttonName:{
    type:String,
    default:'Seleccionar'
  },
  srcImage:{
    type:String,
    default:'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  }
})
const emits = defineEmits(['boton'])
</script>