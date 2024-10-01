import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useStoreConexion = defineStore('useStoreConexion', {
    state: () => ({
        seleccionVistaIndex : 'E',  // E estadisticas, OR operativos Recientes

        pb_url: useRuntimeConfig().public.POCKETBASE_URL,

        pb_Valid : false,
        errorInicio: false,


        //datos del usuario que unicio sesion
        avatarID:'',
        avatarNombre:'',
        avatarImagen: '',
        avatarRole:'',
        areas:[],


        //lista de los usuarios
        usuariosLista:''
        
    }),
    persist:persistedState.sessionStorage,

    getters:{
        estadoUsuario: (state) => state.pb_Valid,

        usuarioListaMap(state){
          return state.usuariosLista.map(item=>({
            name: item.name,
            id: item.id,
          }));
        }  
    },

    actions:{
        async verificarAutenticacion(){
            const pb = new PocketBase(this.pb_url)
            const autenticado = pb.authStore.isValid
            this.pb_Valid = autenticado
        },

        async inciarSesion(credenciales){
            try {
                const pb = new PocketBase(this.pb_url)
                const authData = await pb.collection('users').authWithPassword((credenciales.username).trim(),credenciales.password,{
                    expand:`areas`
                });

                this.areas = authData.record.expand.areas.map(area => ({id:area.id, nombre:area.nombre}))

                this.verificarAutenticacion()
                this.obtenerListaUsuarios()

    
                const router = useRouter()
                router.push({path:'/dashboard'})
                
            
                // imagen del avatar
                this.avatarImagen = `${this.pb_url}/api/files/${authData.record.collectionId}/${authData.record.id}/${authData.record.avatar}?thumb=150x300`
                this.avatarNombre = `${authData.record.name}`
                this.avatarRole = `${authData.record.role}`
                this.avatarID = `${authData.record.id}`

                useAsistenciasStore().seleccionUsuario = useStoreConexion().avatarID
                await useListasStore().obtenerListas()


                //guardar actividad del usuario en la bd
                const dataSessionesIniciadas={
                        "field":authData.record.id,
                        "ip": "test"
                }
                const record = await pb.collection('sesiones_iniciadas').create(dataSessionesIniciadas);
                
            } catch (error) {
                console.error(error)
                this.errorInicio = true
                setTimeout(() => {
                    this.errorInicio = false
                }, 2000);
            }
            
        },

        async obtenerListaUsuarios(){
            const pb = new PocketBase(this.pb_url)
            const records = await pb.collection('Lista_Usuarios').getFullList({
              sort: '-name',
            });
            this.usuariosLista= records
        },

        sincronizarDatos(){
            this.pb_auct = "nuevos datos"
        },

        borrarDatos(){
            this.pb_Valid = false,
            this.errorInicio = false,
            this.avatarNombre = '',
            this.avatarImagen = ''
            this.avatarID= ''
        },
        desconectar(){
            const pb = new PocketBase(this.pb_url)
            pb.authStore.clear();
            this.pb_Valid = pb.authStore.isValid
            
            navigateTo('/')
            this.borrarDatos()

            useAsistenciasStore().seleccionUsuario = ""

        },

   
    },
    
})
