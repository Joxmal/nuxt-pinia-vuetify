import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useReportesStore = defineStore('useReportesStore', {
    state: () => ({
      listaTotalEmpleados_oficina: undefined,
      listaDepartamento:undefined,
      mapeo:false
    }),
    persist:persistedState.sessionStorage,

    getters:{

    },


  actions:{
    async obtenerDatos(){
      const store = useIPListaStore()
      await store.obtenerListaDatos()
      console.log(store.mapeoLista)


  
      
      this.listaDepartamento = store.listaDepartamento
    }

   
    },
    
})
