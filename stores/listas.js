import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useListasStore = defineStore('useListasStore', {
    state: () => ({
        pb_url:useRuntimeConfig().public.POCKETBASE_URL,
        listas:[],
        //json de cada area
        jsonDepartamentos:[],
        jsonCpu:[],
        jsonMonitor:[],
        jsonImpresora:[],
        jsonTarjeta_madre:[],
        jsonTooners:[],
        
        envioExitoso:false,
        ocurrioUnError:false,
    }),
    persist:persistedState, 
    getters:{
        //conteoAsistencia: (state) => state.asistenciaLista_Usuario.items.length,
        listaCPU: (state) => state.listas.cpu.cpu,
        listaDepartamento: (state) =>  state.listas.Departamentos.listaDepartamento.sort(),
        listaImpresoras: (state) =>  state.listas.impresora.impresora.sort(),
        listaMonitor: (state) =>  state.listas.monitor.monitor.sort(),
        listaTarjetaMadre: (state) => state.listas.tarjeta_madre.tarjeta_madre.sort(),
        listaTooner: (state) => state.listas.tooners.tooners.sort(),

    },
    actions:{
        async obtenerListas(){
            const pb = new PocketBase(this.pb_url)
            try {
                // you can also fetch all records at once via getFullList
                const record = await pb.collection('listas').getOne('liok3xxaykcstan', {
                });
                this.listas = record
                console.log("datos de listas cargados")
            } catch (error) {
                console.log(error)
            }
        },
        async cargarNuevoJson(){
            const pb = new PocketBase(this.pb_url)
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
            if(this.jsonTooners.length !== 0){
                data.tooners = this.jsonTooners
            }
            console.log(data)
            try {
                // you can also fetch all records at once via getFullList
                const record = await pb.collection('listas').update('liok3xxaykcstan', data);
                console.log(record)

                this.envioExitoso = true
                setTimeout(() => {
                this.envioExitoso = false
                }, 3000);
            } catch (error) {
                console.log(error)
                this.ocurrioUnError = true
                setTimeout(() => {
                this.ocurrioUnError = false
                }, 3000);
            }
        },

    },
})
