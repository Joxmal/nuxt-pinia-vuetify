import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useItemsStore = defineStore('useItemsStore', {
    state: () => ({
        pb_url: useRuntimeConfig().public.POCKETBASE_URL,
        numero:0,
        itemsLista: '',
        listaMapeada:false
    }),

    getters:{
        estadoUsuario: (state) => state.pb_Valid,
        mapeoLista: ((state) => {
               const map = state.itemsLista
               
            return map
        })
    },


  actions:{

        mapearLista(){

            const objetoFinal = this.itemsLista.map(item => {
                return {
                  cpu: item.cpu.trim(),
                  tarjeta_madre: item.tarjeta_madre,
                  mem_ram_tipo: item.Memoria_ram_tipo,
                  mem_ram_capacidad: item.Memoria_ram_capacidad,
                  case: 'HP',
                  mouse: 'LOGITECH',
                  teclado: 'HP',
                  monitor: 'LG',
                  creado: item.created.split(' ')[0],
                  id:item.id,
                  NRO_ITEM:item.NRO_ITEM
                };
              });
            console.log(objetoFinal)
            this.listaMapeada = objetoFinal

        },

        async obtenerDatos(){
            const pb = new PocketBase(this.pb_url)
            const records = await pb.collection('item').getFullList({
                sort: '-created',
            });
            this.itemsLista = records
            this.mapearLista()
            console.log(this.itemsLista)
        },

        desconectar(){
            const pb = new PocketBase(this.pb_url)
            pb.authStore.clear();
            this.pb_Valid = pb.authStore.isValid

            navigateTo('/')
        }
   
    },
    
})
