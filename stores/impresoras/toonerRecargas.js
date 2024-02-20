import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useToonersRecargasStore = defineStore('useToonersRecargasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

        formToonerRecarga:{
            "nro_item": null,
            "tooner_modelo": null,
            "nro_regargas": 1,
            "fecha_entrada": "",
            "activo": true,
            "descripsion": "",
            "direccion":null
        },

        itemsToonerRecarga:null,
        toonerModeloRecarga:{
            page:1,
            perPage:50,
            totalItems:"",
            totalPages:"",
        },

        FiltrotonerRecarga:{
            nro_item:null,
            marca:null,
            modelo:null,
            departamento:null,
            tonerInactivo:false
        },



        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,

    }),


    getters:{
        filtroBusquedaRecargaToner() {
            const { nro_item, marca, modelo, departamento, tonerInactivo } = this.FiltrotonerRecarga;
        
            let filterBuscar = "";
        
            if (marca === null && modelo === null && departamento === null  && tonerInactivo === false && nro_item === null) {
                filterBuscar = "";
                console.log("vacio");
            } else {
                if (marca !== null) {
                    filterBuscar += `tooner_modelo.marca = "${marca}"`;
                }
                if (modelo !== null) {
                    if (filterBuscar !== null && marca !== null) {
                        filterBuscar += " && ";
                    }
                    filterBuscar += `tooner_modelo.modelo = "${modelo}"`;
                }
                if (departamento !== null) {
                    if (filterBuscar !== null && (marca !== null || modelo !== null)) {
                        filterBuscar += " && ";
                    }
                    filterBuscar += `direccion = "${departamento}"`;
                }
                if (tonerInactivo !== null) {
                    if (filterBuscar !== null && (marca !== null || modelo !== null || departamento !== null)) {
                        filterBuscar += " && ";
                    }
                    filterBuscar += `activo = ${!tonerInactivo}`;
                }
                if (nro_item !== null) {
                    if (filterBuscar !== null && (marca !== null || modelo !== null || departamento !== null || tonerInactivo !== null)) {
                        filterBuscar += " && ";
                    }
                    filterBuscar += `nro_item ~ "${nro_item}"`;
                }
            }
            return filterBuscar;
        }

    },

    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },
        formatearForm(){
            this.formToonerRecarga.nro_item = null
            this.formToonerRecarga.tooner_modelo = null
            this.formToonerRecarga.nro_regargas= 1
            this.formToonerRecarga.fecha_entrada =""
            this.formToonerRecarga.activo = true
            this.formToonerRecarga.descripsion = ""
            this.formToonerRecarga.direccion = null
        },
        async obtenerToonersRecargas(){
            const {items,totalItems,totalPages} = await this.pb.collection('tooners_recargas').getList(this.toonerModeloRecarga.page, this.toonerModeloRecarga.perPage, {
                filter: this.filtroBusquedaRecargaToner,
                sort: '-activo',
                expand:"tooner_modelo",
                fields:'*,expand.tooner_modelo.marca,nro_item,expand.tooner_modelo.modelo '
            });

            this.toonerModeloRecarga.totalItems = totalItems
            this.toonerModeloRecarga.totalPages = totalPages

            
            this.itemsToonerRecarga = items

            // this.itemsToonerRecarga.forEach((toner)=>{
            //     if(toner.activo === true){
            //         toner.bgColor = "surface"
            //     }else{
            //         toner.bgColor = "red"
            //     }
            // })

            console.log(items)
        },
        async EnviartonerRecarga(){
            const data = {...this.formToonerRecarga}
            console.log(data.fecha_entrada)
            let fecha = data.fecha_entrada


            data.fecha_entrada = new Date(data.fecha_entrada).toISOString()
            if(data.descripsion === ""){
                delete data.descripsion
            }
            try {
                const record = await this.pb.collection('tooners_recargas').create(data);
                console.log(record)
                this.notificacion("envioExitoso")
                this.obtenerToonersRecargas()
            } catch (error) {
                console.error(error.response)
                this.notificacion("ocurrioUnError")
            }
        },
        async eliminarTonerRecarga({ID}){
            try {
                if(confirm("¿Quieres eliminar el toner?")){
                    await this.pb.collection('tooners_recargas').delete(ID);
                    this.notificacion("eliminarExitoso")
                    this.obtenerToonersRecargas()
                }else{
                    return
                }
            } catch (error) {
                console.table(error)
                this.notificacion("ocurrioUnError")
            }
        },
        async editarTonerRecarga({ID}){


            const data = {...this.formToonerRecarga}
            try {
                const record = await this.pb.collection('tooners_recargas').update(ID, data);
                this.notificacion("eliminarExitoso")
                this.obtenerToonersRecargas()

            } catch (error) {
                console.table(error)
                this.notificacion("ocurrioUnError")
            }
        },

        async sumarTonerRegarca({nroActual,ID}){
            try {
                const numeroActual = Number(nroActual)
                const data = {
                    "nro_regargas": numeroActual+1
                };
                
                const record = await this.pb.collection('tooners_recargas').update(ID, data);
                this.notificacion("envioExitoso")
                this.obtenerToonersRecargas()
            } catch (error) {
                console.error(error)
                this.notificacion("ocurrioUnError")

            }
            
        },
        async restarTonerRegarca({nroActual,ID}){
            try {
                const numeroActual = Number(nroActual)
                const data = {
                    "nro_regargas": numeroActual-1
                };
                if(nroActual <= 0){
                    alert("no puede ser menor que 0")
                    return
                }
                const record = await this.pb.collection('tooners_recargas').update(ID, data);
                this.notificacion("envioExitoso")
                this.obtenerToonersRecargas()
            } catch (error) {
                console.error(error.response)
                this.notificacion("ocurrioUnError")
                
            }
        }
    },
    
})
