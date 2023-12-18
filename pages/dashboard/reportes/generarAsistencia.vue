<template>
  <!-- dilogo de la descripsion -->
  <dialog-form :ocultar-botones="true" :ocultar_boton="true" id_boton="boton-descripsion" boton_titulo="Descripsion">
    <template #contenido>
      <v-container class="d-flex flex-column ga-2">

        <div class=" font-weight-black text-h5 d-flex flex-column  align-center mb-1">
            {{ store.form.departamento }} 
        </div>
        <v-divider></v-divider>

        <div class="font-weight-black d-flex justify-space-between align-center">

          <div class="font-weight-black  d-flex flex-column  align-center">
            <div>
              trabajador
            </div>
            <div>
              {{ store.nombreCardAsistencia }} 
            </div>
          </div>

          <div class="font-weight-black  d-flex flex-column justify-center  align-center">
            <div>
              funcionario
            </div>
            <div>
              {{ store.form.funcionario }} 
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="font-weight-black  d-flex  justify-space-between align-center">
          <div class="">
            Entrada : {{ new Date(store.form.fechaEntrada).toLocaleString() }}
          </div>
          
          <div class="">
            Salida : {{ new Date(store.form.fechaSalida).toLocaleString() }}
          </div>
        </div>
        <v-card :density="'compact'" color=" pa-5" elevation="12">
          <v-card-title class=" text-center text-h5 bg-primary mt-n3 ">{{ store.form.tipoReporte }}</v-card-title>
          <p class="text-h6 text-justify">
            {{ store.dialogoDescripsion }}
          </p>
        </v-card>
        <v-chip>
          ID DEL SISTEMA:<b> {{store.ID_asistencia_editar }}</b> 
        </v-chip>
      </v-container>
    </template>
  </dialog-form>
  <!-- ---------- -->
  <!-- //dilogo de edicion y creacion -->
  <dialog-form 
          :boton-reset-formulario="true" 
          titulo_dialog="ASISTENCIA"
          boton_titulo="Nueva asistencia"
          :iconError="store.iconError"
          :mostrar_alert_create="store.iconCreate"
          @crear="store.crearReporte(store.form)"
          @editarDialogForm="store.editarReporte()"
          @modo-crear="store.modoEditar=false"
          @resetearFormulario="store.resetearReporte()"
          :modo-editar="store.modoEditar">
        <template #contenido>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                label="Nro de bien"
                v-model="store.form.item">
                </v-text-field>
              </v-col>
      
              <v-col cols="12" md="6">
                <v-autocomplete 
                label="Tipo de Asistencia" 
                hint="Tipo de Asistencia" 
                persistent-hint
                open-text="abrir"
                close-text="cerrar"
                :items="store.tipoReporte"
                v-model="store.form.tipoReporte"
                >
                </v-autocomplete>
              </v-col>
      
              <v-col cols="12" md="6">
                <v-autocomplete 
                label="departamento" 
                hint="departamento al cual se le realizo la asistencia" 
                persistent-hint
                open-text="abrir"
                close-text="cerrar"
                :items="store.listaDepartamento"
                v-model="store.form.departamento"
                >
              
                </v-autocomplete>
              </v-col>
      
              <v-col cols="12" md="6">
                <v-autocomplete
                label="Funcionario"
                :items="store.listaTotalEmpleados_oficina[store.form.departamento]"
                v-model="store.form.funcionario"
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
                    v-model="store.form.horaEntrada"
                    >
                  </v-text-field>
        
                  <date-picker-dialog
                    @fecha="obtenerFechaEntrada"
                  />
                  <v-sheet class="d-flex justify-center">
                    <v-sheet class="pa-2 font-weight-black">{{ new Date(store.form.fechaEntrada).toLocaleDateString() }}</v-sheet>
                  </v-sheet>
                </v-card>
      
              </v-col>
      
              <v-col cols="12" sm="6" >
                <v-card style="border: 2px solid rgb(6, 143, 255);" variant="elevated" class="pa-2" >
                  <v-text-field
                    name="Hora de salida"
                    label="Hora de salida"
                    type="time"
                    suffix="Salida"
                    v-model="store.form.horaSalida"
                    >
                  </v-text-field>
        
                  <date-picker-dialog
                    @fecha="obtenerFechaSalida"
                  />
                  <v-sheet class="d-flex justify-center">
                    <v-sheet class="pa-2 font-weight-black">{{ new Date(store.form.fechaSalida).toLocaleDateString() }}</v-sheet>
                  </v-sheet>
                </v-card>
      
              </v-col>
      
              <v-col cols="12">
                <v-textarea
                  rows="3"
                  clearable 
                  label="Descripción" 
                  variant="outlined"
                  v-model="store.form.descripsion"
                  >
      
                </v-textarea>
                <v-card elevation="15" class="mx-auto" max-width="500px" style="display: flex; flex-direction: column; align-items: center;">
                  <v-card-title style="text-align: center;"> ESTATUS DE LA ASISTENCIA</v-card-title>
      
                  <v-switch
                    inset
                    density="compact"
                    base-color="primary"
                    :color="store.form.status=== false ? 'red': 'success'"
                    hide-details
                    v-model="store.form.status"
                  ></v-switch>
                  <label :class="store.form.status === false ? 'text-red': 'text-success'" class="text-h5">{{ store.form.status== true ? 'FINALIZADO': 'EN CURSO'}}</label>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>
  </dialog-form>
  
    <!-- buscador de por fecha -->
    <v-container>
      <v-row>
          <!-- se va a esconder hasta que exista un usuario admin -->
        <v-col  v-if="useStoreConexion().avatarRole  === 'superUser'" cols="12" sm="3">
          <v-select label="Trabajador" v-model="valorusuarioID"  :items="useStoreConexion().usuarioListaMap" :item-props="itemProps"></v-select>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet class="d-flex justify-center flex-column text-center pa-2 font-weight-black">
          <date-picker-dialog
            titulo-boton="Desde"
            @fecha="pasarfechaDesde"
          />
           {{ invertirFecha(store.fechaPeticion.desde) }}
          </v-sheet>
        </v-col>

        <v-col cols="12" sm="3">
          <v-sheet class="d-flex justify-center flex-column text-center pa-2 font-weight-black">
          <date-picker-dialog
            titulo-boton="Hasta"
            @fecha="pasarfechaHasta" 
          />
           {{ invertirFecha(store.fechaPeticion.hasta) }}
          </v-sheet>
        </v-col>

        <v-col class="d-flex justify-center" cols="12" sm="3">
          <v-btn @click="store.obtenerReporte()" color="primary">
            BUSCAR
          </v-btn>
        </v-col>
      </v-row>



    </v-container>

  <v-card position="relative" class=" pa-4 py-10   bg-none rounded d-flex my-2 flex-wrap justify-center ga-2">

    <v-chip  class="font-weight-black" style="position: absolute;top: 0; right: 0;" >
      {{store.conteoAsistencia}}
    </v-chip>


    <lazy-card-asistencia v-for="item in store.asistenciaLista_Usuario " :key="item.id" 
     class="border "
     
     :id-asistencia="item.id"
     :tipo-asistencia="item.tipoReporte"
     :creador="store.buscarNombrePorID(item.creador)"
     :departamento="item.departamento"
     :descripsion="item.descripsion"
     
     :fecha-entrada="item.fechaEntrada"
     :fecha-salida="item.fechaSalida"

     :hora-entrada="obtenerHora(item.fechaEntrada)"
     :hora-salida="obtenerHora(item.fechaSalida)"
     :funcionario="item.funcionario"
     :status="item.status"
     :item="item.item"
    />

  </v-card>
  <!-- <v-divider></v-divider>

  {{ store.ID_asistencia_editar }}
  <v-divider></v-divider> -->
  <!-- <pre>
    {{ store.form }}

  </pre>


  <pre>
    {{ store.asistenciaLista_Usuario }}
  </pre> -->

