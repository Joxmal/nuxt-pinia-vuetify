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
            page:"",
            perPage:"",
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
        envioExitosoOficina:false,
        eliminarExitosoOficina:false,
        editarExitosoOficina:false,
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
            const records = await this.pb.collection('usuarios').getFullList({
                sort: '-created',
            });
            this.datosTrabajadores = records
        },
        async crearEquipo(){
            try {
                const record = await this.pb.collection('equipos').create(this.form);
                console.log(record)
            } catch (error) {
                console.error(error.message)
                console.error(error)
                console.error(error.details)
            }
        },
        async obtenerEquiposDB(){
            try {
                //page = pagina actual en la que se navega
                //perPage = cantidad de items a mostrar por pagina
                //totalItems = total de  items en la base de datos
                //totalPages = total de paginas que se pueden mostrar
                const {items,page,perPage,totalItems,totalPages} = await this.pb.collection('equipos').getList(1, 50, {
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
