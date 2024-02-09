import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useListasStore = defineStore('useListasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        listas:[],
        //json de cada area
        jsonDepartamentos:[],
        jsonCpu:[],
        jsonMonitor:[],
        jsonImpresora:[],
        jsonTarjeta_madre:[],
        
    }), 
    getters:{
        //conteoAsistencia: (state) => state.asistenciaLista_Usuario.items.length,
        listaCPU: (state) => state.listas.cpu.cpu,
        listaDepartamento: (state) =>  state.listas.Departamentos.listaDepartamento,
        listaImpresoras: (state) =>  state.listas.impresora.impresora,
        listaMonitor: (state) =>  state.listas.monitor.monitor,
        listaTarjetaMadre: (state) => state.listas.tarjeta_madre.tarjeta_madre,

    },
    actions:{
        async obtenerListas(){
            try {
                // you can also fetch all records at once via getFullList
                const record = await this.pb.collection('listas').getOne('liok3xxaykcstan', {
                });
                this.listas = record
                console.log("datos de listas cargados")
            } catch (error) {
                console.log(error)
            }
        },
        async cargarNuevoJson(){
            let data = {}
            if(this.jsonDepartamentos.length !== 0){
                data.Departamentos = this.jsonDepartamentos
            }
            if(this.jsonCpu.length !== 0){
                data.cpu = this.jsonCpu
            }if(this.jsonImpresora.length !== 0){
                data.impresora = this.jsonImpresora
            }
            if(this.jsonTarjeta_madre.length !== 0){
                data.tarjeta_madre = this.jsonTarjeta_madre
            }
            if(this.jsonMonitor.length !== 0){
                data.monitor = this.jsonMonitor
            }
            console.log(data)
            try {
                // you can also fetch all records at once via getFullList
                const record = await this.pb.collection('listas').update('liok3xxaykcstan', data);
                console.log(record)
            } catch (error) {
                console.log(error)
            }
        },

    },
})
