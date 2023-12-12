<template>
  <dialog-form
    titulo_dialog="reporte"
    boton_titulo="Nuevo Reporte"
  >
  <template #contenido>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete 
          label="departamento" 
          hint="departamento al cual se le realizo el reporte" 
          persistent-hint
          open-text="abrir"
          close-text="cerrar"
          :items="store.listaDepartamento">
          </v-autocomplete>
        </v-col>

        <v-col cols="12" md="6">
          <v-autocomplete 
          label="Tipo de Reporte" 
          hint="Tipo de Reporte" 
          persistent-hint
          open-text="abrir"
          close-text="cerrar"
          :items="store.tipoReporte">
          </v-autocomplete>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
          label="Nro de bien"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-autocomplete
          label="Funcionario"
          :items="store.listaTotalEmpleados_oficina"
          >
          </v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card style="border: 2px solid rgb(6, 143, 255);" variant="elevated" class="pa-2">
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
          <v-card style="border: 2px solid rgb(6, 143, 255);" variant="elevated" class="pa-2" >
            <v-text-field
              name="Hora de salida"
              label="Hora de salida"
              type="time"
              suffix="Salida"
              v-model="horaSalida"
              >
            </v-text-field>
  
            <date-picker-dialog
              @fecha="obtener"
            />
          </v-card>

        </v-col>

        <v-col cols="12">
          <v-textarea
            rows="3"
            clearable 
            label="Descripción" 
            variant="outlined">

          </v-textarea>
          <v-card elevation="15" class="mx-auto" max-width="500px" style="display: flex; flex-direction: column; align-items: center;">
            <v-card-title style="text-align: center;"> ESTATUS DEL REPORTE</v-card-title>

            <v-switch
              inset
              density="compact"
              v-model="statusReporte"
              base-color="primary"
              :color="statusReporte==='en curso'? 'red': 'success'"
              hide-details
              true-value="finalizado"
              false-value="en curso"
            ></v-switch>
            <label :class="statusReporte==='en curso'? 'text-red': 'text-success'" class="text-h5">{{ statusReporte }}</label>
          </v-card>
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
const statusReporte =ref('en curso')

const horaEntrada = ref()
const horaSalida = ref()

function obtener(valor) {
  console.log(valor)
}


onBeforeMount(()=>{
  store.obtenerDatos()
})
</script>