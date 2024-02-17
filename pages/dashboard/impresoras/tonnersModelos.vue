<template>
<div>
  <v-slide-x-transition group>
    <AlertWarning v-show="StoreImpresoras.eliminarExitoso === true" key="1"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Eliminado con exito"
    />
    <AlertCargando v-show="StoreImpresoras.cargando === true" key="2"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargando"
    /> 
    <AlertSuccess v-show="StoreImpresoras.editarExitoso === true" key="3"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Editado"
      icon="mdi-pencil-outline"
    /> 
    <AlertError v-show="StoreImpresoras.ocurrioUnError === true" key="4"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="ERROR"
    />
    <AlertSuccess v-show="StoreImpresoras.envioExitoso === true" key="5"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargado con exito"
    />  
  </v-slide-x-transition>
</div>

<!-- crear nuevo equipo -->
<DialogForm

  id_boton="creacionModeloTooner"
  :titulo_dialog="'Crear Tooner'"
  boton_titulo="Nuevo Tooner"
  @crear="StoreImpresoras.crearModeloTooner"
>
  <template #contenido>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
          v-model="StoreImpresoras.formToonerModelo.marca"
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
            v-model="StoreImpresoras.formToonerModelo.modelo"
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
            v-model="StoreImpresoras.formToonerModelo.descripsion"
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

<v-card height="650px" color="background" elevation="10" border position="relative"   
  class="my-10 py-8 overflow-auto bg-none rounded d-flex flex-wrap justify-center align-start ga-2">
  <v-slide-y-transition group>
    <!-- <div v-for="n in StoreImpresoras.itemsToonerModelo" :key="n">{{ n }}</div> -->

    <CardImage color="surface" width="280"  height="230" v-for="(tooner,index) in StoreImpresoras.itemsToonerModelo" :key="index"
    src-image="/images/toonerImage.png "
    :ocultar-boton-seleccion="true"  
    :title="tooner.marca" 
    :subtitle="tooner.modelo">
      <template #menu>
        <MenuDropdown
          @editar="enviar"
          @eliminar="enviar"
          @descripcion="enviar"
        />
      </template>>
    </CardImage>
  </v-slide-y-transition>
</v-card>

<div class="d-flex justify-space-between align-center pa-2" style="position: relative;">
  <v-pagination 
    class="mx-auto" 
    :density="'compact'" 
    v-model="StoreImpresoras.toonerModeloPaginacion.page" 
    :total-visible="3" 
    :length="StoreImpresoras.toonerModeloPaginacion.totalPages">
  </v-pagination>
  <div v-show="name !== 'xs'" style="position: absolute; right: 0; top: 50%;transform: translate(0%, -25%);">
    <v-select
      density="compact"
      :items="[10,20,30,40,50,300,10000]"
      v-model="StoreImpresoras.toonerModeloPaginacion.perPage"
    />
  </div>
</div>

</template>


<script setup>
import { useDisplay } from 'vuetify'


const {toonerModeloPaginacion} = storeToRefs(useImpresorasStore())


const { name } = useDisplay()
const StoreImpresoras = useImpresorasStore()

const ruleNoEmpty = [
  value => {
    if (value) return true
    return 'Debe rellenar el campo'
  },
]

function enviar(){
  console.log("enviado")
}

onMounted(()=>{
  StoreImpresoras.ObtenerModeloTooner()
})

watch(
  () => toonerModeloPaginacion.value.page,
  (newValor) => {
    StoreImpresoras.ObtenerModeloTooner()
  },{deep:true, flush:'post'}
)

watch(
  () => toonerModeloPaginacion.value.perPage,
  (newValor) => {
    StoreImpresoras.ObtenerModeloTooner()
  },{deep:true, flush:'post'}
)
</script>