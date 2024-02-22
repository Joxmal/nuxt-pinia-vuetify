import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



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

    }),

    // fecha_entrada >= "2024-02-21" && fecha_entrada <= "2024-02-22"
    getters:{

        filtroBusquedaEstadisticas() {
            const {rangoFechas} = this.FiltroEstadisticas;
            const {desde,hasta} = rangoFechas
            
            let filterBuscar = `recarga >= "${desde} 00:00:00.000Z" && recarga <= "${hasta} 23:59:59.999Z"`;

            return filterBuscar;
        },

        DataDoughnut(){
            if(this.itemsEstadisticas !== null){
                const lista = [...this.itemsEstadisticas]
    
                const newLista = lista.flatMap((items)=>{
                    return{
                        departamento: items.expand.toner.direccion
                    }
                })
                const labels = [];
                const data = [];
    
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
                    datasets: [
                        {
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
                  
                        }
                    ]
                }
                return DataDoughnut
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


    },
    

})
