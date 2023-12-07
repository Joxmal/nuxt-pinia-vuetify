import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useResetStorage = defineStore('useResetStorage', {
    state: () => ({
        loading: false
        
    }),

    getters:{

    },


    actions:{

        resetDataFromDB(){
            this.loading = true
            const item = useItemsStore()
            item.obtenerDatos()

            
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        }


 
   
    },
    
})
