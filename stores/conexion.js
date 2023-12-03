import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useConexionStore = defineStore('conexion', {
    state: ()=>{
        const PB_URL = useRuntimeConfig().public.POCKETBASE_URL
        return{
            pb_url: PB_URL
        }
  },

  getters:{

  },
  actions:{
        async saludo(){
            const pb = new PocketBase(this.pb_url);

            const authData = await pb.collection('users').authWithPassword(
                'joxmal',
                '12345678',
            );
            console.log(authData);
        }
   
    },
    
})
