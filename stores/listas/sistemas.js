import { defineStore } from "pinia";
import PocketBase from 'pocketbase'
import { pb } from 'assets/pbConexion'

export const useListasSistemasStore = defineStore('useListasSistemasStore', {
  state: () => ({
    //nombre de la tabla
    TABLA_NAME:'Tareas_sistemas',
    //

    // lista de las areas de informatica
    listaAreas: ['Sistemas'],

    count_reload: 0,

    //filtro para el buscador

    //lista optenida de la base de datos
    BD_listaAtividades: {},


    //listas procesadas
    BD_procesada_listaAtividades: {},

    //formulario para crear/editar

    formId:'', //ID del formulario seleccionado
    form:{
      area:null,
      sistema:null,
      description:null
    },


    //notificaciones
    notificaciones: {
      cargando: false,
      envioExitoso: false,
      eliminarExitoso: false,
      editarExitoso: false,
      ocurrioUnError: false,
    }

  }),

  // fecha_entrada >= "2024-02-21" && fecha_entrada <= "2024-02-22"
  getters: {
    itemsTabla_BD_procesada_listaAtividades: (state) => {
      if (Object.keys(state.BD_procesada_listaAtividades).length === 0) return
      const itemsListaTabla = []
      for (const area in state.BD_procesada_listaAtividades) {
        const tareas = state.BD_procesada_listaAtividades[area].tareas;

        // Recorrer las tareas de cada área
        for (const tareaId in tareas) {
          const tarea = tareas[tareaId];

          // Agregar un nuevo objeto al array
          itemsListaTabla.push({
            area: area,
            tarea: tarea.nombre,
            description: tarea.description,
            id: tarea.id
          });
        }
      }
      console.log("itemsListaTabla",itemsListaTabla)

      return itemsListaTabla
    },
    
    //generar listar para data table
    listarParaSelect:(state) => {
      if (Object.keys(state.BD_procesada_listaAtividades).length === 0) return
      const listaAreas = state.listaAreas
      const data = state.BD_procesada_listaAtividades
    
      const sistemasNombres = Object.values(data[listaAreas[0]].tareas).map(tarea => tarea.nombre)
      const tecnicoNombres = Object.values(data[listaAreas[1]].tareas).map(tarea => tarea.nombre)

      return {
        [listaAreas[0]]:sistemasNombres,
        [listaAreas[1]]:tecnicoNombres,
      }
    }
  },
  actions: {
    async obtenerActvidades() {
      this.notificaciones.cargando = true
      try {
        const records = await pb.collection(this.TABLA_NAME).getFullList({
          sort: '-created',
          expand: `area`
        });

        this.BD_listaAtividades = records

        this.BD_procesada_listaAtividades = {}
          
        this.BD_listaAtividades.forEach((sistema, index) => {
          const areaId= sistema.expand.area.id
          const areaNombre = sistema.expand.area.nombre; // Obtener el nombre del área
          const tareaId = sistema.id; // Obtener el ID de la tarea
          const tareaDescription = sistema.description || ''; // Obtener la descripción de la tarea
          const tareaNombre = sistema.sistema

          // Si el área no existe en actividades, inicializarla
          if (!this.BD_procesada_listaAtividades[areaNombre]) {
            this.BD_procesada_listaAtividades[areaNombre] = {
              tareas: {}
              
            };
            this.BD_procesada_listaAtividades[areaNombre].id = areaId
          }

          // Agregar la tarea al objeto del área
          this.BD_procesada_listaAtividades[areaNombre].tareas[index + 1] = {
            nombre: `${tareaNombre}`,
            id: tareaId,
            description: tareaDescription
          };
        });
  
        this.notificaciones.cargando = false
    
        
      } catch (error) {
        console.error(error)
      this.notificaciones.cargando = false
      this.notificaciones.ocurrioUnError = true
      }
    },
  
    async crearActividad({data}){
      const dataForm = {...data}
      
      dataForm.area = this.buscarIdAreaPorNombre(data.area)
      

      try {
        const record = await pb.collection(this.TABLA_NAME).create(dataForm);
        console.log('creado',record )
        this.count_reload++
        this.notificaciones.envioExitoso = true
        setTimeout(() => {
          this.notificaciones.envioExitoso = false 
        }, 1000);
      } catch (error) {
        console.error(error?.response)
        if(error?.response?.data?.area.message === "Value must be unique." && error?.response?.data?.tarea.message === "Value must be unique." ){
          alert('Esta Tarea Esta Repetida')
        }
      }
    },

    async editarActividad({data}){
      const dataForm = {...data}
      
      dataForm.area = this.buscarIdAreaPorNombre(data.area)

      try {
        const record = await pb.collection(this.TABLA_NAME).update(this.formId, dataForm);
        console.log(record)
        this.notificaciones.editarExitoso = true
        setTimeout(() => {
          this.notificaciones.editarExitoso = false
        }, 2000);

        this.count_reload++
      } catch (error) {
        console.error(error)
      }
    },

    async eliminarActividad({id}){
      if (!confirm('¿Desea Eliminar esta asistencia?')) return
    
      try {
        await pb.collection(this.TABLA_NAME).delete(id);

        this.notificaciones.eliminarExitoso = true
        setTimeout(() => {
          this.notificaciones.eliminarExitoso = false
        }, 2000);
        this.count_reload++
      } catch (error) {
        console.error(error)
        this.notificaciones.cargando = false
        this.notificaciones.ocurrioUnError = true
      }
    },


    buscarActividadIdPorNombre(nombre) {

      const listaAreas = this.listaAreas
      // Buscar en Sistemas
      for (const tarea of Object.values(this.BD_procesada_listaAtividades[listaAreas[0]].tareas)) {
        if (tarea.nombre === nombre) {
          return tarea.id;
        }
      }
    
      // // Buscar en Técnico
      // for (const tarea of Object.values(this.BD_procesada_listaAtividades[listaAreas[1]].tareas)) {
      //   if (tarea.nombre === nombre) {
      //     return tarea.id;
      //   }
      // }
    
      // Si no se encuentra, devolver un mensaje
      return `No se encontró la tarea con el nombre: ${nombre}`;
    },

    buscarIdAreaPorNombre(areaNombre){
      if (this.BD_procesada_listaAtividades[areaNombre]) {
        return this.BD_procesada_listaAtividades[areaNombre].id;
      } else {
        return `No se encontró el área: ${areaNombre}`;
      }
    },

    resetearFormulario(){
      this.form = {
        area:null,
        tarea:null,
        description:null
      }
    }
    


  },
})
