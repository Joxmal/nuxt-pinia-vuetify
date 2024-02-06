import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useEquipos = defineStore('useEquipos', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

        //lista de empleados
        datosTrabajadores: [],
        
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
        }
    },
})
