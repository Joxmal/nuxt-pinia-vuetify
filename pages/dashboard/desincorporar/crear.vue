<template>
<div>
  <v-slide-x-transition group>
    <AlertWarning v-show="storeCrear.eliminarExitoso === true" key="1"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Eliminado con exito"
    />
    <AlertCargando v-show="storeCrear.cargando === true" key="2"
      style="position: fixed; right: 20px ; z-index: 20; " 
      mensaje="Cargando"
    /> 
    <AlertSuccess v-show="storeCrear.editarExitoso === true" key="3"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Editado"
      icon="mdi-pencil-outline"
    /> 
    <AlertError v-show="storeCrear.ocurrioUnError === true" key="4"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="ERROR"
    />
    <AlertSuccess v-show="storeCrear.envioExitoso === true" key="5"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargado con exito"
    />  
  </v-slide-x-transition>
</div>
<v-card class="text-h3 text-center">Desincorporaciones</v-card>
<v-divider :thickness="2" class="my-3 border-opacity-100"></v-divider>
<!-- dialogo oculto que abre los detalles -->
<DialogGeneralSimple id-boton="DescripsionDesincorporacion" :ocultar-boton="true">
    <template #contenido>
      <div style="width: 100%; margin: 0 auto; " >
        <v-card max-height="90vh" style="overflow: auto;" position="relative"  elevation="15" class="d-flex flex-column ga-2">
          <v-card-title class="text-center">Item Desincorporado</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Tipo de item
                </div>
                <div>
                  {{ storeCrear.itemDetalles.tipo_Equipo }}
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Item
                </div>
                <div>
                  {{ storeCrear.itemDetalles.equipo }}                  
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Nro Bien
                </div>
                <div>
                  {{ storeCrear.itemDetalles.nro_bien }}                  
                </div>
              </div>
            </v-col>
          </v-row>
          <v-divider ></v-divider>
          <v-container>
            <v-row class="">
              <v-col cols="12">
                <v-card class="px-2">
                  {{ storeCrear.itemDetalles.descripsion }}
                </v-card>
              </v-col>
              <v-col cols="12">
                <CarouselTouch v-if="storeCrear.itemDetalles.imagenes.length > 0"
                  :imagePreview="storeCrear.itemDetalles.imagenes"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </template>
</DialogGeneralSimple>

<!-- dialogo de creacion y edicion -->
<DialogForm
    @crear="storeCrear.crearNuevaDesincorporacion()"
    @cerrar="cerrarDialogCreacion"
    id_boton="Boton/Crear/Editar"
    boton_titulo="Nueva Desincorporación"
    :modo-editar="modoEditar"
    @editar-dialog-form="storeCrear.editarDesincorporacion({ID:IdEditar})"
    >
  <template #contenido>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="Nro BIEN"
            maxlength="30"
            counter 
            hint="numero unico del BIEN"
            persistent-hint
            :rules="ruleNoEmpty"
            v-model="storeCrear.form.nro_bien"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="4">
            <v-autocomplete label="Tipo de equipo"
            :items="storeCrear.seleccionEquipo"
            v-model="storeCrear.form.tipo_Equipo"
            :rules="ruleNoEmpty"
            >
                
            </v-autocomplete>
        </v-col>

        <v-col cols="12" md="4">
            <v-autocomplete label="Equipo"
            :items="storeCrear.tipoEquipoSeleccionado"
            v-model="storeCrear.form.equipo"
            >
                
            </v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12">
          <v-card style="border: 2px solid rgb(6, 143, 255);" variant="elevated" class="pa-1">
            <v-card-title class="text-center">Fecha de la Desincorporación</v-card-title>
            <v-divider :thickness="3" class="border-opacity-50"></v-divider>
            <v-sheet class="mt-2 d-flex flex-column justify-center align-center font-weight-black">
              <input 
              class="mx-auto" 
              type="datetime-local" 
              min="2023-01-01" 
              max="2025-12-30"
              v-model="storeCrear.form.fecha_desincorporado"    >
            </v-sheet>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-textarea
            counter
            label="Descripsion"
            hint="Descripsion del Modelo de Tooner (opcional)"
            maxlength="400"
            persistent-hint
            rows="3"
            v-model="storeCrear.form.descripsion"
          >
          </v-textarea>
        </v-col>

        <v-col cols="12">
          <SubirImagenesFileComprimidas
            @imagenesMostrar="previsualizarImagenes"
            @imagenesComprimidas="obtenerImagenesComprimidas"
          />
        </v-col>
        <v-col cols="12">
          <CarouselTouch
            :imagePreview="previewImages"
          />
        </v-col>
      </v-row>

    </v-container>
  </template>
</DialogForm>

