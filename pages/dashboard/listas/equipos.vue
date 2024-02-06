<template>
  <!-- alertas -->
  <div>
    <v-slide-x-transition group>
      <AlertWarning v-show="store.eliminarExitosoOficina === true" key="1"
        style="position: fixed; right: 20px; z-index: 20;" 
        mensaje="Eliminado con exito"
      />
      <AlertCargando v-show="store.cargando === true" key="2"
        style="position: fixed; right: 20px; z-index: 20;" 
        mensaje="Cargando"
      /> 
      <AlertSuccess v-show="store.editarExitosoOficina === true" key="3"
        style="position: fixed; right: 20px; z-index: 20;" 
        mensaje="Editado"
        icon="mdi-pencil-outline"
      /> 
      <AlertError v-show="store.ocurrioUnError === true" key="4"
        style="position: fixed; right: 20px; z-index: 20;" 
        mensaje="ERROR"
      /> 
    </v-slide-x-transition>
  </div>

  <!-- crear nuevo equipo -->
  <DialogForm
    id_boton="creacionEquipo"
    :titulo_dialog="'Creacion de equipo'"
    @crear="store.crearEquipo()"
  >
    <template #contenido>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              label="Piso"
              :items="[0,1,2,3,4,5]"
              hint="5 = fuera del edificio"
              persistent-hint
              v-model="store.form.piso"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-autocomplete
              label="Dirección"
              :items="useIPListaStore().listaDepartamento"
              hint="ubicacion del departamento"
              persistent-hint
              v-model="store.form.direccion"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-autocomplete
              label="Responsable"
              :items="store.listaDeTrabajadores"
              hint="Responsable del equipo"
              persistent-hint
              :custom-filter="customFilter"
              item-title="trabajador"
              item-value="valor"
              v-model="store.form.responsable"
              @update:model-value="actualizarIPV4"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              label="IPV4"
              hint="direccion ip del equipo (opcional)"
              persistent-hint
              v-model="store.form.ipv_4"
              disabled
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              label="Monitor"
              hint="colocar el monitor de la pc"
              persistent-hint
              v-model="store.form.monitor"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              label="CPU"
              hint="colocar el CPU de la pc"
              persistent-hint
              v-model="store.form.cpu"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              label="Impresora"
              hint="(opcional) colocar impresora"
              persistent-hint
              v-model="store.form.impresora"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              label="Memoria RAM"
              hint="Cantidad memoria RAM de la pc"
              persistent-hint
              v-model="store.form.ram"
              type="number"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              label="Almacenamiento"
              hint="Disco duro o SSD del pc"
              persistent-hint
              v-model="store.form.almacenamiento"
              type="number"
            />
          </v-col>
          <v-col cols="12">
            <v-file-input
                multiple
                show-size
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                prepend-inner-icon="mdi-camera"
                hint="solo PNG, JPEG, BMP (opcional)"
                persistent-hint
                prepend-icon=""
                label="Imagenes PC (opcional)"
                @change="previewImage"
                @click:clear="clearImagePreview"
                v-model="images">
              </v-file-input>
            </v-col>
        </v-row>
        <v-carousel touch :interval="3000" :cycle="false" progress="warning"  hide-delimiter-background hide-delimiters show-arrows="hover" v-if="imagePreview.length > 0" >
          <v-carousel-item v-for="(image, index) in imagePreview" :key="index">
            <v-img :src="image" alt="Preview"></v-img>
          </v-carousel-item>
        </v-carousel>
        <div v-else>
          No hay imágenes seleccionadas.
        </div>
      </v-container>
    </template>
  </DialogForm>
<v-btn @click="console.log(store.form)" >formulario</v-btn>
<!-- <pre>
  {{ store.form }}
</pre>
---------
<pre>
  {{ store.listaDeTrabajadores }}
</pre> -->
</template>


<script setup>
import { useEquipos } from '~/stores/equipos';

function customFilter (itemTitle, queryText, item) {
    const trabajador = item.raw.trabajador.toLowerCase()
    const valor = item.raw.ID.toLowerCase()
    console.log(valor)
    const searchText = queryText.toLowerCase()
    return trabajador.indexOf(searchText) > -1 || valor.indexOf(searchText) > -1
  }
const store = useEquipos()

//imagen (opcional)
const images = ref([]);
const imagePreview =ref([])
/////reglas del tamaño 

function previewImage(event){
  imagePreview.value = [];
  for (const file of images.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value.push(e.target.result);
  };  reader.readAsDataURL(file);
  }
  store.form.imagenes = images.value
}

function clearImagePreview(){
  imagePreview.value = []
  if(store.form.imagenes){
    delete store.form.imagenes
  }
}

const rules = [
  value => {
    return !value || !value.length || value[0].size < 2000000 || 'cada archivo de pesar menos de 2MB'
  },
]
//------------------------

// watch(() => pinia.state.myStore.myProperty, (newValue) => {
//   // Realiza las acciones que desees cuando la propiedad cambie
//   console.log('La propiedad cambió a', newValue);
// });

function actualizarIPV4(){
  const ip = store.listaDeTrabajadores.filter((trabajador)=>{
    return store.form.responsable == trabajador.trabajador
  })
  store.form.ipv_4 = ip[0].IP
  store.form.responsable= ip[0].ID
}

onMounted(()=>{
  store.obtenerDatosTrabajadores()
})
</script>