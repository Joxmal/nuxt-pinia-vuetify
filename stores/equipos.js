import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useEquipos = defineStore('useEquipos', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

        //detalles de un equipo
        equipoDetalles:{},

        //lista de empleados
        datosTrabajadores: [],
        //lista de equipos en la base de datos
        listaEquiposBD:'',
        //paginacion de los equipos
        paginacion:{
            page:1,
            perPage:50,
            totalItems:"",
            totalPages:"",
        },
        
        //datos entregados
        datos:null,
        //formulario para crear oficina
        form:{
            piso:null,
            direccion:"",
            responsable:"",
            ipv_4: "",
            monitor:'',
            cpu:'',
            impresora:'',
            ram:null,
            almacenamiento:null,
        },
        cargando:false,
        envioExitosoEquipo:false,
        eliminarExitosoEquipo:false,
        editarExitosoEquipo:false,
        ocurrioUnError:false
    }), 
    getters:{
        listaDeTrabajadores(state){
            const seleccionDepartamento = state.datosTrabajadores.filter((usuario)=>{
                return usuario.departamento == state.form.direccion 
            })
          const seleccionTrabajador = seleccionDepartamento.map(trabajador=>(
            {
                trabajador: trabajador.usuario,
                ID: trabajador.id,
                IP: trabajador.IP,
                departamento: trabajador.departamento,
            }
          ),
            state.form.responsable=""
          );
            return seleccionTrabajador
        },
    },
    actions:{
        async obtenerDatosTrabajadores(){
            try {
                this.cargando = true
                const records = await this.pb.collection('usuarios').getFullList({
                    sort: '-created',
                });
                this.datosTrabajadores = records
    
                this.cargando = false
            } catch (error) {
                console.error(error.message)
                this.ocurrioUnError = true
                setTimeout(() => {
                    this.ocurrioUnError = false
                }, 3000);
            }
        },
        async crearEquipo(){
            try {
                this.cargando = true
                const record = await this.pb.collection('equipos').create(this.form);
                console.log(record)
                this.cargando = false
                this.envioExitosoEquipo = true
                setTimeout(() => {
                    this.envioExitosoEquipo = false
                }, 3000);
                

            } catch (error) {
                console.error(error.message)
                this.ocurrioUnError = true
                setTimeout(() => {
                    this.ocurrioUnError = false
                }, 3000);
            }
        },
        async obtenerEquiposDB(){
            try {
                //page = pagina actual en la que se navega
                //perPage = cantidad de items a mostrar por pagina
                //totalItems = total de  items en la base de datos
                //totalPages = total de paginas que se pueden mostrar
                const {items,page,perPage,totalItems,totalPages} = await this.pb.collection('equipos').getList(this.paginacion.page, this.paginacion.perPage, {
                    sort: '-created',
                    expand:'responsable'
                });
                console.log(items)
                this.listaEquiposBD = items

                this.paginacion.page = page
                this.paginacion.perPage = perPage
                this.paginacion.totalItems = totalItems
                this.paginacion.totalPages = totalPages
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    this.ocurrioUnError = false
                }, 3000);
            }
        },

        async eliminarEquipo({IDequipo}){
            try {

                if (confirm('¿Desea Eliminar esta asistencia?')) {
                    await this.pb.collection('equipos').delete(IDequipo);
                    this.eliminarExitosoEquipo = true
                    setTimeout(() => {
                        this.eliminarExitosoEquipo = false
                    }, 3000);
                  }else{
                    return
                }

            } catch (error) {
                console.error(error.message)
                this.ocurrioUnError = true
                setTimeout(() => {
                    this.ocurrioUnError = false
                }, 3000);
            }
        },
        convertirImagenURL({collectionId="collectionId",id="id",name="name"}){
            const imagen = `${useRuntimeConfig().public.POCKETBASE_URL}/api/files/${collectionId}/${id}/${name}`
            return imagen
        },
        obtenerArrayImagenes(objeto) {
            console.log(objeto)
            let listadoImagenes =[]
            if (objeto && objeto.imagenes && Array.isArray(objeto.imagenes)) {
                for (let i = 0; i < objeto.imagenes.length; i++) {
                    listadoImagenes.push(`${useRuntimeConfig().public.POCKETBASE_URL}api/files/${objeto.collectionId}/${objeto.id}/${objeto.imagenes[i]}`);
                }
                return listadoImagenes
            } else {
                return [];
            }
        }
        
    },
})
