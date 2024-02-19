import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useToonersRecargasStore = defineStore('useToonersRecargasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

        formToonerRecarga:{
            marca:"",
            modelo:"",
            descripsion:""
        },

        itemsToonerRecarga:null,
        toonerModeloRecarga:{
            page:1,
            perPage:50,
            totalItems:"",
            totalPages:"",
        },

        FiltroToonerRecarga:{
            marca:null,
            modelo:null,
        },

        FiltrobusquedaRecarga_autocomplete:{
            marca:[''],
            modelo:[''],
        },


        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,
    }),


    getters:{


    },

    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },
        async obtenerToonersRecargas(){
            const {items} = await this.pb.collection('tooners_recargas').getList(1, 50, {
                filter: '',
                sort: '-created',
                expand:"tooner_modelo",
                fields:'*,expand.tooner_modelo.marca,nro_item,expand.tooner_modelo.modelo '
            });
            console.log(items)
            this.itemsToonerRecarga = items
        }
    },
    
})
