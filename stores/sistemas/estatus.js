import { defineStore } from "pinia";
import { pb } from "~/assets/pbConexion";
export const useEstatusSistemasStore = defineStore("useEstatusSistemasStore", {
  state: () => ({
    form:{
      nombre:'',
      activo:true
    },
    data_DB:[]
  }),
  getters: {

  },

  actions: {
    async getEstatus(){
      const records = await pb.collection('estatus_sistemas').getFullList({
        sort: '-created',
      });
      this.data_DB = records
    },
    async createEstatus(){
      try {
        const record = await pb.collection('estatus_sistemas').create(this.form);
        useNuxtApp().$toast.success('Creado con exito')
      } catch (error) {
        if(error?.data.data?.nombre?.code === "validation_not_unique"){
          useNuxtApp().$toast.error('Estas Repitiendo el estatus')
        }else{
          useNuxtApp().$toast.error('Error')
        }
      }
    },
    async updateEstatus(id){
      try {
        const record = await pb.collection('estatus_sistemas').update(id, this.form);
        useNuxtApp().$toast.success('Actualizado con exito')
      } catch (error) {
        useNuxtApp().$toast.error('Error')
        console.error(error)
      }
    },
    async deleteEstatus(id){
      const confirma = confirm('¿Quieres eliminar?')
      if(!confirma) return
      try {
        const record = await pb.collection('estatus_sistemas').delete(id);
        useNuxtApp().$toast.success('Eliminado con exito')
      } catch (error) {
        console.error(error?.data)
        useNuxtApp().$toast.error('Error')
      }
    }
  },
});
