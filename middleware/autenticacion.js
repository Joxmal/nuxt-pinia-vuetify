export default defineNuxtRouteMiddleware(async(to,from)=>{
        const store= useStoreConexion()
        const autenticado = store.pb_Valid
        store.verificarAutenticacion()
        
    if(!autenticado){
        return navigateTo('/')
    }
})