export default defineNuxtRouteMiddleware(async(to,from)=>{
        const store= useStoreConexion()
        const autenticado = store.pb_Valid
        store.verificarAutenticacion()
        store.refrescarAutenticacion()
        
    if(!autenticado){
        return navigateTo('/')
    }
})