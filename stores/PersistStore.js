import { defineStore } from "pinia";
import { pb } from "~/assets/pbConexion";
export const usePersistStore = defineStore('usePersistStore', {
    state: () => ({
        preferences:{
            asistencia:{
                vistaModoTabla:false
            },
            modoOscuro:true
        }


    }),
    persist:persistedState.sessionStorage,

    getters:{
    },

    actions:{



    },
    
})
