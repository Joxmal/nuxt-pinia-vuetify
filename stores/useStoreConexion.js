import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useStoreConexion = defineStore('useStoreConexion', {
    state: () => ({
        pb_url: useRuntimeConfig().public.POCKETBASE_URL,

        pb_Valid : false,
        errorInicio: false,
        
        avatarNombre:'',
        avatarImagen: '',
        
    }),
    persist:persistedState.sessionStorage,

    getters:{
        estadoUsuario: (state) => state.pb_Valid
    },

    actions:{
        async verificarAutenticacion(){
            const pb = new PocketBase(this.pb_url)
            const autenticado = pb.authStore.isValid
            this.pb_Valid = autenticado
            console.log(this.pb_Valid)
        },

        async inciarSesion(credenciales){

            try {
                console.log(credenciales)
                const pb = new PocketBase(this.pb_url)
                const authData = await pb.collection('users').authWithPassword(credenciales.username,credenciales.password);
                
                this.verificarAutenticacion()
    
                const router = useRouter()
                router.push({path:'/dashboard'})

                // imagen del avatar
                this.avatarImagen = `${this.pb_url}/api/files/${authData.record.collectionId}/${authData.record.id}/${authData.record.avatar}?thumb=150x300`
                this.avatarNombre = `${authData.record.username}`
            } catch (error) {
                console.error(error)
                this.errorInicio = true
                setTimeout(() => {
                    this.errorInicio = false
                }, 2000);
            }
            
        },

        sincronizarDatos(){
            this.pb_auct = "nuevos datos"
        },

        borrarDatos(){
            this.pb_Valid = false,
            this.errorInicio = false,
            this.avatarNombre = '',
            this.avatarImagen = ''
        },
        desconectar(){
            const pb = new PocketBase(this.pb_url)
            pb.authStore.clear();
            this.pb_Valid = pb.authStore.isValid
            
            navigateTo('/')
            this.borrarDatos()
        },


   
    },
    
})
