<template>
  <!-- <div style="max-height: 150px;overflow: auto;">
    <v-file-input
      counter
      multiple
      show-size
      placeholder="Sube imagen del Mapa"
      prepend-inner-icon="mdi-file-arrow-left-right"
      hint="solo PNG, JPEG, BMP"
      persistent-hint
      prepend-icon=""
      label="Imagen Piso"
      v-model="files"
    >
    </v-file-input>
  </div> -->


  <v-row class="my-2">
    <v-col cols="6">
      <v-text-field 
      v-model="store.form.departamento" 
      hide-details="auto" 
      label="Departamento"/>    
    </v-col>

    <v-col cols="6">
      <v-text-field
        v-model="store.form.razon" 
        hide-details="auto" 
        label="Razón"/>
    </v-col>

    <v-col  cols="12" class="d-flex justify-center align-center">
        <v-tooltip hide-details="auto"   text="Eliminar todo">
          <template v-slot:activator="{ props }">
            <v-btn @click="files = []" color="error" icon="mdi-delete-forever" v-bind="props"></v-btn>
          </template>
        </v-tooltip>
    </v-col>
  </v-row>

  <v-card
    position="relative"
    class="d-flex justify-center align-center"
    style="overflow: auto;" 
    border="colorLink lg"
    height="400"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop" >
    <input
      style="display: none;"
      type="file"
      multiple
      name="file"
      id="fileInput"
      class="hidden-input"
      @change="onChange"
      ref="file"
      accept=".pdf,.jpg,.jpeg,.png"
    />
    




    
    <label v-if="files.length < 1" for="fileInput" class="file-label" style="cursor: pointer;">
      <div v-if="isDragging">Suelta el Archivo aqui</div>
      <div v-else>Arrastra el achivo aqui o <u>click</u> para subir el archivo</div>
    </label>


    <div class="align-content-start d-flex flex-wrap ga-2 justify-center " v-if="files.length" >
      <v-card class=""
        elevation="10" width="90px" height="90px" position="relative" border="success md" v-for="file in files" :key="file.name" >
        <v-card  class="d-flex justify-center align-center" width="100%" height="100%"  style="overflow: hidden;">
          <v-img content-class  class="preview-img"  :src="generateURL(file) "  />
        </v-card>
        <div>
          <v-btn
            color="primary"
            location="top right"
            position="absolute"
            density="compact"
            class="rounded-circle"
            type="button"
            @click="remove(files.indexOf(file))"
            title="Remove file"
            icon="mdi-delete-forever"
          >
        </v-btn>
        </div>
      </v-card>
    </div>

  </v-card>

  <v-row align="center" justify="center" class="">
    <v-col cols="4" md="3" lg="2" >
      <v-card :color="tamanoFiles >= 10 ? 'error' : 'success'" elevation="10" class=" text-center" >{{ tamanoFiles+"MB" }}</v-card>
    </v-col>
    <v-col cols="12" >
      <v-btn :disabled="tamanoFiles >= 10 || files.length === 0 || (store.form.departamento.length === 0 || store.form.razon.length === 0)"
        color="primary" width="100%" 
        @click="enviarArchivos">
        Enviar
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {useTest1Store} from '~/stores/test/test_1'

const store = useTest1Store()

 const extensionesImagenes = {
  ".xlsx": "/images/officeImages/excel.png",
  ".xls": "/images/officeImages/excel.png",
  ".rar": "/images/officeImages/rar.png",
  ".zip": "/images/officeImages/rar.png", // La misma imagen para .rar y .zip
  ".7z": "/images/officeImages/rar.png", // La misma imagen para .rar y .zip
  ".pdf": "/images/officeImages/pdf.png",
  ".docx": "/images/officeImages/word.png",
  ".doc": "/images/officeImages/word.png"
};

const isDragging = ref(false);
const files = ref([]);

const onChange = () => {
  files.value.push(...fileInput.files);
};

const dragover = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  onChange();
  isDragging.value = false;
};

const remove = (i) => {
  files.value.splice(i, 1);
};

const generateURL = (file) => {
  console.log(file)


  let fileSrc = URL.createObjectURL(file);
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc);
  }, 1000);

  const extension = file.name.substring(file.name.lastIndexOf('.'));
  const imagenArchivo = extensionesImagenes[extension] || fileSrc ;

  console.log(imagenArchivo)
  return imagenArchivo;
};

const enviarArchivos = async()=>{
  console.log(files.value.length)
  console.log(files.value)

  const totalSize = files.value.reduce((total, item) => total + item.size, 0);
  console.log(totalSize)

  if(totalSize > 10000000){
    alert("No puede enviar mas de 10MB de en peso de archivos")
    return
  }
  
  const zip = new JSZip();

  files.value.forEach((archivo) => {
    zip.file(archivo.name, archivo);
  });

  const contenidoZip = await zip.generateAsync({ type: "blob",compression:'DEFLATE',compressionOptions:{level:9}});

  console.log(contenidoZip)

  // saveAs(contenidoZip, "archivos_comprimidos.rar");

  store.enviarArchivo({archivo:contenidoZip})

}

const tamanoFiles = ref(0)
watch(files, () => {
  const totalSize = files.value.reduce((total, item) => total + item.size, 0);
  const megabytes = totalSize / (1024 * 1024);
  tamanoFiles.value = megabytes.toFixed(2)
},{deep:true,flush:'post'})


</script>


<style scoped>




</style>