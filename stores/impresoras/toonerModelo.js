import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useToonerModeloStore = defineStore('useToonerModeloStore', {
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

        FiltroToonerModelo:{
            marca:null,
            modelo:null,
        },

        FiltrobusquedaMarcaModelo_autocomplete:{
            marca:[''],
            modelo:[''],
        },

        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,
    }),


    getters:{
        filtroBusquedaModeloTooner() {
            const { marca, modelo } = this.FiltroToonerModelo;
            // const { usuario, piso, departamento } = this.FiltroToonerModelo;
            let filterBuscar = "";
          
            if (marca === null && modelo === null ) {
              filterBuscar = "";
              console.log("vacio")
              console.log(modelo)

            } else {
              if (marca !== null) {
                filterBuscar += `marca = "${marca}"`;
              }
              if (modelo !== null ) {
                if (filterBuscar !== null && marca !== null) {
                  filterBuscar += " && ";
                }
                filterBuscar += `modelo = "${modelo}"`;
              }
            //   if((marca === null || marca === "") && modelo !== "" || modelo !== null ){
            //     filterBuscar += `modelo ~ "${modelo}"`
            //   }
            }
            return filterBuscar;
        }

    },

    actions:{
        resetearFormModeloTooner(){
            this.formToonerModelo.descripsion =""
            this.formToonerModelo.marca =""
            this.formToonerModelo.modelo =""
        },
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
                this.ObtenerModeloTooner()
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
                this.cargando = true
                const {items,page,perPage,totalItems,totalPages} = await this.pb.collection('tooners_modelos').getList(this.toonerModeloPaginacion.page, this.toonerModeloPaginacion.perPage, {
                    sort: '-created',
                    filter: this.filtroBusquedaModeloTooner,
                });
                this.itemsToonerModelo = items
                //paginacion

                this.toonerModeloPaginacion.totalItems = totalItems
                this.toonerModeloPaginacion.totalPages = totalPages

                this.marcaModelo(items)
                this.cargando = false
                console.log(items)
            } catch (error) {
                console.error(error.response)
                this.notificacion("ocurrioUnError")
                this.cargando = false
            }

        },
        marcaModelo(objeto){
            const nuevoArray = [...objeto]

            const lista = nuevoArray.map((item)=>{
                return {
                    marca:item.marca,
                    modelo:item.modelo
                }
            })
            let marcasUnicas = [];
            let modelosUnicos = [];
            lista.forEach(objeto => {
                if (!marcasUnicas.includes(objeto.marca)) {
                marcasUnicas.push(objeto.marca);
                }
                if (!modelosUnicos.includes(objeto.modelo)) {
                modelosUnicos.push(objeto.modelo);
                }
            });

            this.FiltrobusquedaMarcaModelo_autocomplete.marca = marcasUnicas
            this.FiltrobusquedaMarcaModelo_autocomplete.modelo = modelosUnicos
        },
        async eliminarModeloTooner({id}){
            try {
                if(confirm("¿Desea eliminar este modelo?")){
                    await this.pb.collection('tooners_modelos').delete(id);
                    await this.ObtenerModeloTooner()
                    this.notificacion("eliminarExitoso")
                }
                return
            } catch (error) {
                console.error(error.response)
                this.notificacion("ocurrioUnError")
            }
        },
        async editarModeloTooner({id}){
            const data = { ...this.formToonerModelo}
            console.log(data)
            if(!data.descripsion){
                delete data.descripsion
            }
            try {
                const record = await this.pb.collection('tooners_modelos').update(id, data);
                await this.ObtenerModeloTooner()
                this.notificacion("editarExitoso") 
                console.log(record)
            } catch (error) {
                console.error(error)
            }
        }

        

    },
    
})
