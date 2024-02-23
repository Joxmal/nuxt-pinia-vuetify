<template>
  <button @click="exportToXLSX(ordenar())">Exportar a XLSX</button>
</template>

<script setup>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {useEstadisticasStore} from '~/stores/impresoras/estadisticas'
import { onMounted } from 'vue';

const store = useEstadisticasStore()

const oldDatosExcel = { 
  "labels": [
    "TRIBUTOS TAQUILLA",
    "DEPARTAMENTO DE DESARROLLO ECONOMICO",
    "PRESUPUESTO",
    "INGENIEROS",
    "TESORERIA",
    "PRENSA",
    "LOPNA",
    "DEPARTAMENTO DE DESARROLLO URBANO",
    "FOTOCOPIADORA",
    "CONSEJO LOCAL",
    "CONSULTORIA JURIDICA",
    "CONTRATACIONES",
    "ADMINISTRACION",
    "DIRECCION GENERAL",
    "SECRETARIA DE JUVENTUD",
    "TRIBUTOS", "CATASTRO AREA TECNICA",
     "SALA SITUACIONAL",
     "TURISMO",
     "CATASTRO GEOMATICA",
     "CATASTRO AVALUO",
     "SINDICATURA",
     "DEPARTAMENTO DE PLANIFICACION",
     "DEPORTE",
     "PLANEAMIENTO",
     "REGISTRO CIVIL" 
    ], 
  "data": [ 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] 
}

function ordenar(){
  const datosOrdenados = {
  labels: ['Nombre', 'Cantidad'],
  data: [['Departamento', 'Cantidad de recargas']]
  };

    const datosExcel = {...oldDatosExcel}
    for (let i = 0; i < datosExcel.labels.length; i++) {
    datosOrdenados.data.push([datosExcel.labels[i], datosExcel.data[i]]);
  }

  
  let totalData = 0 
  datosExcel.data.forEach((data)=> totalData += data)

  datosOrdenados.data.push(['TOTAL',totalData])


  return datosOrdenados.data
}

onMounted(()=>{


})



  function exportToXLSX(data) {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    wb.Props={
      Title:"Excel de toners",
      Subject:"se muestras las recargas de toners de cada departamento",
      Author:"josé Rafael Montes Gonzalez",
      CreatedDate: new Date()
    }

    // Ajustar el ancho de la columna
    ws['!cols'] = [{ wch: 40 }, { wch: 20 }]; // Define el ancho de la primera y segunda columna

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* Descargar el archivo */
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'archivo.xlsx');
  }

</script>

