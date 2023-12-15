import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useAsistenciasStore = defineStore('useAsistenciasStore', {
    state: () => ({
      pb_url: useRuntimeConfig().public.POCKETBASE_URL,
      listaTotalEmpleados_oficina: undefined,
      
      listaDepartamento:undefined,
      mapeo:false,

      //notificaciones
      iconError:false,
      iconCreate:false,
      iconDelete:false,

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

        this.listaTotalEmpleados_oficina = lista
        this.listaDepartamento = departamentos
    },

    async crearReporte(data){
      try {
        const pb = new PocketBase(this.pb_url)
        const record = await pb.collection('reportes').create(data);
        console.log("reporte")
        console.log(record)

        this.iconCreate= true
        setTimeout(() => {
        this.iconCreate= false
        }, 2000);

      } catch (err) {
        console.log(err.response)

        this.iconError= true
        setTimeout(() => {
        this.iconError= false
        }, 2000);
      }
    },
    async obtenerReporte(){

      try {
        const storeConexion = useStoreConexion()
        const pb = new PocketBase(this.pb_url)
        const records = await pb.collection('reportes').getFullList({
          sort: '-created',
          filter:`creador="${storeConexion.avatarID}"`
        });
        console.log(records)
      } catch (err) {
        console.log(err.response.data)
      }
   
    }
  },
    
})

const lista = {
  informatica:["jose","manuel","lopez"],
  departamentos:['DEPARTAMENTO DE DESARROLLO ECONOMICO','ATENCION AL CIUDADANO','informatica']
}