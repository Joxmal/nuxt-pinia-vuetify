<template>
  <dialog-form
    titulo_dialog="reporte"
    boton_titulo="Nuevo Reporte"
  >
  <template #contenido>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-autocomplete 
          label="departamento" 
          hint="departamento al cual se le realizo el reporte" 
          persistent-hint
          :items="storeIPLista.listaDepartamento">
          </v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            label="Hora del reporte"
            type="time"
            suffix="Hora">
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-date-picker elevation="24"></v-date-picker>
          <v-text-field>
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field>

          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field>

          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field>

          </v-text-field>
        </v-col>



      </v-row>
    </v-container>
  </template>
  
  </dialog-form>

  <dialog-general/>
</template>


<script setup>
import { useIPListaStore } from '~/stores/ip_lista'
const storeIPLista = useIPListaStore()

</script>