import { defineStore } from "pinia";
import { pb } from "~/assets/pbConexion";
export const useEstatusSistemasStore = defineStore("useEstatusSistemasStore", {
  state: () => ({
    count_reload_status:0,

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
        this.count_reload_status++
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
        this.count_reload_status++
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
        this.count_reload_status++
      } catch (error) {
        console.error(error?.data)
        if(error?.data?.message === "Failed to delete record. Make sure that the record is not part of a required relation reference."){
          useNuxtApp().$toast.error('Relacionado con asistencias')
        }else{
          useNuxtApp().$toast.error('Error')
        }
      }
    },
    resetearForm(){
      this.form={
        nombre:'',
        activo:true
      }
    }
  },
});
