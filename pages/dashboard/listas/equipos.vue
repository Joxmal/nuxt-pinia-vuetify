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

  <DialogGeneralSimple id-boton="MostrarImagenes" :ocultar-boton="true">
      <template #contenido>
        <div style="width: 100%; margin: 0 auto; " >
          <v-card height="auto" style="overflow: auto;" position="relative" v-if="Object.keys(store.equipoDetalles).length > 1" elevation="15" class="d-flex flex-column ga-2">

            <v-card-title class="text-center">{{ store.equipoDetalles.direccion }}</v-card-title>
            <v-sheet position="absolute" location="top right" class="ma-2"  variant="plain" >piso {{ store.equipoDetalles.piso }}</v-sheet>

            <v-divider></v-divider>
            <div class="font-weight-black d-flex justify-space-between align-center">
              
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Direccion IP
                </div>
                <div>
                  {{ store.equipoDetalles.ipv_4 }}
                </div>
              </div>

              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Responsable
                </div>
                <div>
                  {{ store.equipoDetalles.expand.responsable.usuario }}
                </div>
              </div>

              <div class="font-weight-black  d-flex flex-column justify-center  align-center">
                <div>
                  creado
                  
                </div>

                <div>
                   {{ new Date( store.equipoDetalles.created).toLocaleDateString()  }}
                </div>
              </div>
            </div>
            <v-divider></v-divider>
            <v-container>
              <v-row class="">

                <v-col cols="12" sm="4" v-for="(componente,index) in recorridoDetalles.length">
                  <div style="border: 2px solid rgb(65, 104, 189); border-radius: 10px;">
                    <v-sheet class="ma-2 pa-2 text-center font-weight-black">
                      {{ recorridoDetalles[index] }} <v-icon :icon="iconosDetalles[index]"></v-icon> 
                    </v-sheet>
                    <v-divider></v-divider>
                    <v-sheet class="ma-2 pa-2 text-center font-weight-black">
                      {{ store.equipoDetalles[`${recorridoDetalles[index]}`] === "" ? '-' : store.equipoDetalles[`${recorridoDetalles[index]}`]  }} 
                    </v-sheet>
                  </div>
                </v-col>
              </v-row>

              <v-carousel height="400" progress="warning"  hide-delimiter-background hide-delimiters show-arrows="hover" 
                v-if="store.equipoDetalles.imagenes && store.equipoDetalles.imagenes.length > 0"
              :cycle="false" touch>
                <v-carousel-item v-for="(image, index) in store.equipoDetalles.imagenes" :key="index">
                  <v-img  
                    :src="image" alt="Preview"
                    lazy-src="/images/pc.png">
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
            </v-container>

          </v-card>
        </div>
      </template>
  </DialogGeneralSimple>


  <v-card height="1000px" color="background" position="relative" class="my-10 overflow-auto bg-none rounded d-flex flex-wrap justify-center align-start ga-2">
    <CardImage color="surface" width="280"  height="260" v-for="(trabajador,index) in store.listaEquiposBD" :key="index"
    src-image="/images/pc.png "
    :ocultar-boton-seleccion="true"  
    :title="trabajador.direccion" 
    :subtitle="trabajador.expand.responsable.usuario"
    button-name="">
      <template #menu>
          <MenuDropdown
            @editar=""
            @eliminar=""
            @descripcion="obtenerDescripsion(trabajador)"
          />
        </template>>
    </CardImage>

  </v-card>
<v-btn @click="console.log(store.form)" >formulario</v-btn>
<!-- <pre>
  {{ store.form }}
</pre>
---------
<pre>
  {{ store.listaDeTrabajadores }}
</pre> -->
<pre>
  {{ store.listaEquiposBD }}
</pre>

<div style="background-color: red; max-width: 900px;">
  <v-card title="titulo">
    <v-card-text>sdd</v-card-text>

  </v-card>
</div>
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
function obtenerDescripsion(objeto){
  document.querySelector('#MostrarImagenes').click()
  
  
  store.equipoDetalles = objeto
  store.equipoDetalles.imagenes = store.obtenerArrayImagenes(objeto)
  // console.log(store.obtenerArrayImagenes(objeto))
  console.log(store.equipoDetalles)
  
}
const recorridoDetalles=[
  'almacenamiento',
  'cpu',
  'impresora',
  'monitor',
  'ram'
]
const iconosDetalles=[
  'mdi-harddisk',
  'mdi-cpu-64-bit',
  'mdi-printer',
  'mdi-monitor',
  'mdi-memory'


]

onMounted( async()=>{
  await store.obtenerDatosTrabajadores()
  await store.obtenerEquiposDB()
  
})
</script>


<style scoped>
.custom-card {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}
</style>