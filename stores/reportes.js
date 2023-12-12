import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useReportesStore = defineStore('useReportesStore', {
    state: () => ({
      listaTotalEmpleados_oficina: undefined,
      
      listaDepartamento:undefined,
      mapeo:false,

      tipoReporte:['PREVENTIVO','CORRECTIVO','CABLEADO','ASIST. EXTERNO','ASIST. INTERNO','ASISTENCIA TÉCNICA','RESPALDO','OPERATIVOS ESPECIALES']
    }),

    getters:{

    },


  actions:{
    async obtenerDatos(){
      const store = useIPListaStore()
      await store.obtenerListaDatos()
      const usuarios = store.mapeoLista

      const usuariosPorUsuario = usuarios
      .map(usuario => usuario.usuario)
      .sort();
      //lista de usuarios
      this.listaTotalEmpleados_oficina = usuariosPorUsuario
      //lista de departamentos
      this.listaDepartamento = store.listaDepartamento
    }

   
    },
    
})
