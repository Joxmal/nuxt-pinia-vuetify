<template>
  <v-card border="colorLink sm" elevation="15"
    class="">
    <template #image>
      <v-img
        class="align-end text-white blur-lg"
        :lazy-src="props.srcImage"
        cover
      ></v-img>
    </template>


    <v-card-text class="mt-7 text-center " >
        <slot name="menu">
          
        </slot>
        <div class="d-flex flex-column ga-4" >
          <p v-html="props.title" style="background-color: rgba(158, 184, 175, 0.671);" class="rounded-lg text-h6 text-grey-darken-4 font-weight-bold text-uppercase">
          </p>
          <p v-html="props.subtitle" style="background-color: rgba(158, 184, 175, 0.671);" class="rounded-lg text-h6 text-blue-darken-4 font-weight-bold">
          </p>
        </div> 
      </v-card-text>
    
    <v-card-actions v-if="props.ocultarBotonSeleccion !== true">
      <v-btn @click="$emit('boton')" class="mx-auto" color="orange" variant="tonal">
        {{props.buttonName}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

const props = defineProps({
  title:String,
  subtitle:String,
  buttonName:{
    type:String,
    default:'Seleccionar'
  },
  srcImage:{
    type:String,
    default:'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
  },
  ocultarBotonSeleccion:{
    type:Boolean,
    default:false
  }
})
const emits = defineEmits(['boton'])
</script>