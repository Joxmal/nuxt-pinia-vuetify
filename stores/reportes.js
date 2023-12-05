import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useReportesStore = defineStore('useReportesStore', {
    state: () => ({
        pb_url: useRuntimeConfig().public.POCKETBASE_URL,
        avatar:`/api/files/_pb_users_auth_/`,
        pb_Valid : '',
        errorInicio: false
    }),
  persist:persistedState.sessionStorage,

    getters:{
        estadoUsuario: (state) => state.pb_Valid
    },


  actions:{
        async inciarSesion(credenciales){

            try {
                console.log(credenciales)
                const pb = new PocketBase(this.pb_url)
                const authData = await pb.collection('users').authWithPassword(credenciales.username,credenciales.password);
                console.log(authData);

                this.pb_Valid = pb.authStore.isValid
    
                const router = useRouter()
                router.push({path:'/dashboard'})

            } catch (error) {
                console.error(error)
                this.errorInicio = true
                setTimeout(() => {
                    this.errorInicio = false
                }, 3000);
            }
            
            
            
        },

        async obtenerDatos(){
            const pb = new PocketBase(this.pb_url)
            const records = await pb.collection('reportes').getFullList({
                sort: '-created',
            });
            console.log(records)
        },

        desconectar(){
            const pb = new PocketBase(this.pb_url)
            pb.authStore.clear();
            this.pb_Valid = pb.authStore.isValid

            navigateTo('/')
        }
   
    },
    
})