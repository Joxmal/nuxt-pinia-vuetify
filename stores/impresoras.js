import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useImpresorasStore = defineStore('useImpresorasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

        formToonerModelo:{
            marca:"",
            modelo:"",
            descripsion:""
        },
        itemsToonerModelo:null,
        toonerModeloPaginacion:{
            page:1,
            perPage:50,
            totalItems:"",
            totalPages:"",
        },

        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,
    }),


    getters:{

    },

    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },

        async crearModeloTooner(){
            const data = {...this.formToonerModelo}
            try {
                if (data.marca.length <= 0){
                    alert("Coloque la marca del Tooner")
                    return
                }
                if (data.modelo.length <= 0){
                    alert("Coloque el modelo del Tooner")
                    return
                }
                if (data.descripsion.length <= 0){
                    delete data.descripsion
                }
                console.log(data)
                const record = await this.pb.collection('tooners_modelos').create(data);
                console.log(record)
                this.notificacion("envioExitoso")

            } catch (error) {
                console.error(error.response)
                if(error.response.data){
                    if (error.response.data.marca && error.response.data.marca.message === "Value must be unique." && error.response.data.modelo && error.response.data.modelo.message === "Value must be unique."){
                        alert("ya existe un modelo con las mismas caracteristicas")
                        return
                    }
                }
                    this.notificacion("ocurrioUnError")
                
            }

        },
        async ObtenerModeloTooner(){
            try {
                const {items,page,perPage,totalItems,totalPages} = await this.pb.collection('tooners_modelos').getList(this.toonerModeloPaginacion.page, this.toonerModeloPaginacion.perPage, {
                    filter: '',
                });
                this.itemsToonerModelo = items
                //paginacion

                this.toonerModeloPaginacion.totalItems = totalItems
                this.toonerModeloPaginacion.totalPages = totalPages

                console.log(items)
            } catch (error) {
                console.error(error.response)
                this.notificacion("ocurrioUnError")
            }

        }
    },
    
})
