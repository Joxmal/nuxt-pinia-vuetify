<template>
<div class="text-center">
    <v-btn
    color="primary"
    @click="dialog=true"
    >
        Colocar fecha
    </v-btn>
</div>
    <v-dialog 
     v-model="dialog"
     width="auto"
    >

        <v-date-picker
            
            header="Escoge fecha"
            color="primary"
            title="selecciona fecha de entrada"
            min="2023-01-01"
            max="2024-12-31"
            v-model="fecha"

            >
            
        </v-date-picker>



    </v-dialog>
    {{ fecha }}
    <v-divider></v-divider>
    {{ formatDate(fecha) }}
</template>


<script setup>
const fecha = ref()
const fechaparcheada = ref()

const dialog =ref()


function formatDate(dateString) {
  const date = new Date(dateString);
  console.log(date)
  const year = date.getFullYear();
  console.log(year)
  console.log(date.getMonth())
  console.log(date.getDate())
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añade un cero si es necesario para tener dos dígitos
  const day = date.getDate().toString().padStart(2, '0'); // Añade un cero si es necesario para tener dos dígitos

  return `${year}-${month}-${day}`;
}




</script>