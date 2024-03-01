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

<!-- dialogo oculto que abre los detalles -->
<DialogGeneralSimple id-boton="DescripsionDesincorporacion" :ocultar-boton="true">
    <template #contenido>
      <div style="width: 100%; margin: 0 auto; " >
        <v-card max-height="90vh" style="overflow: auto;" position="relative"  elevation="15" class="d-flex flex-column ga-2">
          <v-card-title class="text-center">TITULO</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Direccion IP
                </div>
                <div>
                  COLOCAR IP
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  Responsable
                </div>
                <div>
                  COLOCAR RESPONSABLE
                </div>
              </div>
            </v-col>

            <v-col cols="12" sm="4">
              <div class="font-weight-black  d-flex flex-column  align-center">
                <div>
                  creado
                </div>
                <div>
                  COLOCAR CREACION
                </div>
              </div>
            </v-col>
          </v-row>
          <v-divider ></v-divider>
          <v-container>
            <v-row class="">
                <!-- SE REPITE LOS CAMPOS -->
              <!-- <v-col cols="12" sm="4" v-for="(componente,index) in recorridoDetalles.length">
                <div style="border: 2px solid rgb(65, 104, 189); border-radius: 10px;">
                  <v-sheet class="ma-2 pa-2 text-center font-weight-black">
                    {{ recorridoDetalles[index] }} <v-icon :icon="iconosDetalles[index]"></v-icon> 
                  </v-sheet>
                  <v-divider></v-divider>
                  <v-sheet class="ma-2 pa-2 text-center font-weight-black">
                    {{ store.equipoDetalles[`${recorridoDetalles[index]}`] === "" ? '-' : store.equipoDetalles[`${recorridoDetalles[index]}`]  }} 
                  </v-sheet>
                </div>
              </v-col> -->
            </v-row>

            <v-divider  class="my-4 border-opacity-0"></v-divider>

            <!-- <v-carousel height="400" progress="warning"  hide-delimiter-background hide-delimiters show-arrows="hover" 
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
            </v-carousel> -->
          </v-container>
        </v-card>
      </div>
    </template>
</DialogGeneralSimple>


<DialogForm
    @crear="storeCrear.crearNuevaDesincorporacion()"
    id_boton="Boton/Crear/Editar"
    boton_titulo="Nueva Desincorporación">
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
            rows="1"
            v-model="storeCrear.form.descripsion"
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </template>
</DialogForm>

<v-card height="650px" color="background" elevation="10" border position="relative"   
  class=" py-8 overflow-auto bg-none rounded d-flex flex-wrap justify-center align-start ga-2">
  <v-slide-y-transition group>
    <CardImage  width="350"  height="230" v-for="(item,index) in storeCrear.itemsDesincorporacion" :key="index"
    src-image="/images/toonerImage.png "
    ocultar-boton-seleccion  
    :title="`${item.tipo_Equipo}`" 
    :subtitle="` ${item.equipo}<br><br> <b style='color:black;'>${item.nro_bien}</b>`"
    button-name="">
      <template #menu>
        <MenuDropdown
          @eliminar="storeCrear.eliminarDesincorporacion({ID:item.id})"
          @editar="saludar"
          @descripcion="saludar"
        />

        <v-sheet border  class="text-h5 px-2 rounded-lg" density="compact" color="surface" elevation="20" position="absolute" location="top">
          {{  new Date(item.fecha_desincorporado).toLocaleDateString() }}
        </v-sheet>
      </template>
    </CardImage>
  </v-slide-y-transition>
</v-card>


</template>

<script setup>
import {useCrearDesincorporacion} from '~/stores/desincorporar/crear'
import {obtenerFechaHoraActual} from '~/assets/funciones_reuzables/times'

const ruleNoEmpty = [
  value => {
    if (value) return true
    return 'Debe rellenar el campo'
  },
]

const storeCrear = useCrearDesincorporacion()


onBeforeMount(async()=>{
    await storeCrear.obtenerDesincorporacion()
    storeCrear.form.fecha_desincorporado = obtenerFechaHoraActual()
})

onMounted(()=>{
console.log(obtenerFechaHoraActual())
})

function saludar(){
console.log("saludando")
}
</script>