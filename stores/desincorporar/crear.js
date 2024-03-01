import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useCrearDesincorporacion = defineStore('useCrearDesincorporacion', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        


        seleccionEquipo:['CPU','Monitor','Impresoras','TarjetaMadre'],
        form:{
            "nro_bien": "",
            tipo_Equipo:null,
            "equipo": null,
            "fecha_desincorporado": "",
            "descripsion": ""
        },


        itemsDesincorporacion:null,

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
        }

    },
    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },
        async crearNuevaDesincorporacion(){
            const data = {...this.form}
            data.fecha_desincorporado = new Date(data.fecha_desincorporado).toISOString()

            try {
                await this.pb.collection('desincorporaciones').create(data);
                await this.obtenerDesincorporacion()
                
                this.notificacion('envioExitoso')
            } catch (error) {
                console.error(error.response)
                this.notificacion('ocurrioUnError')
            }
        },
        async obtenerDesincorporacion(){
            try {
                this.cargando = true
                const {items,totalItems,totalPages} = await this.pb.collection('desincorporaciones').getList(1, 10000, {
                    filter: "",
                    sort: '-created',
                    // expand:"tooner_modelo",
                    // fields:'*,expand.tooner_modelo.marca,nro_item,expand.tooner_modelo.modelo '
                });
                this.itemsDesincorporacion = items
                console.log(items)
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
        
    },
})
