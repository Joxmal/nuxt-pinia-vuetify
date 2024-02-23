import { defineStore } from "pinia";
import PocketBase from 'pocketbase'
import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';




export const useEstadisticasStore = defineStore('useEstadisticasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        
        itemsEstadisticas:null,

        FiltroEstadisticas:{
            rangoFechas:{
                desde:null,
                hasta:null,
            }
        },

        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,

        excel:{
            totalRecargasPorDepartamento:null
        }
    }),

    // fecha_entrada >= "2024-02-21" && fecha_entrada <= "2024-02-22"
    getters:{

        filtroBusquedaEstadisticas() {
            const {rangoFechas} = this.FiltroEstadisticas;
            const {desde,hasta} = rangoFechas
            
            let filterBuscar = `recarga >= "${desde} 00:00:00.000Z" && recarga <= "${hasta} 23:59:59.999Z"`;

            return filterBuscar;
        },

        DataBarJS(){
            if(this.itemsEstadisticas !== null){
                const lista = [...this.itemsEstadisticas]
    
                const newLista = lista.flatMap((items)=>{
                    return{
                        departamento: items.expand.toner.direccion
                    }
                })
                const labels = [];
                const data = [];

                this.excel.totalRecargasPorDepartamento = {
                    labels,
                    data
                }
                
    
                newLista.forEach((departamento)=>{
                    const nombreDepartamento = departamento.departamento;
    
                    if (!labels.includes(nombreDepartamento)) {
                        labels.push(nombreDepartamento);
                        data.push(1);
                      } else {
                        const index = labels.indexOf(nombreDepartamento);
                        data[index]++;
                      }
                });
                console.log(labels)
                const DataDoughnut = {
                    labels,
                    datasets: [{
                        maxBarThickness: 18,
                        backgroundColor: [
                            'rgba(133, 73, 186, 0.6)',
                            'rgba(0, 169, 80, 0.6)',
                            'rgba(22, 106, 143, 0.6)',
                            'rgba(172, 194, 54, 0.6)',
                            'rgba(83, 123, 196, 0.6)',
                            'rgba(245, 55, 148, 0.6)',
                            'rgba(246, 112, 25, 0.6)',
                            'rgba(77, 201, 246, 0.6)',
                            'rgba(88, 89, 91, 0.6)',
                            'rgba(133, 73, 186, 0.6)',
                            'rgba(0, 169, 80, 0.6)',
                            'rgba(22, 106, 143, 0.6)',
                            'rgba(172, 194, 54, 0.6)',
                            'rgba(83, 123, 196, 0.6)',
                            'rgba(245, 55, 148, 0.6)',
                            'rgba(246, 112, 25, 0.6)',
                            'rgba(77, 201, 246, 0.6)',
                            'rgba(88, 89, 91, 1)'
                        ],
                        data,
                    }]
                }
                return DataDoughnut
            }

        },
        
        totalBarJS(){
            if(this.itemsEstadisticas !== null && typeof this.DataBarJS === 'object'){
                 const Data = {...this.DataBarJS}
                 const arrayData = Data.datasets[0].data
                 let sumaTotal = 0
                arrayData.forEach(item=>sumaTotal+= item)
                return sumaTotal
            }
        }

    },

    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },

        async obtenerToonersRecargas(){
            console.log(this.filtroBusquedaEstadisticas)
            this.cargando = true
            const records = await this.pb.collection('toner_recargas_ListaFecha').getFullList({
                filter: this.filtroBusquedaEstadisticas,
                sort:'-created',
                expand:`toner.tooner_modelo,` ,
                fields:`
                recarga,
                expand.toner.direccion,` ,

            });
            this.cargando = false
            this.itemsEstadisticas = records
        },


        imprimirExcelTotalRecargas(){
            const datosExcel = {...this.excel.totalRecargasPorDepartamento}
            const datosOrdenados = {
                labels: ['Nombre', 'Cantidad'],
                data: [['Departamento', 'Cantidad de recargas']]
            };

            for (let i = 0; i < datosExcel.labels.length; i++) {
                datosOrdenados.data.push([datosExcel.labels[i], datosExcel.data[i]]);
            }

            let totalData = 0 
            datosExcel.data.forEach((data)=> totalData += data)
          
            datosOrdenados.data.push(['TOTAL',totalData])

            console.log(datosOrdenados.data)

            const ws = XLSX.utils.aoa_to_sheet(datosOrdenados.data);
            const wb = XLSX.utils.book_new();
            wb.Props={
                Title:"Excel de toners",
                Subject:"se muestras las recargas de toners de cada departamento",
                Author:"josé Rafael Montes Gonzalez",
                CreatedDate: new Date()
            }

            
            //crear el archivo excel (hoja,datos, nombre de hoja)
            XLSX.utils.book_append_sheet(wb, ws, "Reporte");
            
            // Ajustar el ancho de la columna
            ws['!cols'] = [{ wch: 40 }, { wch: 20 }]; // Define el ancho de la primera y segunda columna
            
            //añadir encabezados
            XLSX.utils.sheet_add_aoa(ws, [["Departamentos", "Nro Recargas"]], { origin: "A1" });


            XLSX.writeFile(wb, "TonerReporte.xlsx", { compression: true });

            // /* Descargar el archivo */
            // const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            // const blob = new Blob([wbout], { type: 'application/octet-stream' });
            // saveAs(blob, 'archivo.xlsx');
            
        }

    },
    

})
