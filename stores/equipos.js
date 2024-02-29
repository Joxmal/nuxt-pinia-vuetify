import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useEquiposStore = defineStore('useEquiposStore', {
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
            direccion:null,
            responsable:null,
            ipv_4: "",
            monitor:null,
            cpu:null,
            impresora:null,
            ram:null,
            almacenamiento:null,
        },
        cargando:false,
        envioExitosoEquipo:false,
        eliminarExitosoEquipo:false,
        editarExitosoEquipo:false,
        ocurrioUnError:false,
        //varibles usadas para el filtro de busqueda sql
        variablesFiltroEquipos:{
            usuario: "",
            piso:'',
            departamento:'',
        },
        variablePrueba:''
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
        filtroBusqueda() {
            const { usuario, piso, departamento } = this.variablesFiltroEquipos;
            let filterBuscar = "";
          
            if (usuario === "" && piso === "" && departamento === "") {
              filterBuscar = "";
            } else {
              if (usuario !== "") {
                filterBuscar += `responsable.usuario ~ "${usuario}"`;
              }
              if (departamento !== "" && departamento !== null) {
                if (filterBuscar !== "") {
                  filterBuscar += " && ";
                }
                filterBuscar += `direccion ~ "${departamento}"`;
              }
              if (piso !== "" && piso !== null) {
                if (filterBuscar !== "") {
                  filterBuscar += " && ";
                }
                filterBuscar += `piso = "${piso}"`;
              }
            }
          
            return filterBuscar;
        }
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
                this.cargando = false
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
                    expand:'responsable',
                    filter: this.filtroBusqueda
                });
                // console.log("base de datos")
                // console.log(items)
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
        async editarEquipo({id}){
            try {
                await this.pb.collection('equipos').update(id,this.form);
                this.editarExitosoEquipo = true
                this.obtenerEquiposDB()
                setTimeout(() => {
                    this.editarExitosoEquipo = false
                }, 3000);

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
                    listadoImagenes.push(`${useRuntimeConfig().public.POCKETBASE_URL}/api/files/${objeto.collectionId}/${objeto.id}/${objeto.imagenes[i]}`);
                }
                return listadoImagenes
            } else {
                return [];
            }



        },
        resetearForm(){
            this.form.piso=null
            this.form.direccion=""
            this.form.responsable=""
            this.form.ipv_4=""
            this.form.monitor=""
            this.form.cpu=""
            this.form.impresora=""
            this.form.ram=""
            this.form.almacenamiento=null
        }
    },
})
