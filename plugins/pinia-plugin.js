export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:mounted', () => {
    const store = useStoreConexion()
    store.verificarAutenticacion()
    console.log(store.pb_Valid)
  })
})