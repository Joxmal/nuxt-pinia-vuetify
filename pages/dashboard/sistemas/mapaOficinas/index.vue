<template>

  <CardImage :elevation="10" class="py-2 my-2"  max-width="800" v-for="(piso,index) in nombresPisos" :key="index"
    :title="index"
    @boton="redireccion({piso:piso.parametro})"
  />

  <pre>
    {{datos}}
  </pre>
</template>
<script setup>

const route = useRoute()
const router = useRouter()

const nombresPisos={
  'TERCER PISO':{
    parametro:3
  },
  'SEGUNDO PISO':{
    parametro:2
  },
  'PRIMER PISO':{
    parametro:1
  },
  'SOTANO':{
    parametro:0
  },


}

async function redireccion({piso}){
  await navigateTo({ path: `/dashboard/sistemas/mapaOficinas/${piso}`,query:{piso:"sdsd"}})
}

const datos = ref()
onMounted( async()=>{
  
})
</script>