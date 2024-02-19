<template>
<div>
  <v-slide-x-transition group>
    <AlertWarning v-show="storeToonerModelo.eliminarExitoso === true" key="1"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Eliminado con exito"
    />
    <AlertCargando v-show="storeToonerModelo.cargando === true" key="2"
      style="position: fixed; right: 20px ; z-index: 20; " 
      mensaje="Cargando"
    /> 
    <AlertSuccess v-show="storeToonerModelo.editarExitoso === true" key="3"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Editado"
      icon="mdi-pencil-outline"
    /> 
    <AlertError v-show="storeToonerModelo.ocurrioUnError === true" key="4"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="ERROR"
    />
    <AlertSuccess v-show="storeToonerModelo.envioExitoso === true" key="5"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargado con exito"
    />  
  </v-slide-x-transition>
</div>

<!-- crear nuevo modelo de tooner -->
<DialogForm

  id_boton="creacionModeloTooner"
  :titulo_dialog="tituloDialogModeloTooner"
  boton_titulo="Nuevo Tooner"
  @crear="storeToonerModelo.crearModeloTooner"

  @modo-crear="modoEditar === false ? storeToonerModelo.resetearFormModeloTooner() : null"
  @editar-dialog-form="storeToonerModelo.editarModeloTooner({id:IdEditar})"
  @cerrar="modoEditar = false"
  :modo-editar="modoEditar"
>
  <template #contenido>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="storeToonerModelo.formToonerModelo.marca"
            label="Marca"
            maxlength="20"
            counter
            :rules="ruleNoEmpty"
            hint="Marca del Tooner"
            persistent-hint
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="storeToonerModelo.formToonerModelo.modelo"
            label="Modelo"
            hint="Modelo del Tooner"
            maxlength="20"
            counter
            :rules="ruleNoEmpty"
            persistent-hint
          >
          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="storeToonerModelo.formToonerModelo.descripsion"
            counter
            label="Descripsion"
            hint="Descripsion del Modelo de Tooner (opcional)"
            maxlength="400"
            persistent-hint
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </template>
</DialogForm>
<!-- //barra de busqueda -->
<v-form @submit.prevent>
  <v-row justify="center" class="mt-2" > 
    <v-col cols="12" md="4">
      <v-autocomplete
      v-model="storeToonerModelo.FiltroToonerModelo.marca"
      :items="storeToonerModelo.FiltrobusquedaMarcaModelo_autocomplete.marca" 
      label="Marca" 
      hide-details="auto" 
      density="compact"   />
    </v-col>

    <v-col cols="12" md="4">
      <v-autocomplete 
        v-model="storeToonerModelo.FiltroToonerModelo.modelo"
        :items="storeToonerModelo.FiltrobusquedaMarcaModelo_autocomplete.modelo" 
        label="Modelo"
        hide-details="auto" 
        density="compact">
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="1">
      <v-btn type="submit" @click="storeToonerModelo.ObtenerModeloTooner()" class="px-2">Buscar</v-btn>
    </v-col>
  </v-row>
</v-form>
<!-- cards de los modelos -->
<v-card height="650px" color="background" elevation="10" border position="relative"   
  class="my-10 py-8 overflow-auto bg-none rounded d-flex flex-wrap justify-center align-start ga-2">
  <v-slide-y-transition group>
    <!-- <div v-for="n in storeToonerModelo.itemsToonerModelo" :key="n">{{ n }}</div> -->

    <CardImage color="surface" width="280"  height="230" v-for="(tooner,index) in storeToonerModelo.itemsToonerModelo" :key="index"
    src-image="/images/toonerImage.png "
    :ocultar-boton-seleccion="true"  
    :title="tooner.marca" 
    :subtitle="tooner.modelo">
      <template #menu>
        <MenuDropdown
          @editar="activarModoEditar({tooner:tooner})"
          @eliminar="storeToonerModelo.eliminarModeloTooner({id:tooner.id})"
          @descripcion="enviar"
          ocultar-descripsion
        />
      </template>>
    </CardImage>
  </v-slide-y-transition>
</v-card>
<!-- paginacion -->
<div class="d-flex justify-space-between align-center pa-2" style="position: relative;">
  <v-pagination 
    class="mx-auto" 
    :density="'compact'" 
    v-model="storeToonerModelo.toonerModeloPaginacion.page" 
    :total-visible="3" 
    :length="storeToonerModelo.toonerModeloPaginacion.totalPages">
  </v-pagination>
  <div v-show="name !== 'xs'" style="position: absolute; right: 0; top: 50%;transform: translate(0%, -25%);">
    <v-select
      density="compact"
      :items="[10,20,30,40,50,300,10000]"
      v-model="storeToonerModelo.toonerModeloPaginacion.perPage"
    />
  </div>
</div>

</template>


<script setup>
import { useDisplay } from 'vuetify'
import {useToonerModeloStore} from '~/stores/impresoras/toonerModelo'

const storeToonerModelo = useToonerModeloStore()

const {toonerModeloPaginacion} = storeToRefs(storeToonerModelo)

const tituloDialogModeloTooner = ref("Crear Modelo de Tooner")

const { name } = useDisplay()

const ruleNoEmpty = [
  value => {
    if (value) return true
    return 'Debe rellenar el campo'
  },
]

function enviar(){
  console.log("enviado")
}

const IdEditar = ref()
const modoEditar =ref(false)
function activarModoEditar({tooner}){
  modoEditar.value = true;
  document.querySelector('#creacionModeloTooner').click();


  storeToonerModelo.formToonerModelo.marca = tooner.marca
  storeToonerModelo.formToonerModelo.modelo = tooner.modelo
  storeToonerModelo.formToonerModelo.descripsion = tooner.descripsion

  IdEditar.value = tooner.id

}

onMounted(()=>{
  storeToonerModelo.ObtenerModeloTooner()
})

watch(
  () => toonerModeloPaginacion.value.page,
  (newValor) => {
    storeToonerModelo.ObtenerModeloTooner()
  },{deep:true, flush:'post'}
)

watch(
  () => toonerModeloPaginacion.value.perPage,
  (newValor) => {
    storeToonerModelo.ObtenerModeloTooner()
  },{deep:true, flush:'post'}
)

watch(
  () => modoEditar.value,
  (newValor) => {
    if(modoEditar.value == false){
      tituloDialogModeloTooner.value = "Crear Modelo Tooner"
    }else{
      tituloDialogModeloTooner.value = "Editar Modelo Tooner"
    }
  },{flush:'post'}
)
</script>