<!-- buscador -->
<v-form @submit.prevent class="my-2">
  <v-row align="center" align-content="center" justify="center">
    <v-col style="border: 2px solid rgb(54, 177, 218);border-radius: 30px;" cols="8" sm="5" lg="3"
      class="d-flex justify-center flex-column text-center pa-2 font-weight-bold">
      <div class="d-flex justify-center align-center ">
        <v-checkbox v-model="FiltrobusquedaDesincorporacion.rangoFechas.activo" :density="'compact'" :hide-details="'auto'"/>Fecha
      </div>
      <div v-if="FiltrobusquedaDesincorporacion.rangoFechas.activo" >
        <div>
          DESDE
          <input class="" type="date" min="2023-01-01" max="2025-12-30" v-model="FiltrobusquedaDesincorporacion.rangoFechas.desde" >
        </div>
        <div>
          HASTA
          <input class="" type="date" min="2023-01-01" max="2025-12-30" v-model="FiltrobusquedaDesincorporacion.rangoFechas.hasta">
        </div>
      </div>
    </v-col>
  </v-row>

  <v-row align="center" align-content="center" justify="center" class="mt-2" > 
    <v-col cols="12" md="4">
      <v-text-field
        density="compact"
        hide-details="auto"
        label="nro Bien"
        v-model="FiltrobusquedaDesincorporacion.nro_bien"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-autocomplete
        :items="storeCrear.seleccionEquipo"
        density="compact"
        hide-details="auto"
        label="Tipo de equipo"
        v-model="FiltrobusquedaDesincorporacion.tipo_Equipo"
      />
    </v-col>

    <v-col cols="12" md="1">
      <v-btn @click="storeCrear.obtenerDesincorporacion()"color="primary" width="100%" type="submit"  class="px-2">Buscar</v-btn>
    </v-col>
  </v-row>
</v-form>

<!-- card que muestra cada Desincorporación -->
<v-card height="650px" color="background" elevation="10" border position="relative"   
  class=" py-8 overflow-auto bg-none rounded d-flex flex-wrap justify-center align-start ga-2">
  <v-slide-y-transition group>
    <CardImage  width="350"  height="230" v-for="(item,index) in storeCrear.itemsDesincorporacion" :key="index"
    src-image="/images/pc.png "
    ocultar-boton-seleccion  
    :title="`${item.tipo_Equipo}`" 
    :subtitle="` ${item.equipo}<br><br> <b style='color:black;'>${item.nro_bien}</b>`"
    button-name="">
      <template #menu>
        <MenuDropdown
          @eliminar="storeCrear.eliminarDesincorporacion({ID:item.id})"
          @editar="abrirDialogoModoEditar(item)"
          @descripcion="abrirDialogDescripsion(item)"
        />

        <v-sheet border  class="text-h5 px-2 rounded-lg" density="compact" color="surface" elevation="20" position="absolute" location="top">
          {{  new Date(item.fecha_desincorporado).toLocaleDateString() }}
        </v-sheet>
      </template>
    </CardImage>
  </v-slide-y-transition>
</v-card>

<!-- paginacion -->
<div class="d-flex justify-space-between align-center pa-2" style="position: relative;">
  <v-pagination 
    class="mx-auto" 
    :density="'compact'" 
    v-model="storeCrear.paginacionData.page" 
    :total-visible="3" 
    :length="storeCrear.paginacionData.totalPages">
  </v-pagination>
  <div v-show="name !== 'xs'" style="position: absolute; right: 0; top: 50%;transform: translate(0%, -25%);">
    <v-select
      density="compact"
      :items="[10,20,30,40,50,300,10000]"
      v-model="storeCrear.paginacionData.perPage"
    />
  </div>
</div>


</template>

<script setup>
import { useDisplay } from 'vuetify'
import {useCrearDesincorporacion} from '~/stores/desincorporar/crear'
import {obtenerFechaHoraActual,convertirFechaUTC} from '~/assets/funciones_reuzables/times'

const storeCrear = useCrearDesincorporacion()
const { name } = useDisplay()

const{FiltrobusquedaDesincorporacion,paginacionData}= storeToRefs(storeCrear)

function abrirDialogDescripsion(item){
  document.querySelector('#DescripsionDesincorporacion').click()
  storeCrear.itemDetalles = item
}

const modoEditar = ref(false)
const IdEditar =ref()
function abrirDialogoModoEditar(item){
  const boton = document.getElementById('Boton/Crear/Editar')
  boton.click()
  console.log(item)

  storeCrear.form.nro_bien = item.nro_bien
  storeCrear.form.tipo_Equipo = item.tipo_Equipo
  storeCrear.form.equipo = item.equipo
  storeCrear.form.fecha_desincorporado = convertirFechaUTC(item.fecha_desincorporado) 
  storeCrear.form.descripsion = item.descripsion

  IdEditar.value = item.id
  modoEditar.value = true
}

function saludar(){
console.log("saludando")
}

// apartado de imagenes donde se muestra y se recibe la version comprimida
const previewImages= ref()

function previsualizarImagenes(valor){
    setTimeout(() => {
        previewImages.value = valor
    }, 200);
}

function obtenerImagenesComprimidas(valor){
  if(typeof valor === 'object' && valor.length >= 0){
    storeCrear.form.imagenes = valor
  }
}

function cerrarDialogCreacion(){
  delete storeCrear.form.imagenes
  previewImages.value = []

  modoEditar.value = false

  storeCrear.formatearFormulario()
}
//-----------
//rules
const ruleNoEmpty = [
  value => {
    if (value) return true
    return 'Debe rellenar el campo'
  },
]
//-------

watch(
  () => paginacionData.value.page,
  (newValor) => {
    storeCrear.obtenerDesincorporacion()
  },{deep:true, flush:'post'}
)

watch(
  () => paginacionData.value.perPage,
  (newValor) => {
    storeCrear.obtenerDesincorporacion()
  },{deep:true, flush:'post'}
)


onBeforeMount(async()=>{
    await storeCrear.obtenerDesincorporacion()
    storeCrear.form.fecha_desincorporado = obtenerFechaHoraActual()
})

onMounted(()=>{

})
</script>