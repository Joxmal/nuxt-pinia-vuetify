<template>
  {{ useListasStore().listaCPU }} <br>
  {{ useListasStore().listaDepartamento }} <br>
  {{ useListasStore().listaImpresoras }} <br>
  {{ useListasStore().listaMonitor }} <br>
  {{ useListasStore().listaTarjetaMadre }} <br> <hr>
  {{ itemsDepartamento }} <hr>json departamentos<hr>
  {{ jsonDepartamentos }}

  <div class="d-flex ga-6 justify-center flex-wrap">

  
  <v-card width="500" color="">
      <v-card-title>Departamentos</v-card-title>
      <v-card-subtitle>Lista de cada departamento</v-card-subtitle>
      <v-card-text>
        <div class="d-flex ga-2 flex-wrap  aling-center"> 

          <v-scroll-y-transition group>
            <v-chip   
              closable 
              @click:close="eliminarItemLista({listaDelItem:itemsDepartamento,posicion:i,jsonPinia:'jsonDepartamentos'}),activarBotonDepartamento = true"
              v-for="(item,i) in itemsDepartamento.listaDepartamento" :key="item" class=" text-center">
              {{ item }}
            </v-chip>
          </v-scroll-y-transition>
        </div>
        <v-form @submit.prevent>
          <v-text-field @keyup.enter="agregarNuevoItem({nuevoItem:NuevoDepartamento,listaDelItem:itemsDepartamento,jsonPinia:'jsonDepartamentos'}),activarBotonDepartamento = true" v-model="NuevoDepartamento"></v-text-field>
            <v-card-actions>
              <v-btn :disabled="!activarBotonDepartamento" @click="actualizarListas" variant="flat" class="mx-auto" color="primary">ACTUALIZAR BASE DE DATOS</v-btn>
            </v-card-actions>
        </v-form>
      </v-card-text>
  </v-card>

  </div>
</template>
  
<script setup>
  definePageMeta({
    middleware:'autenticacion',
  })

  const {jsonDepartamentos} = storeToRefs(useListasStore())

  //departamentos----------------
  const itemsDepartamento = ref({
    listaDepartamento:''
  })

  const NuevoDepartamento = ref('sd')

  function agregarNuevoItem({nuevoItem,listaDelItem,jsonPinia}) {
    if (nuevoItem === '') {
      return;
    }
    if(listaDelItem[Object.keys(listaDelItem)[0]].includes(nuevoItem.toUpperCase())){
      alert("No coloques repetidos")
      return
    }

    console.log(Object.keys(listaDelItem)[0])

    listaDelItem[Object.keys(listaDelItem)[0]].push(nuevoItem.toUpperCase());
    nuevoItem = "";
    console.log(jsonPinia)
    useListasStore()[`${jsonPinia}`] = listaDelItem;
  }
  //-------------------------

function eliminarItemLista({listaDelItem,posicion,jsonPinia}){
  console.log(Object.keys(listaDelItem)[0])
  listaDelItem[Object.keys(listaDelItem)[0]].splice(posicion,1)
  console.log(jsonPinia)
  console.log(useListasStore().jsonPinia)
  useListasStore()[`${jsonPinia}`] = listaDelItem;
}

const activarBotonDepartamento = ref(false)
async function actualizarListas(){
  if(confirm('¿Estas seguro que quieres guardar?, no se puede volver atras')){
    await useListasStore().cargarNuevoJson()
    await useListasStore().obtenerListas()
  }
}

onMounted( async()=>{
  await useListasStore().obtenerListas()
  itemsDepartamento.value.listaDepartamento = [...useListasStore().listaDepartamento]
})



</script>