</template>


<script setup>
import { useAsistenciasStore } from '~/stores/asistencias'
definePageMeta({
    middleware:'autenticacion'
})

const store = useAsistenciasStore ()


function obtenerFechaEntrada(valor) {
  const fechaEntrada = new Date(valor)
  fechaEntrada.setDate(fechaEntrada.getDate()+1)

  const horaEntrada = store.form.horaEntrada
  const [hora, minutos] = horaEntrada.split(":"); 

  fechaEntrada.setHours(hora,minutos,0);
  store.form.fechaEntrada = fechaEntrada
  console.log(fechaEntrada)
}

function obtenerFechaSalida(valor) {
  const fechaSalida = new Date(valor)
  fechaSalida.setDate(fechaSalida.getDate()+1)

  const horaSalida = store.form.horaSalida
  const [hora, minutos] = horaSalida.split(":"); 

  fechaSalida.setHours(hora,minutos,0);
  store.form.fechaSalida = fechaSalida
}

function obtenerHora(item){
  const date = new Date(item)
  let horas = date.getHours();
  let minutos = date.getMinutes();
  return `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}`
}

onBeforeMount(()=>{
  store.obtenerDatos()
  store.obtenerReporte()
})


//fecha del bucador

function pasarfechaDesde(valor){
store.fechaPeticion.desde = valor
console.log(valor)
}

function pasarfechaHasta(valor){
store.fechaPeticion.hasta = valor
}

function invertirFecha(fecha){
let partes = fecha.split("-");
return partes[2] + "-" + partes[1] + "-" + partes[0];
}

function fechaDesde(valor){
console.log(valor)
}


//select de los usuarios
function itemProps (item) {
  return {
    title: item.name,
  }
}


const valorusuarioID = ref({
  name: useStoreConexion().avatarNombre,
  id: useStoreConexion().avatarID
})


watch(valorusuarioID,(newvalor)=>{
  console.log("cambio")
   store.seleccionUsuario = newvalor.id
   store.obtenerReporte()
})

const devolverIDusuario = computed(()=>{
  return new Date()
})



</script>