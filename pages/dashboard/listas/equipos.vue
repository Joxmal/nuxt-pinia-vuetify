<template>
<!-- alertas -->
<div>
  <v-slide-x-transition group>
    <AlertWarning v-show="store.eliminarExitosoEquipo === true" key="1"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Eliminado con exito"
    />
    <AlertCargando v-show="store.cargando === true" key="2"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargando"
    /> 
    <AlertSuccess v-show="store.editarExitosoEquipo === true" key="3"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Editado"
      icon="mdi-pencil-outline"
    /> 
    <AlertError v-show="store.ocurrioUnError === true" key="4"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="ERROR"
    />
    <AlertSuccess v-show="store.envioExitosoEquipo === true" key="5"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargado con exito"
    />  
  </v-slide-x-transition>
</div>
<!-- crear nuevo equipo -->
<DialogForm

  id_boton="creacionEquipo"
  :titulo_dialog="'Creacion de equipo'"
  boton_titulo="Nuevo Equipo"
  @crear="crearEquipo"
  @modo-crear="modoEditar = false"
  @editar-dialog-form="store.editarEquipo({id:IdEditar})"
  :boton-reset-formulario="true"
  @resetearFormulario="store.resetearForm()"
  :modo-editar="modoEditar"

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
            :items="useListasStore().listaDepartamento"
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
            item-title="trabajador"
            item-value="ID"
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
          <v-autocomplete
            label="Monitor"
            :items="useListasStore().listaMonitor"
            :rules="ruleNoEmpty"
            hint="colocar el monitor de la pc"
            persistent-hint
            v-model="store.form.monitor"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            label="CPU"
            :items="useListasStore().listaCPU"
            :rules="ruleNoEmpty"
            hint="colocar el CPU de la pc"
            persistent-hint
            v-model="store.form.cpu"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            label="Impresora"
            :rules="ruleNoEmpty"
            :items="useListasStore().listaImpresoras"
            hint="(opcional) colocar impresora"
            persistent-hint
            v-model="store.form.impresora"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            :rules="ruleNoEmpty"
            label="Memoria RAM"
            hint="Cantidad memoria RAM de la pc"
            persistent-hint
            v-model="store.form.ram"
            type="number"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            :rules="ruleNoEmpty"
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

<!-- dialogo oculto que abre los detalles -->
<DialogGeneralSimple id-boton="MostrarImagenes" :ocultar-boton="true">
    <template #contenido>
      <div style="width: 100%; margin: 0 auto; " >
        <v-card max-height="90vh" style="overflow: auto;" position="relative" v-if="Object.keys(store.equipoDetalles).length > 1" elevation="15" class="d-flex flex-column ga-2">
          <v-card-title class="text-center">{{ store.equipoDetalles.direccion }}</v-card-title>
          <v-sheet position="absolute" location="top right" class="ma-2"  variant="plain" >piso {{ store.equipoDetalles.piso }}</v-sheet>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Direccion IP
                </div>
                <div>
                  {{ store.equipoDetalles.ipv_4 }}
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Responsable
                </div>
                <div>
                  {{ store.equipoDetalles.expand.responsable.usuario }}
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  creado
                </div>
                <div>
                  {{ new Date( store.equipoDetalles.created).toLocaleDateString()  }}
                </div>
              </div>
            </v-col>
          </v-row>
          <v-divider ></v-divider>
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

            <v-divider  class="my-4 border-opacity-0"></v-divider>

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

<!-- barra de busqueda -->
<v-form @submit.prevent>
  <v-row justify="center" class="mt-2" > 
    <v-col cols="12" md="3">
      <v-text-field v-model="variablesFiltroEquipos.usuario" label="Usuario" hide-details="auto" density="compact"   />
    </v-col>

    <v-col cols="12" md="3">
      <v-autocomplete 
        v-model="variablesFiltroEquipos.piso" 
        :items="useIPListaStore().pisos" 
        label="Piso"
        item-title="nombre"
        item-value="piso"
        hide-details="auto" 
        density="compact">
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="3">
      <v-autocomplete v-model="variablesFiltroEquipos.departamento" :items="useListasStore().listaDepartamento" label="Departamento" hide-details="auto" density="compact"></v-autocomplete>
    </v-col>
    <v-col cols="12" md="1">
      <v-btn type="submit" @click="store.obtenerEquiposDB()" class="px-2">Buscar</v-btn>
    </v-col>
  </v-row>
</v-form>


<v-card height="650px" color="background" elevation="10" border position="relative"   
  class="my-10 py-8 overflow-auto bg-none rounded d-flex flex-wrap justify-center align-start ga-2">
  <v-slide-y-transition group>
    <CardImage color="surface" width="280"  height="230" v-for="(trabajador,index) in store.listaEquiposBD" :key="index"
    src-image="/images/pc.png "
    :ocultar-boton-seleccion="true"  
    :title="trabajador.direccion" 
    :subtitle="`${trabajador.expand.responsable.usuario}<br> piso-${trabajador.piso} `"
    button-name="">
      <template #menu>
        <MenuDropdown
          @editar="editarDescripsion({IDequipo:trabajador.id,equipo:trabajador})"
          @eliminar="eliminarEquipo({id:trabajador.id})"
          @descripcion="obtenerDescripsion(trabajador)"
        />
      </template>>
    </CardImage>
  </v-slide-y-transition>
</v-card>

