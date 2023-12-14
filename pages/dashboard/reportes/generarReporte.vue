<template>
  <dialog-form
    titulo_dialog="reporte"
    boton_titulo="Nuevo Reporte"
  >
  <template #contenido>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
          label="Nro de bien"
          v-model="form.Item"
          
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-autocomplete 
          label="Tipo de Reporte" 
          hint="Tipo de Reporte" 
          persistent-hint
          open-text="abrir"
          close-text="cerrar"
          :items="store.tipoReporte"
          v-model="form.tipoReporte"
          >
          </v-autocomplete>
        </v-col>

        <v-col cols="12" md="6">
          <v-autocomplete 
          label="departamento" 
          hint="departamento al cual se le realizo el reporte" 
          persistent-hint
          open-text="abrir"
          close-text="cerrar"
          :items="store.listaDepartamento"
          v-model="form.departamento"
          >
        
          </v-autocomplete>
        </v-col>

        <v-col cols="12" md="6">
          <v-autocomplete
          label="Funcionario"
          :items="store.listaTotalEmpleados_oficina[form.departamento]"
          v-model="form.funcionario"
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
              v-model="form.horaEntrada"
              >
            </v-text-field>
  
            <date-picker-dialog
              @fecha="obtenerFechaEntrada"
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
              v-model="form.horaSalida"
              >
            </v-text-field>
  
            <date-picker-dialog
              @fecha="obtenerFechaSalida"
            />
          </v-card>

        </v-col>

        <v-col cols="12">
          <v-textarea
            rows="3"
            clearable 
            label="Descripción" 
            variant="outlined"
            v-model="form.descripsion"
            >

          </v-textarea>
          <v-card elevation="15" class="mx-auto" max-width="500px" style="display: flex; flex-direction: column; align-items: center;">
            <v-card-title style="text-align: center;"> ESTATUS DEL REPORTE</v-card-title>

            <v-switch
              inset
              density="compact"
              base-color="primary"
              :color="form.status==='en curso'? 'red': 'success'"
              hide-details
              v-model="form.status"
            ></v-switch>
            <label :class="form.status=== false ? 'text-red': 'text-success'" class="text-h5">{{ form.status== true ? 'FINALIZADO': 'EN CURSO'}}</label>
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
  <pre>
    {{ form }}

  </pre>
</template>


<script setup>
import { useReportesStore } from '~/stores/reportes'
import { useStoreConexion } from '~/stores/useStoreConexion'

const storeConexion = useStoreConexion()
const store = useReportesStore()


const horaSalida = ref()

function obtenerFechaEntrada(valor) {
  form.fechaEntrada = valor
}

function obtenerFechaSalida(valor) {
  form.fechaSalida = valor
}


const form = reactive({
  creador:storeConexion.avatarNombre,
  Item:'',
  tipoReporte:null,
  departamento:null,
  funcionario:null,
  horaEntrada:null,
  horaSalida:null,
  fechaEntrada:null,
  fechaSalida:null,
  descripsion:'',
  status:'en curso'
})



onBeforeMount(()=>{
  store.obtenerDatos()
})
</script>