import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useToonersRecargasStore = defineStore('useToonersRecargasStore', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        
        descripsionTonerRecargaDescripsion:"",
        descripsionTonerRecarga:{
            "nro item": null,
            "toner marca": null,
            "toner modelo": null,
            "nro regargas": null,
            "fecha entrada": "",
            "activo": true,
            "direccion":null,
            "fecha salida":null
        },
        descripsionTonerListaRecarga:null,


        formToonerRecarga:{
            "nro_item": null,
            "tooner_modelo": null,
            "nro_regargas": 0,
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
            tonerInactivo:false,
            rangoFechas:{
                desde:null,
                hasta:null,
            }
        },



        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,

    }),

    // fecha_entrada >= "2024-02-21" && fecha_entrada <= "2024-02-22"
    getters:{
        filtroBusquedaRecargaToner() {
            const { nro_item, marca, modelo, departamento, tonerInactivo,rangoFechas } = this.FiltrotonerRecarga;

            const {desde,hasta} = rangoFechas
        
            let filterBuscar = `fecha_entrada >= "${desde}" && fecha_entrada <= "${hasta}" && `;
        
            if (marca === null && modelo === null && departamento === null  && tonerInactivo === false && nro_item === null) {
                filterBuscar = `fecha_entrada >= "${desde}" && fecha_entrada <= "${hasta}" `;
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
        },
        //muestra el total de las recargas dependiendo de la consulta
        TotalRecargas:(state)=>{
            if(state.itemsToonerRecarga !== null){
                const objeto = [...state.itemsToonerRecarga]
                let recargasTotal = 0
                objeto.forEach((toner=>{
                    recargasTotal += toner.nro_regargas
                }))
                return recargasTotal
            }
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
            this.cargando = true
            const {items,totalItems,totalPages} = await this.pb.collection('toners_recargas').getList(this.toonerModeloRecarga.page, this.toonerModeloRecarga.perPage, {
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
            this.cargando = false

            console.log(items)
        },
        async EnviartonerRecarga(){
            const data = {...this.formToonerRecarga}
            data.fecha_entrada = new Date(data.fecha_entrada).toISOString()
            if(data.descripsion === ""){
                delete data.descripsion
            }
            try {
                const record = await this.pb.collection('toners_recargas').create(data);
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
                    await this.pb.collection('toners_recargas').delete(ID);
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
            data.fecha_entrada = new Date(data.fecha_entrada).toISOString()
            try {
                const record = await this.pb.collection('toners_recargas').update(ID, data);
                this.notificacion("envioExitoso")
                this.obtenerToonersRecargas()

            } catch (error) {
                console.log(error)
                console.log(error.response)
                this.notificacion("ocurrioUnError")
            }
        },

        async sumarTonerRegarca({nroActual,ID}){
            try {
                const numeroActual = Number(nroActual)
                const data = {
                    "nro_regargas": numeroActual+1
                };
                const dataListaFecha={
                    "toner": ID,
                    "recarga": new Date().toISOString()              
                }
                const sumarTonerRecarga = this.pb.collection('toners_recargas').update(ID, data);
                const crearFechaEnLista = this.pb.collection('toner_recargas_ListaFecha').create(dataListaFecha);
                
                await Promise.all([sumarTonerRecarga,crearFechaEnLista])
                
                this.notificacion("envioExitoso")
                this.obtenerToonersRecargas()
            } catch (error) {
                console.error(error)
                console.error(error.response)
                this.notificacion("ocurrioUnError")

            }
            
        },
        async restarTonerRegarca2({toner}){

            try {
                if(confirm("¿Quieres eleminar esta recarga?")){
                    //eliminar el item en la lista de la fecha de recarga
                    const eliminarListaRecarga = this.pb.collection('toner_recargas_ListaFecha').delete(toner.id);
    
                    //restar uno en las recargas totales
                    const numeroActual = Number(toner.expand.toner.nro_regargas)
                    const data = {
                        "nro_regargas": numeroActual-1
                    };
                    const restartonerRecarga = this.pb.collection('toners_recargas').update(toner.expand.toner.id, data);
    
                    await Promise.all([eliminarListaRecarga,restartonerRecarga])
                    console.log(toner)
                    this.obtenerToonersRecargas()
                    this.obtenerTonerListaRecargas({ID:toner.expand.toner.id})
                }else{
                    return
                }

            } catch (error) {
                console.error(error)
                console.error(error.response)
                this.notificacion("ocurrioUnError")
            }
        },
        async activar_desativarTonerRegarga({statusToner,ID}){
            try {      
            const data = {
                "activo": !statusToner
            }
            if (data.activo === false){
                data["fecha_salida"] = new Date().toISOString()
                console.log(data)
            }else{
                data["fecha_salida"] = null
                console.log(data)
            }

            const record = await this.pb.collection('toners_recargas').update(ID, data);
            this.obtenerToonersRecargas()
            this.notificacion("envioExitoso")
            } catch (error) {
                console.log(error)
                console.log(error.response)
                this.notificacion("ocurrioUnError")
            }
        },
        async obtenerTonerListaRecargas({ID}){
            console.log(ID)
            try {
                const record = await this.pb.collection('toner_recargas_ListaFecha').getFullList({
                    sort:"-created",
                    filter:`toner="${ID}"`,
                    expand:"toner",
                    fields:'*,expand.toner.id,expand.toner.nro_regargas'
                });
                console.log(record)
                this.descripsionTonerListaRecarga = record
            } catch (error) {
                console.error(error)
                console.error(error.response)
            }
        }
    },
    
})
