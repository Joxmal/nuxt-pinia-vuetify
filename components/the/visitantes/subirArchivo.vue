<template>

    <div>
      <v-slide-x-transition group>
        <AlertWarning v-show="store.eliminarExitoso === true" key="1"
          style="position: fixed; right: 20px; z-index: 20;" 
          mensaje="Eliminado con exito"
        />
        <AlertCargando v-show="store.cargando === true" key="2"
          style="position: fixed; right: 20px ; z-index: 20; " 
          mensaje="Cargando"
        /> 
        <AlertSuccess v-show="store.editarExitoso === true" key="3"
          style="position: fixed; right: 20px; z-index: 20;" 
          mensaje="Editado"
          icon="mdi-pencil-outline"
        /> 
        <AlertError v-show="store.ocurrioUnError === true" key="4"
          style="position: fixed; right: 20px; z-index: 20;" 
          mensaje="ERROR"
        />
        <AlertSuccess v-show="store.envioExitoso === true" key="5"
          style="position: fixed; right: 20px; z-index: 20;" 
          mensaje="Cargado con exito"
        />  
      </v-slide-x-transition>
    </div>
        
    <v-container class="bg-surface h-screen">
      <v-row class="my-2">
        <v-col cols="12" md="6">
          <v-text-field 
          v-model="store.form.departamento" 
          hide-details="auto" 
          label="Departamento"/>    
        </v-col>
    
        <v-col cols="12" md="6">
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
        height="250"
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
          <v-card :color="tamanoFiles >= 20 ? 'error' : 'success'" elevation="10" class=" text-center" >{{ tamanoFiles+"MB" }}</v-card>
        </v-col>
        <v-divider class="border-opacity-0" ></v-divider>
        <v-col cols="10" >
          <v-btn 
            :loading="loadinButton" 
            :disabled="tamanoFiles >= 20 || files.length === 0 || (store.form.departamento.length === 0 || store.form.razon.length === 0) || loadinButton === true"
            color="primary" width="100%" 
            @click="enviarArchivos">
            Enviar
          </v-btn>
        </v-col>
      </v-row>
    
      
    </v-container>
    
    
    </template>
    
    
    
<script setup>
import JSZip from 'jszip';
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

const loadinButton = ref(false)
const enviarArchivos = async()=>{
  loadinButton.value = true
  console.log(files.value.length)
  console.log(files.value)

  const totalSize = files.value.reduce((total, item) => total + item.size, 0);
  console.log(totalSize)

  if(totalSize > 20971520){
    alert("No puede enviar mas de 20MB de en peso de archivos")
    return
  }
  
  const zip = new JSZip();

  files.value.forEach((archivo) => {
    zip.file(archivo.name, archivo);
  });

  const contenidoZip = await zip.generateAsync({ type: "blob",compression:'DEFLATE',compressionOptions:{level:9}});

  console.log(contenidoZip)

  // saveAs(contenidoZip, "archivos_comprimidos.rar");

  await store.enviarArchivo({archivo:contenidoZip})
  loadinButton.value = false


}

const tamanoFiles = ref(0)

watch(files, () => {
  const totalSize = files.value.reduce((total, item) => total + item.size, 0);
  const megabytes = totalSize / (1024 * 1024);
  tamanoFiles.value = megabytes.toFixed(2)
},{deep:true,flush:'post'})
</script>