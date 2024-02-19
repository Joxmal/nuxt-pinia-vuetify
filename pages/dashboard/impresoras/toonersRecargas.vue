<template>
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

<!-- crear nuevo modelo de tooner -->
<DialogForm
  id_boton="creacionModeloTooner"
  :titulo_dialog="tituloDialogToonerRecarga"
  boton_titulo="Nuevo Tooner"

  @cerrar="modoEditar = false"
  :modo-editar="modoEditar"
>
  <template #contenido>
    <!-- seleccion del medelo de tooner -->
    <v-row>
      <v-col>
        <DialogGeneralSimple id-boton="MostrarModelos" :ocultar-boton="false" name-boton="Modelo Tooner">
              <template #contenido>
                <div style="width: 80%; margin: 0 auto; " >
                  <v-card max-height="90vh" style="overflow: auto;" position="relative"  elevation="15" class="d-flex flex-column ga-2">
                  
                  </v-card>
                </div>
              </template>
        </DialogGeneralSimple>

        <CardImage class="mx-auto mt-2" color="surface" width="280"  height="100"  
        src-image="/images/toonerImage.png " 
        ocultar-boton-seleccion
        subtitle="Marca <br> <b style='color:red;'> Modelo</b> "
        >
        </CardImage>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Nro Item"
            maxlength="20"
            counter
            :rules="ruleNoEmpty"
            hint="numero unico del tooner"
            persistent-hint
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
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="12">
          <v-card style="border: 2px solid rgb(6, 143, 255);" variant="elevated" class="pa-1">
            <v-card-title class="text-center">fecha de entrada</v-card-title>
            <v-divider :thickness="3" class="border-opacity-50"></v-divider>
            <v-sheet class="mt-2 d-flex flex-column justify-center align-center font-weight-black">
              <input class="mx-auto" type="datetime-local" min="2023-01-01" max="2024-12-30"
              >
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
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </template>
</DialogForm>

<pre>
  {{ storeToonersRecargas.itemsToonerRecarga }}
</pre>


<v-btn @click="storeToonersRecargas.obtenerToonersRecargas()"> +</v-btn>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import {useToonersRecargasStore} from '~/stores/impresoras/toonerRecargas'
const storeToonersRecargas = useToonersRecargasStore()

const { name } = useDisplay()

const tituloDialogToonerRecarga = ref("crear nuevo Tooner")

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

const ruleNoEmpty = [
  value => {
    if (value) return true
    return 'Debe rellenar el campo'
  },
]
</script>