<template>
  <dialog-form
  @crear="crearOficina"
  :mostrar_alert_create= store.envioExitosoOficina
  >
    <template #contenido>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Nombre Oficina"
                v-model="store.form.oficina"
              />
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


  <div class="d-flex flex-wrap justify-center ga-4">  
  <card-image width="360" v-for="(oficina,index) in datos" :key="index"
    :title="oficina.oficina"
    :src-image="`${useRuntimeConfig().public.POCKETBASE_URL}api/files/${datos[index].collectionId}/${datos[index].id}/${datos[index].imagen}`"
    @boton="enviarDatosImagen(`${useRuntimeConfig().public.POCKETBASE_URL}api/files/${datos[index].collectionId}/${datos[index].id}/${datos[index].imagen}`)"
  />
  </div>

  
  
{{ store.form }}
<p>User ID: {{ $route.params.piso }}</p>
<p>User ID: {{ $route.query.piso }}</p>
--
{{ imagenDialog }}
  <pre>
    {{ datos }}
  </pre>
</template>


<script setup>
import { usemapaOficinas } from '~/stores/mapaOficinas';
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
  store.form.oficina === '' || store.form.imagen === null ? alert('rellene los datos') : store.crearOficina()
  console.log("actualizando")
  datos.value = await store.obtenerDatos($route.params.piso)
}

const imagenDialog = ref()
function enviarDatosImagen(imagen){
  imagenDialog.value = imagen
  const imagenMostrar = document.querySelector('#MostrarImagen')
  imagenMostrar.click()
}

const datos = ref()
onMounted( async()=>{
  datos.value = await store.obtenerDatos($route.params.piso)
  store.form.piso = $route.params.piso
})
</script>