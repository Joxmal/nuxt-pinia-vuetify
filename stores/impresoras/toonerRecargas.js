import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useToonersRecargasStore = defineStore('useToonersRecargasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

        resultado:'',

        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,
    }),


    getters:{


    },

    actions:{
        async obtenerToonersRecargas(){
            const {items} = await this.pb.collection('tooners_recargas').getList(1, 50, {
                filter: '',
                sort: '-created',
                expand:"tooner_modelo",
                fields:'*,expand.tooner_modelo.marca,nro_item,expand.tooner_modelo.modelo '

            });
            console.log(items)
            this.resultado = items
        }
    },
    
})