<div class="d-flex justify-space-between align-center pa-2" style="position: relative;">
  <v-pagination class="mx-auto" :density="'compact'" :total-visible="3" v-model="store.paginacion.page" :length="store.paginacion.totalPages"></v-pagination>
  <div v-show="name !== 'xs'" style="position: absolute; right: 0; top: 50%;transform: translate(0%, -25%);">
    <v-select
      density="compact"
      :items="[10,20,30,40,50,300,10000]"
      v-model="store.paginacion.perPage"
    />
  </div>
</div>

<v-select
  class="mx-auto"
  style="width: 100px;"
  v-show="name === 'xs'"
  density="compact"
  :items="[10,20,30,40,50,300]"
  v-model="store.paginacion.perPage"
/>
 
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
</template>


<script setup>
import { useEquiposStore } from '~/stores/equipos';
import { useDisplay } from 'vuetify'
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://oficina-sgi.pockethost.io');

//no permitir caracteres vacios vuetify
const ruleNoEmpty = [
  value => {
    if (value) return true
    return 'Debe rellenar el campo'
  },
]

const {variablePrueba} = storeToRefs(useEquiposStore())
const {paginacion,variablesFiltroEquipos} = storeToRefs(useEquiposStore())
const { name } = useDisplay()

function customFilter (itemTitle, queryText, item) {
    const trabajador = item.raw.trabajador.toLowerCase()
    const valor = item.raw.ID.toLowerCase()
    const searchText = queryText.toLowerCase()
    return trabajador.indexOf(searchText) > -1 || valor.indexOf(searchText) > -1
  }
const store = useEquiposStore()



//imagen (opcional)
const images = ref([]);
const imagePreview =ref([])
/////reglas del tamaño 
const compressedImages = ref([]);

//obtener la imagen y agregarla al array 
function previewImage(event){
  imagePreview.value = [];
  for (const file of images.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value.push(e.target.result);
  };  reader.readAsDataURL(file);
  }

//-----------------------------------------------------
//creando imagenes comprimidas
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const maxHeight = 800;
        let width = image.width;
        let height = image.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const compressedImageFile = new File([blob], file.name, {
            type: 'image/webp',
            lastModified: Date.now(),
          });

          compressedImages.value.push(compressedImageFile);
        }, 'image/webp', 0.8);
      };
    };

    reader.readAsDataURL(file);
  }

  store.form.imagenes = compressedImages.value

}

function clearImagePreview(){
  imagePreview.value = []
  if(store.form.imagenes){
    delete store.form.imagenes
  }
}

async function eliminarEquipo({id}){
  await store.eliminarEquipo({IDequipo:id})
  await store.obtenerEquiposDB()
}

const rules = [
  value => {
    return !value || !value.length || value[0].size < 8000000 || 'cada archivo de pesar menos de 8MB'
  },
]
//------------------------

// watch(() => pinia.state.myStore.myProperty, (newValue) => {
//   // Realiza las acciones que desees cuando la propiedad cambie
//   console.log('La propiedad cambió a', newValue);
// });

function actualizarIPV4(){
  const ip = store.listaDeTrabajadores.filter((trabajador)=>{
    return store.form.responsable == trabajador.ID
  })
  
  console.log(store.listaDeTrabajadores)
  if(ip[0] && ip[0].IP){
    store.form.ipv_4 = ip[0].IP
  }
}
function obtenerDescripsion(objeto){
  const nuevoObjeto = {...objeto}

  document.querySelector('#MostrarImagenes').click()
  
  store.equipoDetalles = nuevoObjeto
  store.equipoDetalles.imagenes = store.obtenerArrayImagenes(nuevoObjeto)
  // console.log(nuevoObjeto)
  // console.log(store.obtenerArrayImagenes(nuevoObjeto))
  // console.log(store.equipoDetalles) 
}

async function crearEquipo() {
  const form = store.form;

  // Validar campos obligatorios
  const requiredFields = {
    piso: 'elige un piso',
    direccion: 'escoge una dirección de oficina',
    responsable: 'escoge un responsable',
    monitor: 'escoge un monitor',
    cpu: 'escoge un CPU',
    impresora: 'escoge una impresora',
    ram: 'escoge una memoria RAM',
    almacenamiento: 'escoge una cantidad de almacenamiento'
  };

  for (const field in requiredFields) {
    if (form[field] === null) {
      alert(requiredFields[field]);
      return;
    }
  }

  await store.crearEquipo();
  await store.obtenerEquiposDB();
}

const modoEditar =ref(false)
const IdEditar =ref()

async function editarDescripsion({IDequipo, equipo}) {
  console.log(equipo);
  console.log(equipo.responsable);

  store.form.piso = equipo.piso;
  store.form.direccion = equipo.direccion;
  store.form.ipv_4 = equipo.ipv_4;
  store.form.monitor = equipo.monitor;
  store.form.cpu = equipo.cpu;
  store.form.impresora = equipo.impresora;
  store.form.ram = equipo.ram;
  store.form.almacenamiento = equipo.almacenamiento;

  await Promise.all([
    // Agrega aquí todas las asignaciones que deben completarse antes de store.form.responsable
  ]);

  store.form.responsable = equipo.responsable;

  IdEditar.value = IDequipo;
  document.querySelector('#creacionEquipo').click();
  modoEditar.value = true;
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


// watch(paginacion,(newPage,oldPage)=>{
//   store.obtenerEquiposDB()
// },{ deep: true,flush: 'sync' })

watch(
  () => paginacion.value.page,
  (newValor) => {
    store.obtenerEquiposDB()
  },{deep:true, flush:'post'}
)

onMounted( async()=>{
  await store.obtenerDatosTrabajadores()
  await store.obtenerEquiposDB()
  
})
</script>
