import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useStoreConexion = defineStore('useStoreConexion', {
    state: () => ({
        pb_url: 'https://oficina-sgi.pockethost.io/',
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

        sincronizarDatos(){
            this.pb_auct = "nuevos datos"
        },

        desconectar(){
            const pb = new PocketBase(this.pb_url)
            pb.authStore.clear();
            this.pb_Valid = pb.authStore.isValid

            navigateTo('/')
        }
   
    },
    
})
