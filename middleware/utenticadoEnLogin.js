export default defineNuxtRouteMiddleware(async(to,from)=>{
        const store= useStoreConexion()
        const autenticado = store.pb_Valid

    if(autenticado){
        //  console.log(to)
        //  console.log(to.meta)
         console.log(autenticado)
        return navigateTo('/dashboard')
    }
})