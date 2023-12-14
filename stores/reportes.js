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
      let lista = store.mapeoLista

      lista = lista.reduce((acc, usuario) => {
        if (!acc[usuario.departamento]) {
          acc[usuario.departamento] = [];
        }
        acc[usuario.departamento].push(usuario.usuario);
        return acc;
      }, {});
      const departamentos = Object.keys(lista);

      // console.log({
      //   informatica: lista["INFORMATICA"],
      //   departamentos: departamentos
      // });
        this.listaTotalEmpleados_oficina = lista
        this.listaDepartamento = departamentos
    }

   
    },
    
})

const lista = {
  informatica:["jose","manuel","lopez"],
  departamentos:['DEPARTAMENTO DE DESARROLLO ECONOMICO','ATENCION AL CIUDADANO','informatica']
}