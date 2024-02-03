<template>
  <!-- alertas -->
  <div>
    <AlertWarning v-show="store.eliminarExitosoOficina === true"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Eliminado con exito"
    />
    <AlertCargando v-show="store.cargando === true"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargando"
    />
  </div>

  <!-- crear nueva oficina -->
  <dialog-form
  id_boton="FormularioOficina"
  @crear="crearOficina"
  @modo-crear="activarModoEditar = false"
  :mostrar_alert_create= store.envioExitosoOficina
  :modo-editar="activarModoEditar"
  :titulo_dialog="activarModoEditar ? 'EDITAR OFICINA' : 'CREAR OFICINA'"
  >
    <template #contenido>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete
                :items="useIPListaStore().listaDepartamento"
                label="Nombre Oficina"
                hint="Nombre de la oficina"
                persistent-hint
                v-model = store.form.oficina>
              </v-autocomplete>
            </v-col>

              <v-col cols="12" md="6">
                <v-file-input
                  show-size
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Sube imagen del Mapa"
                  prepend-inner-icon="mdi-camera"
                  hint="solo PNG, JPEG, BMP"
                  persistent-hint
                  prepend-icon=""
                  label="Imagen Piso"
                  @change="previewImage"
                  @click:clear="clearImagePreview"
                  v-model="imagen"
                >
                </v-file-input>
              </v-col>
          </v-row>
          <v-img
              aspect-ratio="16/9"
              cover
              :src="imagePreview"
              v-if="imagePreview"
            ></v-img>
        </v-container>
    </template>
  </dialog-form>

  <!-- dialogo oculto de la imagen espesifica por oficina -->
  <!-- este dialogo intectatua con la foto, y la descripsion (cambia su contenido) -->
  <dialog-general-simple id-boton="MostrarImagen">
    <template #contenido>
          <v-img
            max-height="90vh" width="80vw"
            :src="imagenDialog"
            class="align-end text-white bg-cyan-lighten-5 rounded-lg"
            aspect-ratio="1/1"
            >
          </v-img>
    </template>

  </dialog-general-simple>

<!-- cada card con su respectiva oficina -->
  <div class="d-flex flex-wrap justify-center ga-4 mt-10">
    <v-slide-y-transition group>  
      <card-image width="360" v-for="(oficina,index) in store.datos" :key="index"
        :title="oficina.oficina"
        :src-image="`${useRuntimeConfig().public.POCKETBASE_URL}api/files/${store.datos[index].collectionId}/${store.datos[index].id}/${store.datos[index].imagen}`"
        @boton="enviarDatosImagen(`${useRuntimeConfig().public.POCKETBASE_URL}api/files/${store.datos[index].collectionId}/${store.datos[index].id}/${store.datos[index].imagen}`)"
      >
        <template #menu>
          <MenuDropdown
            @editar="abrirModoEdicion"
            @eliminar="botonEliminarOficina({id:oficina.id})"
            @descripcion="saludo"
          />
        </template>>
      </card-image>
    </v-slide-y-transition> 
  </div>
</template>


<script setup>
import { usemapaOficinas } from '~/stores/mapaOficinas';

import {useIPListaStore} from '~/stores/ip_lista';


const saludo =()=> console.log('saludo')

const store = usemapaOficinas()

const $route = useRoute()

const imagen= ref()

const rules = [
  value => {
    return !value || !value.length || value[0].size < 2000000 || 'Debe pegar menos de 2MB'
  },
]

const imagePreview =ref(null)

const previewImage = (event) => {
  store.form.imagen = event.target.files[0]
  console.log(event.target.files[0].name)
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
  imagePreview.value = e.target.result;
  };

  reader.readAsDataURL(file);
};

const clearImagePreview = ()=>{
  imagePreview.value = null
}

async function crearOficina(){
  store.form.oficina === '' || store.form.imagen === null ? alert('rellene los datos') : await store.crearOficina()
  console.log("actualizando")
  await store.obtenerDatos($route.params.piso)
}

function botonEliminarOficina({id}){
  store.EliminarOficina({ID_Oficina:id})
  store.obtenerDatos($route.params.piso)
}

const imagenDialog = ref()
function enviarDatosImagen(imagen){
  imagenDialog.value = imagen
  const imagenMostrar = document.querySelector('#MostrarImagen')
  imagenMostrar.click()
}

onMounted( async()=>{
  store.form.piso = $route.params.piso
  store.obtenerDatos($route.params.piso)
})

onUnmounted(()=>{
  store.form.imagen=null
  store.form.oficina=""
})

const activarModoEditar = ref(false)
function abrirModoEdicion(){
  document.querySelector('#FormularioOficina').click()
  activarModoEditar.value = true
}




</script>