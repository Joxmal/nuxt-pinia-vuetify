<template>
  <dialog-form
    titulo_dialog="reporte"
    boton_titulo="Nuevo Reporte"
    @crear="store.crearReporte(form)"
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
  <v-divider></v-divider>
  <v-btn @click="store.obtenerReporte()">listar reportes</v-btn>

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
  const fechaEntrada = new Date(valor)
  fechaEntrada.setDate(fechaEntrada.getDate()+1)

  const horaEntrada = form.horaEntrada
  const [hora, minutos] = horaEntrada.split(":"); 

  fechaEntrada.setHours(hora,minutos,0);
  form.fechaEntrada = fechaEntrada


  // console.warn("fecha a enviar")
  // console.log(fechaEntrada.toLocaleString());
  // console.log(fechaEntrada.toISOString());

    // .toISOString().slice(0, 23) + "Z"
  // console.warn("la prueba de hora")
  // console.log(new Date("2023-12-15 00:06:00.000Z"))
  // console.log(new Date("2023-12-15 00:06:00.000Z").toLocaleTimeString())
  // console.log(new Date("2023-12-15 00:06:00.000Z").toLocaleDateString())
  // console.log((new Date("2023-12-15 00:06:00.000Z").getHours()))
  // console.log((new Date("2022-01-01 10:00:00.123Z").getMinutes()))
}

function obtenerFechaSalida(valor) {
  const fechaSalida = new Date(valor)
  fechaSalida.setDate(fechaSalida.getDate()+1)

  const horaSalida = form.horaSalida
  const [hora, minutos] = horaSalida.split(":"); 

  fechaSalida.setHours(hora,minutos,0);
  form.fechaSalida = fechaSalida
}


const form = reactive({
  creador:storeConexion.avatarID,
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