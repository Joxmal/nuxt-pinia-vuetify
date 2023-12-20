<template>
    {{ rangoFecha }}
    <v-container v-if="!resultadoConsulta" class="text-md-500 d-flex  justify-center">
        <SVGSpinnerFrames/>
    </v-container>

    <v-container v-else class="border">
        <v-row align="center" align-content='center' class="py-4" style="background-color: rgba(44, 230, 255, 0.099);" >
            <v-col cols="12" md="4">
                <v-select :density="'comfortable'" v-model="seleccionUsuario" :items="useStoreConexion().usuarioListaMap" :item-props="itemProps"  label="seleccionar creador"> </v-select>
            </v-col>
            <v-col cols="12" md="4" class="d-flex flex-column justify-center text-center">
                    <label>
                        <input type="checkbox" v-model="rangoFecha"  >
                        Rango
                    </label>



                        <div class="d-flex ga-2 text-center justify-center " v-if="rangoFecha">
                            <v-sheet>
                                DESDE <input  type="date" v-model="variablesFiltro.fechaPeticion.rango.desde"> <br> {{ variablesFiltro.fechaPeticion.rango.desde }}
                            </v-sheet>
    
                            <v-sheet>
                                HASTA <input type="date" v-model="variablesFiltro.fechaPeticion.rango.hasta"> <br> {{ variablesFiltro.fechaPeticion.rango.hasta }}
                            </v-sheet>
                        </div>

                        <v-sheet v-else>
                            FECHA <br> <input type="date" v-model="variablesFiltro.fechaPeticion.fecha"> <br> {{ variablesFiltro.fechaPeticion.fecha }}
                        </v-sheet>

            </v-col>

            <v-col cols="12" md="4">
                <v-btn @click="construirConsulta()">buscar</v-btn>
            </v-col>

            <v-col cols="12">
                {{ filterBuscar }}

            </v-col>



        </v-row>

        <v-row  justify="center" align-content="start" class=" min-height-200 overflow-overlay">

            <v-col class="d-flex justify-center aling-center"  v-if="!LoadinCargaPage" v-for="item in resultadoConsulta.items">
                <v-card   color="primary"  width="200" height="250">
                    {{ item.tipoReporte }}
                </v-card>
            </v-col>

                    
            <div v-else class=" d-flex justify-center align-center text-h1 h-100">
                <SVGSpinnerFrames/>
            </div>

        </v-row>
            
            
        <v-row justify="center">
            <v-divider></v-divider>
            <v-pagination class="my-4" :total-visible="7" v-model="pagination" :length="numeroPaginas"></v-pagination>
        </v-row>
            
    </v-container>

    <pre>
        {{ resultadoConsulta }}
    </pre>
</template>


<script setup>
import PocketBase from 'pocketbase'

definePageMeta({
  middleware:'autenticacion'
})

const pagination = ref(1)


const seleccionUsuario = ref({
  name: useStoreConexion().avatarNombre,
  id: useStoreConexion().avatarID
})

//activar o desactiva rango de las fechas
const rangoFecha = ref()

const filterBuscar = ref()



function itemProps (item) {
  return {
    title: item.name,
  }
}

const variablesFiltro = reactive({
  filtroCreador: `creador="${seleccionUsuario.value.id}"`,
  fechaPeticion: {
    rango: {
      desde: obtenerPrimerDiaMes(),
      hasta: obtenerUltimoDiaMes()
    },
    fecha:obtenerDiaActual()
  }
})

filterBuscar.value = ` ${variablesFiltro.filtroCreador} &&  fechaEntrada >= "${variablesFiltro.fechaPeticion.rango.desde}" && fechaEntrada <= "${variablesFiltro.fechaPeticion.rango.hasta}" `


const resultadoConsulta = ref(null)
const numeroPaginas = ref(4)
const LoadinCargaPage = ref(true) 




const realizarPeticion = async () => {
    LoadinCargaPage.value=  true
  try {
    const pb = new PocketBase(useRuntimeConfig().public.POCKETBASE_URL)
    const resultList = await pb.collection('reportes').getList(pagination.value, 10, {
      sort: '-created',
      filter: filterBuscar.value,
    })
    resultadoConsulta.value = resultList
    numeroPaginas.value = resultList.totalPages
  } catch (error) {
    console.log(error.response)
  }
  LoadinCargaPage.value =  false
}








onBeforeMount(() => {
  realizarPeticion()
})

watch(pagination, () => {
  realizarPeticion()
})

function construirConsulta(){
    //reiniciar paginacion
    pagination.value = 1
    

    variablesFiltro.filtroCreador = `creador="${seleccionUsuario.value.id}"`

    if (seleccionUsuario.value.id==="jlpwz10ms03on6z") {
        filterBuscar.value = ``
    }else{
    }
    
    if (rangoFecha.value ===true) {

        if (seleccionUsuario.value.id==="jlpwz10ms03on6z") {
            filterBuscar.value = `fechaEntrada >= "${variablesFiltro.fechaPeticion.rango.desde}"  && fechaEntrada <= "${variablesFiltro.fechaPeticion.rango.hasta}" `
        }else{
            filterBuscar.value = ` ${variablesFiltro.filtroCreador} && fechaEntrada >= "${variablesFiltro.fechaPeticion.rango.desde}"  && fechaEntrada <= "${variablesFiltro.fechaPeticion.rango.hasta}" `
        }
    }else{
        if (seleccionUsuario.value.id==="jlpwz10ms03on6z") {
            filterBuscar.value = `fechaEntrada ~ "${variablesFiltro.fechaPeticion.fecha}"`
        }else{
            filterBuscar.value = ` ${variablesFiltro.filtroCreador} && fechaEntrada ~ "${variablesFiltro.fechaPeticion.fecha}"`
        }
    }

    realizarPeticion()
}

function obtenerDiaActual(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
    const día = fechaActual.getDate();

    const fechaFormateada = `${año}-${mes}-${día}`;
    return fechaFormateada
}

function obtenerPrimerDiaMes(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
    const día = 1
    const fechaFormateada = `${año}-${mes}-${día}`;
    return fechaFormateada
}

function obtenerUltimoDiaMes(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
    const últimoDía = new Date(año, mes, 0).getDate();
    const fechaFormateada = `${año}-${mes}-${últimoDía}`;
    return fechaFormateada
}

</script>


<style scoped>
.text-md-500{
    width: 500px;
    font-size: 500px;
}

.min-height-200 {
  height: 70vh;
}

.overflow-overlay {
  overflow: overlay;
}


::-webkit-scrollbar {
  width: 1px;               /* width of the entire scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: rgb(102, 189, 255);    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */  /* creates padding around scroll thumb */
}
</style>