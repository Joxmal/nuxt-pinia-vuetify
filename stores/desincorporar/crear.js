import { defineStore } from "pinia";
import PocketBase from 'pocketbase'
import {obtenerFechaHoraActual,obtenerPrimerDiaMes,obtenerUltimoDiaMes} from '~/assets/funciones_reuzables/times'




export const useCrearDesincorporacion = defineStore('useCrearDesincorporacion', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        

        //item seleccionado para mostrar Detallaes
        itemDetalles:null,


        //formulario de creacion y edicion
        seleccionEquipo:['CPU','Monitor','Impresoras','TarjetaMadre'],
        form:{
            "nro_bien": "",
            tipo_Equipo:null,
            "equipo": null,
            "fecha_desincorporado": "",
            "descripsion": ""
        },
        //--------

        //datos que se recogen de la BD
        itemsDesincorporacion:null,
        //------

        //filtro para el buscador
        FiltrobusquedaDesincorporacion:{
            nro_bien:"",
            tipo_Equipo:null,
            rangoFechas:{
                activo:false,
                desde:obtenerPrimerDiaMes(),
                hasta:obtenerUltimoDiaMes(),
            }
        },

        //paginacion de los items
        paginacionData:{
            page:1,
            perPage:50,
            totalItems:"",
            totalPages:"",
        },

        //notificaciones
        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,

    }),

    // fecha_entrada >= "2024-02-21" && fecha_entrada <= "2024-02-22"
    getters:{

        tipoEquipoSeleccionado: (state) => {
            const { tipo_Equipo,equipo } = state.form;
            
            const listasStore = useListasStore();
            
            let equipoSeleccionado = [''];
            
            if (tipo_Equipo !== null) {
                equipoSeleccionado = listasStore[`lista${tipo_Equipo}`] || [''];
                console.log(state.form.equipo)
            }
            return equipoSeleccionado;
        },

        FiltroComputedBusquedaDesincorporacion() {
            const { nro_bien,tipo_Equipo,rangoFechas } = this.FiltrobusquedaDesincorporacion;

            const {desde,hasta,activo} = rangoFechas
            
            let filterBuscar = `fecha_desincorporado >= "${desde} 00:00:00.000Z" && fecha_desincorporado <= "${hasta} 23:59:59.999Z" && `;
            if(!activo){
                filterBuscar = ""
            }

            if (nro_bien === "" && tipo_Equipo === null) {
                filterBuscar = `fecha_desincorporado >= "${desde} 00:00:00.000Z" && fecha_desincorporado <= "${hasta} 23:59:59.999Z" `;
                if(!activo){
                    filterBuscar = ""
                }
            } else {

                if (nro_bien !== "") {
                    if (nro_bien !== "" ) {
                    }
                    filterBuscar += `nro_bien ~ "${nro_bien}"`;
                }

                if (tipo_Equipo !== null) {
                    if (nro_bien !== "") {
                        filterBuscar += " && ";
                    }
                    filterBuscar += `tipo_Equipo = "${tipo_Equipo}"`;
                }

            }

            return filterBuscar;
        },        

    },
    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },
        formatearFormulario(){
            this.form.nro_bien = ""
            this.form.tipo_Equipo = null
            this.form.equipo = null
            this.form.fecha_desincorporado = obtenerFechaHoraActual()
            this.form.descripsion = ""
        },
        async crearNuevaDesincorporacion(){
            const data = {...this.form}
            data.fecha_desincorporado = new Date(data.fecha_desincorporado).toISOString()

            if (data.nro_bien === "") {
                alert('Por favor, ingresa un número de bien');
                return;
            }
            if (data.tipo_Equipo === null || data.equipo === null) {
                alert('Por favor, selecciona un tipo de equipo');
                return;
            }

            try {
                await this.pb.collection('desincorporaciones').create(data);
                await this.obtenerDesincorporacion()
                
                this.notificacion('envioExitoso')
            } catch (error) {
                console.error(error.response)
                console.error(error)
                this.notificacion('ocurrioUnError')
            }
        },
        async obtenerDesincorporacion(){
            try {
                this.cargando = true
                const {items,totalItems,totalPages} = await this.pb.collection('desincorporaciones').getList(this.paginacionData.page, this.paginacionData.perPage, {
                    filter: this.FiltroComputedBusquedaDesincorporacion,
                    sort: '-created',
                });

                this.paginacionData.totalItems = totalItems
                this.paginacionData.totalPages = totalPages

                items.forEach((archivo,index)=>{
                    archivo.imagenes.forEach((imagen,index)=>{
                        const imageName = imagen
                        const imagenUrl = this.pb.files.getUrl(archivo,imageName)
                        archivo.imagenes[index] = imagenUrl
                    })        
                })

                console.log(items)
                this.itemsDesincorporacion = items
                this.cargando = false
            } catch (error) {
                this.cargando = false
                console.error(error)
                this.notificacion('ocurrioUnError')
            }
        },
        async eliminarDesincorporacion({ID}){

            console.log(ID)
            try {
                if(confirm('¿Quiere eliminar esta Desincorporación?')){
                    await this.pb.collection('desincorporaciones').delete(ID);
    
                    await this.obtenerDesincorporacion()
                    setTimeout(() => {
                        this.notificacion('eliminarExitoso')
                    }, 500);
                }else{
                    return
                }
            } catch (error) {
                console.error(error)
                this.notificacion('ocurrioUnError')
            }
        },
        async editarDesincorporacion({ID}){
            const data = {...this.form}
            data.fecha_desincorporado = new Date(data.fecha_desincorporado).toISOString()

            if(data.imagenes){
                const record = await this.pb.collection('desincorporaciones').update(ID, {imagenes:null});
            }
            try{
                const record = await this.pb.collection('desincorporaciones').update(ID, data);
                await this.obtenerDesincorporacion()
                this.notificacion('editarExitoso')
            }catch(error){
                console.error(error)
                console.error(error.response)
                this.notificacion('ocurrioUnError')
            }
        }

        
    },
})
