<template>
  <dialog-form
    titulo_dialog="reporte"
    boton_titulo="Nuevo Reporte"
  >
  <template #contenido>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-autocomplete 
          label="departamento" 
          hint="departamento al cual se le realizo el reporte" 
          persistent-hint
          open-text="abrir"
          close-text="cerrar"
          :items="store.listaDepartamento">
          </v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card color="deep-purple-darken-1" variant="elevated" class="pa-2">
            <v-text-field
              name="Hora de entrada"
              label="Hora de entrada"
              type="time"
              suffix="Entrada"
              v-model="horaEntrada"
              >
            </v-text-field>
  
            <date-picker-dialog
              @fecha="obtener"
            />
          </v-card>

        </v-col>

        <v-col cols="12" sm="6" >
          <v-card color="deep-purple-darken-1" variant="elevated" class="pa-2" >
            <v-text-field
              name="Hora de salida"
              label="Hora de salida"
              type="time"
              suffix="Salida"
              v-model="horaEntrada"
              >
            </v-text-field>
  
            <date-picker-dialog
              @fecha="obtener"
            />
          </v-card>

        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
          label="Nro de item"
          >
          </v-text-field>
        </v-col>

        <v-col class="pt-6" cols="12" sm="6">
          <v-row>
            <v-text-field style=""
             label="estado"
             hint="description relacionado al estado del equipo" 
             persistent-hint
             />
            <v-checkbox-btn/>
          </v-row>
        </v-col>
      
      </v-row>
    </v-container>
  </template>
  
  </dialog-form>
  <pre>
    {{ store.listaTotalEmpleados_oficina }}
  </pre>
  <v-divider></v-divider>

</template>


<script setup>
import { useReportesStore } from '~/stores/reportes'

const store = useReportesStore()

const horaEntrada = ref()

function obtener(valor) {
  console.log(valor)
}


onBeforeMount(()=>{
  store.obtenerDatos()
})
</script>