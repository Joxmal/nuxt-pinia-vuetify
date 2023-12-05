import { defineStore } from 'pinia'
import PocketBase from 'pocketbase'




export const useStoreIniciarSesionPrueba = defineStore('useStoreIniciarSesionPrueba', {
  state: () => ({
    count: 0,
    ID_USER:'',
    errorInicio: false,
  }),
  persist:persistedState.sessionStorage,
  

  actions:{
    sumCount() {
        this.count++
    },

    IniciarSesion() {

        this.ID_USER = 'sdsdsdsd';
        console.log(this.ID_USER)

    },

  },

})