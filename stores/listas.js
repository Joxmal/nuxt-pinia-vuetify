import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useListasStore = defineStore('useListasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        listas:[]
    }), 
    getters:{
        //conteoAsistencia: (state) => state.asistenciaLista_Usuario.items.length,
        listaCPU: (state) => state.listas.flatMap((objeto )=> objeto.cpu.cpu),
        listaDepartamento: (state) =>  state.listas.flatMap((objeto )=> objeto.Departamentos.listaDepartamento),
        listaImpresoras: (state) =>  state.listas.flatMap((objeto )=> objeto.impresora.impresora),
        listaMonitor: (state) =>  state.listas.flatMap((objeto )=> objeto.monitor.monitor),
        listaTarjetaMadre: (state) => state.listas.flatMap((objeto )=> objeto.tarjeta_madre.tarjeta_madre),

    },
    actions:{
        async obtenerListas(){
            try {
                // you can also fetch all records at once via getFullList
                const records = await this.pb.collection('listas').getFullList({
                    sort: '-created',
                });
                this.listas = records
            } catch (error) {
                console.log(error)
            }
        },

    },
})
