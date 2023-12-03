import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useConexionStore = defineStore('conexion', {
    state: ()=>{
        const PB_URL = useRuntimeConfig().public.POCKETBASE_URL
        
        return{

            pb_url: PB_URL,
            avatar:`${PB_URL}/api/files/_pb_users_auth_/`
        }
  },

  getters:{

  },
  actions:{
        async inciarSesion(credenciales){
            console.log(credenciales)
            const pb = new PocketBase(this.pb_url);
            const authData = await pb.collection('users').authWithPassword(credenciales.user,credenciales.password);
            console.log(authData);
        }
   
    },
    
})
