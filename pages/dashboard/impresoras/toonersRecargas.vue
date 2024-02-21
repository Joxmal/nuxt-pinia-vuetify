<template>
  <!-- <pre>
    {{ storeToonersRecargas.descripsionTonerRecarga }}
    {{ storeToonersRecargas.descripsionTonerListaRecarga }}
  </pre> -->
  {{ storeToonersRecargas.toonerModeloRecarga.totalItems }}

<div>
  <v-slide-x-transition group>
    <AlertWarning v-show="storeToonersRecargas.eliminarExitoso === true" key="1"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Eliminado con exito"
    />
    <AlertCargando v-show="storeToonersRecargas.cargando === true" key="2"
      style="position: fixed; right: 20px ; z-index: 20; " 
      mensaje="Cargando"
    /> 
    <AlertSuccess v-show="storeToonersRecargas.editarExitoso === true" key="3"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Editado"
      icon="mdi-pencil-outline"
    /> 
    <AlertError v-show="storeToonersRecargas.ocurrioUnError === true" key="4"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="ERROR"
    />
    <AlertSuccess v-show="storeToonersRecargas.envioExitoso === true" key="5"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargado con exito"
    />  
  </v-slide-x-transition>
</div>
<!-- Dialogo que muestra los detalles de cada toner -->
<DialogGeneralSimple id-boton="MostrarDetallesTonerRecargas" name-boton="adds" :ocultar-boton="true">
    <template #contenido>
      <div style="width: 100%; margin: 0 auto; " >
        <v-card max-height="90vh" style="overflow: auto;" position="relative" elevation="15" class="d-flex flex-column ga-2">
          <v-card-title class="text-center"> DETALLES DEL TONER</v-card-title>
          <v-sheet position="absolute" location="top right" class="ma-2"  variant="plain" >piso </v-sheet>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" sm="4">
              <div class=" d-flex flex-column  align-center">
                <div class="font-weight-black">
                  Nro Item
                </div>
                <div class="font-bold">
                  {{  storeToonersRecargas.descripsionTonerRecarga['nro item'] }}
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class=" d-flex flex-column  align-center">
                <div class="font-weight-black">
                  Marca
                </div>
                <div class="font-bold">
                  {{ storeToonersRecargas.descripsionTonerRecarga['toner marca'] }}
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class=" d-flex flex-column  align-center">
                <div class="font-weight-black">
                  Modelo
                </div>
                <div class="font-bold">
                  {{ storeToonersRecargas.descripsionTonerRecarga['toner modelo'] }}
                </div>
              </div>
            </v-col>
          </v-row>
          <v-divider ></v-divider>
          <v-container>
            <v-row class="">


            </v-row>

            <v-divider  class="my-4 border-opacity-0"></v-divider>

            
            <v-row class="">
              <v-col cols="12"  sm="4" v-for="(valor,clave) in storeToonersRecargas.descripsionTonerRecarga" :key="clave" >
                <div   style="border: 2px solid rgb(65, 104, 189); border-radius: 10px;">
                  <v-sheet class="ma-1 pa-1 text-center font-weight-black">
                    {{ capitalizarPrimeraLetra(clave) }} 
                  </v-sheet>
                  <v-divider></v-divider>
                  <v-sheet class="ma-1 pa-1 text-center font-weight-black">
                    {{ valor }}  
                  </v-sheet>
                </div>
              </v-col>

              <v-divider></v-divider>
              <div class="text-center text-h6 mx-auto inline">Recargas del toner</div>
              <v-divider class="border-opacity-0"></v-divider>

              <v-slide-x-transition group>
                <v-col cols="3" v-for="(valor,clave) in storeToonersRecargas.descripsionTonerListaRecarga" :key="clave">
                  <v-card position="relative">
                    <v-card-title class="text-center mx-auto">
                      {{ clave+1 }}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="text-center">
                      {{ new Date(valor.recarga).toLocaleDateString('es-ES',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                    </v-card-text>
                    <v-btn @click="storeToonersRecargas.restarTonerRegarca2({toner:valor})" density="compact" position="absolute" location="top right" icon="mdi-delete-forever"></v-btn>
                  </v-card>

                </v-col>
              </v-slide-x-transition>
              
              <v-divider></v-divider>


              <v-col cols="12">
                <div   style="border: 2px solid rgb(65, 104, 189); border-radius: 10px;">
                  <v-sheet class="ma-1 pa-1 text-center font-weight-black">
                    Descripsion
                  </v-sheet>
                  <v-divider></v-divider>
                  <v-sheet class="ma-1 pa-1 text-center font-weight-black">
                    {{ storeToonersRecargas.descripsionTonerRecargaDescripsion }}
                  </v-sheet>
                </div>
              </v-col>
            </v-row>

          </v-container>
        </v-card>
      </div>
    </template>
</DialogGeneralSimple>


<!-- crear nuevo modelo de toner -->
<DialogForm
  @crear="storeToonersRecargas.EnviartonerRecarga()"
  id_boton="creacionModeloTooner"
  :titulo_dialog="tituloDialogToonerRecarga"
  boton_titulo="Nuevo Toner"
  @cerrar="modoEditar = false"
  :modo-editar="modoEditar"
  @editar-dialog-form="storeToonersRecargas.editarTonerRecarga({ID:IdEditar})"
>
  <template #contenido>
    <!-- seleccion del medelo de tooner -->
    <v-row>
      <v-col>
        <DialogGeneralSimple id-boton="MostrarModelos" :ocultar-boton="false" name-boton="Modelo Tooner">
              <template #contenido>
                <div style="width: 80%; margin: 0 auto; " >
                  <v-card max-height="90vh" style="overflow: auto;" position="relative"  elevation="15" class="d-flex flex-column ga-2">
                    <EncapsulamientoImpresorasTonerModelo
                      modo-seleccion
                      @seleccion-modelo="capturarTonerModelo"
                    />
                  </v-card>
                </div>
              </template>
        </DialogGeneralSimple>

        <CardImage class="mx-auto mt-2" color="surface" width="280"  height="120"  
        src-image="/images/toonerImage.png " 
        ocultar-boton-seleccion
        :title="`${tonerSeleccionado.marca} <br> <b style='color:black;'>${tonerSeleccionado.modelo}</b>`"
        >
        </CardImage>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Nro Item"
            maxlength="30"
            counter
            :rules="ruleNoEmpty"
            hint="numero unico del tooner"
            persistent-hint
            v-model="storeToonersRecargas.formToonerRecarga.nro_item"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="m-auto">
          <v-text-field
            type="number"
            label="Recargas"
            min="0" max="100"
            hint="Marca del Tooner"
            persistent-hint
            v-model="storeToonersRecargas.formToonerRecarga.nro_regargas"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="12">
          <v-card style="border: 2px solid rgb(6, 143, 255);" variant="elevated" class="pa-1">
            <v-card-title class="text-center">fecha de entrada</v-card-title>
            <v-divider :thickness="3" class="border-opacity-50"></v-divider>
            <v-sheet class="mt-2 d-flex flex-column justify-center align-center font-weight-black">
              <input class="mx-auto" type="datetime-local" min="2023-01-01" max="2025-12-30"
              v-model="storeToonersRecargas.formToonerRecarga.fecha_entrada"
              >
            </v-sheet>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-autocomplete label="departamento" 
              :items="useListasStore().listaDepartamento"
              v-model="storeToonersRecargas.formToonerRecarga.direccion"
              :rules="ruleNoEmpty">

            </v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-textarea
            counter
            label="Descripsion"
            hint="Descripsion del Modelo de Tooner (opcional)"
            maxlength="400"
            persistent-hint
            v-model="storeToonersRecargas.formToonerRecarga.descripsion"
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </template>
</DialogForm>

<!-- buscador -->
<v-form @submit.prevent>
    <v-row align="center" align-content="center" justify="center" class="mt-2" > 
      <v-col cols="12" md="2">
        <v-text-field
          density="compact"
          hide-details="auto"
          label="nro Item"
          v-model="storeToonersRecargas.FiltrotonerRecarga.nro_item"
        />
      </v-col>

      <v-col cols="12" md="2">
        <v-autocomplete 
          :items="storeToonersModelos.FiltrobusquedaMarcaModelo_autocomplete.marca"
          label="Marca"
          hide-details="auto" 
          density="compact"
          v-model="storeToonersRecargas.FiltrotonerRecarga.marca">
          
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="2">
        <v-autocomplete 
          :items="storeToonersModelos.FiltrobusquedaMarcaModelo_autocomplete.modelo"
          label="Modelo"
          hide-details="auto" 
          density="compact"
          v-model="storeToonersRecargas.FiltrotonerRecarga.modelo"
          >
        </v-autocomplete>
      </v-col>
  
      <v-col cols="12" md="2">
        <v-autocomplete 
          :items="useListasStore().listaDepartamento"
          label="Departamento"
          hide-details="auto" 
          density="compact"
          v-model="storeToonersRecargas.FiltrotonerRecarga.departamento">
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="1">
        <v-btn @click="storeToonersRecargas.obtenerToonersRecargas()" width="100%" type="submit"  class="px-2">Buscar</v-btn>
      </v-col>
    </v-row>
    <v-row align="center" align-content="center" justify="center">
      <div>
        <v-switch
        v-model="storeToonersRecargas.FiltrotonerRecarga.tonerInactivo"
        inset
        density="compact"
        base-color="primary"
        :color="storeToonersRecargas.FiltrotonerRecarga.tonerInactivo === false ? 'secondary' : 'red' "
        hide-details
        append-icon="mdi-cog-off"
        prepend-icon="mdi-cog"
        >
        </v-switch>
      </div>
    </v-row>
</v-form>


<!-- cards de los tooners -->
<div class="d-flex justify-center mt-10"> 
  <v-card elevation="10" color="primary" class="pa-2 rounded-lg text-center font-weight-bold  text-h6">{{ storeToonersRecargas.toonerModeloRecarga.totalItems }}</v-card>
</div>
<v-card height="650px" color="background" elevation="10" border position="relative"   
  class=" py-8 overflow-auto bg-none rounded d-flex flex-wrap justify-center align-start ga-2">
  <v-slide-y-transition group>
    <CardImage :color="tonerRecarga.activo ? 'surface': 'red-lighten-2'" width="350"  height="230" v-for="(tonerRecarga,index) in storeToonersRecargas.itemsToonerRecarga" :key="index"
    src-image="/images/toonerImage.png "
    ocultar-boton-seleccion  
    :title="`${tonerRecarga.direccion}`" 
    :subtitle="` ${tonerRecarga.expand.tooner_modelo.marca} <br> ${tonerRecarga.expand.tooner_modelo.modelo}<br> <b style='color:black;'>${tonerRecarga.nro_item}</b>`"
    button-name="">
      <template #menu>
        <MenuDropdown
          @eliminar="storeToonersRecargas.eliminarTonerRecarga({ID:tonerRecarga.id})"
          @editar="editarDescripsion({toner:tonerRecarga})"
          @descripcion="abrirDialogoDescripsion({toner:tonerRecarga})"
          opcion-extra="Activar-Desactivar"
          @Activar-Desactivar="storeToonersRecargas.activar_desativarTonerRegarga({statusToner:tonerRecarga.activo,ID:tonerRecarga.id})"
        />

        <!-- <v-btn @click="storeToonersRecargas.restarTonerRegarca({ID:tonerRecarga.id,nroActual:tonerRecarga.nro_regargas})" density="compact" icon="mdi-minus" color="warning" position="absolute" style="bottom: 0; left: 10px;"></v-btn> -->
        <v-btn size="large" @click="storeToonersRecargas.sumarTonerRegarca({ID:tonerRecarga.id,nroActual:tonerRecarga.nro_regargas})" density="comfortable" icon="mdi-plus" color="success" position="absolute" style="bottom: 5px; right: 5px;"></v-btn>
        <v-sheet border :class="tonerRecarga.nro_regargas > 5 ? 'text-warning' : 'text-success'" class="text-h4 px-2 rounded-lg" density="compact" color="surface" elevation="20" position="absolute" location="top">
          {{ tonerRecarga.nro_regargas }}
        </v-sheet>
      </template>>
    </CardImage>
  </v-slide-y-transition>
</v-card>

<!-- paginacion -->
<div class="d-flex justify-space-between align-center pa-2" style="position: relative;">
    <v-pagination 
      class="mx-auto" 
      :density="'compact'" 
      v-model="storeToonersRecargas.toonerModeloRecarga.page" 
      :total-visible="3" 
      :length="storeToonersRecargas.toonerModeloRecarga.totalPages">
    </v-pagination>
    <div v-show="name !== 'xs'" style="position: absolute; right: 0; top: 50%;transform: translate(0%, -25%);">
      <v-select
        density="compact"
        :items="[10,20,30,40,50,300,10000]"
        v-model="storeToonersRecargas.toonerModeloRecarga.perPage"
      />
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import {useToonersRecargasStore} from '~/stores/impresoras/toonerRecargas'
import {useToonerModeloStore} from '~/stores/impresoras/toonerModelo'
import {convertirFechaUTC} from "~/assets/funciones_reuzables/times"

const storeToonersRecargas = useToonersRecargasStore()
const storeToonersModelos = useToonerModeloStore()

const { name } = useDisplay()

const tituloDialogToonerRecarga = ref("crear nuevo Tooner")


// ID DEL TONER A EDITAR
const IdEditar = ref()


const modoEditar =ref(false)

function editarDescripsion({toner}){
  console.log(toner)
  
  storeToonersRecargas.formToonerRecarga.nro_item = toner.nro_item
  storeToonersRecargas.formToonerRecarga.tooner_modelo = toner.tooner_modelo
  storeToonersRecargas.formToonerRecarga.nro_regargas= toner.nro_regargas
  storeToonersRecargas.formToonerRecarga.fecha_entrada = convertirFechaUTC(toner.fecha_entrada)
  storeToonersRecargas.formToonerRecarga.activo = toner.activo
  storeToonersRecargas.formToonerRecarga.descripsion = toner.descripsion
  storeToonersRecargas.formToonerRecarga.direccion = toner.direccion



  document.querySelector('#creacionModeloTooner').click();
  IdEditar.value = toner.id
  modoEditar.value = true

}

function abrirDialogoDescripsion({toner}){
  document.querySelector("#MostrarDetallesTonerRecargas").click()
  console.log(toner)

storeToonersRecargas.descripsionTonerRecarga["nro item"]= toner.nro_item
storeToonersRecargas.descripsionTonerRecarga["toner marca"]= toner.expand.tooner_modelo.marca
storeToonersRecargas.descripsionTonerRecarga["toner modelo"]= toner.expand.tooner_modelo.modelo
storeToonersRecargas.descripsionTonerRecarga["nro regargas"]= toner.nro_regargas
storeToonersRecargas.descripsionTonerRecarga["fecha entrada"]= new Date(toner.fecha_entrada).toLocaleString()
storeToonersRecargas.descripsionTonerRecarga.activo= toner.activo === true ? 'OPERATIVO' : 'INOPERATIVO'
storeToonersRecargas.descripsionTonerRecargaDescripsion= toner.descripsion
storeToonersRecargas.descripsionTonerRecarga.direccion= toner.direccion
storeToonersRecargas.descripsionTonerRecarga["fecha salida"]= toner.fecha_salida

if(storeToonersRecargas.descripsionTonerRecarga["fecha salida"].length === 0){
  storeToonersRecargas.descripsionTonerRecarga["fecha salida"] = "---------"
}else{
  storeToonersRecargas.descripsionTonerRecarga["fecha salida"] = new Date(toner.fecha_salida).toLocaleString()
}


storeToonersRecargas.obtenerTonerListaRecargas({ID:toner.id})


}


const ruleNoEmpty = [
  value => {
    if (value) return true
    return 'Debe rellenar el campo'
  },
]


const tonerInactivo = ref(false)

function capturarTonerModelo(event){
  tonerSeleccionado.value.marca = event.marca
  tonerSeleccionado.value.modelo = event.modelo
  tonerSeleccionado.value.id = event.id

  storeToonersRecargas.formToonerRecarga.tooner_modelo = event.id

  console.log(event)
  console.log(tonerSeleccionado.value)
}

const tonerSeleccionado = ref({
  marca:'',
  modelo:'',
  id:''
})

onBeforeMount(async()=>{
  await storeToonersRecargas.obtenerToonersRecargas()
  storeToonersRecargas.formToonerRecarga.fecha_entrada = useAsistenciasStore().obtenerFechaHoraActual_8am
  await storeToonersModelos.ObtenerModeloTooner()
})

const {toonerModeloRecarga} = storeToRefs(storeToonersRecargas)

watch(
    () => toonerModeloRecarga.value.page,
    (newValor) => {
      storeToonersRecargas.obtenerToonersRecargas()
    },{deep:true, flush:'post'}
  )
  
  watch(
    () => toonerModeloRecarga.value.perPage,
    (newValor) => {
      storeToonersRecargas.obtenerToonersRecargas()
    },{deep:true, flush:'post'}
  )
  

  watch(
    () => modoEditar.value,
    (newValor) => {
      if(modoEditar.value == false){
        tituloDialogToonerRecarga.value = "Crear Modelo Tooner"
      }else{
        tituloDialogToonerRecarga.value = "Editar Modelo Tooner"
      }
    },{flush:'post'}
  )

  function capitalizarPrimeraLetra(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
</script>