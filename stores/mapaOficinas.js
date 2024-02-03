import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const usemapaOficinas = defineStore('usemapaOficinas', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        //datos entregados
        datos:null,
        //formulario para crear oficina
        form:{
            piso:'',
            oficina:"",
            imagen:null,
        },
        cargando:false,
        envioExitosoOficina:false,
        eliminarExitosoOficina:false,
        ocurrioUnError:false
    }), 
    getters:{
       
    },
    actions:{
        async obtenerDatos(NumeroPiso) {
            return new Promise(async (resolve, reject) => {
              try {
                let records;
                setTimeout(async () => {
                  records = await this.pb.collection('mapasOficinas').getFullList({
                    sort: '-created',
                    filter: `piso="${NumeroPiso}"`
                  });
                  console.log(records);
                  this.datos = records;
                  resolve(records);
                }, 500);
              } catch (error) {
                reject(error);
              }
            })
        },
        async crearOficina(){
            this.cargando = true
            const record = await this.pb.collection('mapasOficinas').create(this.form);
            this.envioExitosoOficina = true
            this.cargando = false
            setTimeout(() => {
                this.envioExitosoOficina = false
            }, 1000);
            console.log(record)
        },

        async EliminarOficina({ID_Oficina}){
            try {
                await this.pb.collection('mapasOficinas').delete(ID_Oficina);
                this.eliminarExitosoOficina = true
                setTimeout(() => {
                    this.eliminarExitosoOficina = false
                }, 1000);
            } catch (error) {
                console.log('error al eliminar la oficina'+ ID_Oficina)
                this.ocurrioUnError = true
                setTimeout(() => {
                this.ocurrioUnError = false 
                }, 5000);
            }
 
        }
    },
})
