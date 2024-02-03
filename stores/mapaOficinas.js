import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const usemapaOficinas = defineStore('usemapaOficinas', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        //formulario para crear oficina
        form:{
            piso:'',
            oficina:"",
            imagen:null,
        },
        envioExitosoOficina:false,
    }), 
    getters:{
       
    },
    actions:{
        async obtenerDatos(NumeroPiso){            
            const records = await this.pb.collection('mapasOficinas').getFullList({
              sort: '-oficina',
              filter:`piso="${NumeroPiso}"`
          });
          console.log(records)
          return records
        },
        async crearOficina(){
            const record = await this.pb.collection('mapasOficinas').create(this.form);
            this.envioExitosoOficina = true
            setTimeout(() => {
                this.envioExitosoOficina = false
            }, 1000);
            console.log(record)
        }
    },
})
