import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useEstadisticas = defineStore('useEstadisticas', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        listaReportes:[],


        cargando:false,
    }), 
    getters:{
        // listaDeTrabajadores(state){
        //     const seleccionDepartamento = state.datosTrabajadores.filter((usuario)=>{
        //         return usuario.departamento == state.form.direccion 
        //     })
        //     const seleccionTrabajador = seleccionDepartamento.map(trabajador=>(
        //     {
        //         trabajador: trabajador.usuario,
        //         ID: trabajador.id,
        //         IP: trabajador.IP,
        //         departamento: trabajador.departamento,
        //     }
        //     ),
        //     state.form.responsable=""
        //     );
        //     return seleccionTrabajador
        // },
        // filtroBusqueda() {
        //     const { usuario, piso, departamento } = this.variablesFiltroEquipos;
        //     let filterBuscar = "";
          
        //     if (usuario === "" && piso === "" && departamento === "") {
        //       filterBuscar = "";
        //     } else {
        //       if (usuario !== "") {
        //         filterBuscar += `responsable.usuario ~ "${usuario}"`;
        //       }
        //       if (departamento !== "" && departamento !== null) {
        //         if (filterBuscar !== "") {
        //           filterBuscar += " && ";
        //         }
        //         filterBuscar += `direccion ~ "${departamento}"`;
        //       }
        //       if (piso !== "" && piso !== null) {
        //         if (filterBuscar !== "") {
        //           filterBuscar += " && ";
        //         }
        //         filterBuscar += `piso = "${piso}"`;
        //       }
        //     }
          
        //     return filterBuscar;
        // }
    },
    actions:{
        async obtenerDatosReportes(){
            try {
                this.cargando = true
                const {items,page,perPage,totalItems,totalPages} = await this.pb.collection('reportes').getList(1, 3, {
                    filter: "",
                    sort: '-created',
                    // expand:'creador',
                });
                console.log(items)

                this.listaReportes = items
                this.cargando = false

            } catch (error) {
                console.error(error)
            }
        },

    },
})
