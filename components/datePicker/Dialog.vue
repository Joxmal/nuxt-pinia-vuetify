<template>
<div class="text-center">
    <v-btn
     color="primary"
     @click="dialog=true">
        {{ props.tituloBoton }}
    </v-btn>
</div>
<v-sheet v-if="false" class="d-flex justify-center">
    <v-sheet  class="pa-2 font-weight-black">
        {{ fechaParcheada }}
    </v-sheet>
</v-sheet>

<v-dialog
 persistent
 v-model="dialog"
 width="auto">

    <v-date-picker
        header="Escoge fecha"
        color="primary"
        title="selecciona fecha de entrada"
        min="2023-01-01"
        max="2024-12-31"
        v-model="fecha">
    </v-date-picker>

    <v-btn
     color="primary"
     @click="$emit('fecha',fechaParcheada),dialog=false">
        ACEPTAR
    </v-btn>
</v-dialog>
</template>
    
    
<script setup>

const props = defineProps({
    tituloBoton:{
        type:String,
        default:'Colocar Fecha'
    }
})

//abrir y cerrar dialog
const dialog =ref()

const fecha = ref()

const fechaParcheada= computed(()=>{
    const date = new Date(fecha.value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añade un cero si es necesario para tener dos dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Añade un cero si es necesario para tener dos dígitos
    return `${year}-${month}-${day}`;
})  

defineEmits(['fecha'])


</script>