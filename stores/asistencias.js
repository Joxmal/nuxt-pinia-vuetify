import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useAsistenciasStore = defineStore('useAsistenciasStore', {
    state: () => ({
      pb_url: useRuntimeConfig().public.POCKETBASE_URL,
      listaTotalEmpleados_oficina: undefined,
      
      listaDepartamento:undefined,
      mapeo:false,

      //formulario de creacion--edicion SE EUTILIZA EN LA DESCRIPSION (VA CAMBIANDO)
      form : {
        creador:useStoreConexion().avatarID,
        item:'',
        tipoReporte:null,
        departamento:null,
        funcionario:null,
        horaEntrada:"08:00",
        horaSalida:"14:30",
        fechaEntrada:null,
        fechaSalida:null,
        descripsion:'',
        status:false
      },

      //aqui se almacena el nombre de la card de la asistencia para mostrar el nombre de la persona que creo esa asistencia
      nombreCardAsistencia:'',

      //notificaciones
      iconError:false,
      iconCreate:false,
      iconDelete:false,

      //lista de asistencia
      asistenciaLista_Usuario: '',

      //datos del dialogo
      dialogoDescripsion:'',

      //ID de la asistencia al editar
      ID_asistencia_editar:'id',
      modoEditar:false,

      tipoReporte:['PREVENTIVO','CORRECTIVO','CABLEADO','ASIST. EXTERNO','ASIST. INTERNO','ASIST. TÉCNICA','RESPALDO','OPERATIVOS ESP.'],


      //FILTRADOS DE BUSQUEDA
      //fechas de peticiones a la base de datos de las asistencias 
      fechaPeticion:{
        desde:"2000-12-16",
        hasta:"2040-12-16",
      },
      //seleccion del id de creacion (para buscar en la bd a partir de la ID del usuario)
      seleccionUsuario:useStoreConexion().avatarID

    }),
    getters:{
      conteoAsistencia: (state) => state.asistenciaLista_Usuario.length,
    },
  actions:{
    resetearReporte(){
      this.form.item=''
      this.form.tipoReporte=null
      this.form.departamento=null,
      this.form.funcionario=null,
      this.form.horaEntrada="08=00",
      this.form.horaSalida="14=30",
      this.form.fechaEntrada=null,
      this.form.fechaSalida=null,
      this.form.descripsion='',
      this.form.status=false
    },
    async obtenerDatos(){
      const store = useIPListaStore()
      await store.obtenerListaDatos()
      let lista = store.mapeoLista

      lista = lista.reduce((acc, usuario) => {
        if (!acc[usuario.departamento]) {
          acc[usuario.departamento] = [];
        }
        acc[usuario.departamento].push(usuario.usuario);
        return acc;
      }, {});
      const departamentos = Object.keys(lista);

        this.listaTotalEmpleados_oficina = lista
        this.listaDepartamento = departamentos
    },
    async crearReporte(data){
      try {
        const pb = new PocketBase(this.pb_url)
        const record = await pb.collection('reportes').create(data);
        console.log("reporte")
        console.log(record)

        this.iconCreate= true
        setTimeout(() => {
        this.iconCreate= false
        }, 2000);

        this.resetearReporte()
        this.obtenerReporte()
      } catch (err) {
        console.log(err.response)

        this.iconError= true
        setTimeout(() => {
        this.iconError= false
        }, 2000);
      }


    },

    async editarReporte(){
      const pb = new PocketBase(this.pb_url)
      const record = await pb.collection('reportes').update(this.ID_asistencia_editar, this.form);
      console.log(record)
      console.log("editado con exito")

      this.resetearReporte()
      this.obtenerReporte()
      this.ID_asistencia_editar =""

    },

    async eliminarReporte(ID){
      try {
        const pb = new PocketBase(this.pb_url)
        if (confirm('¿Desea Eliminar esta asistencia?')) {
          await pb.collection('reportes').delete(ID);
          console.log("eliminado con exito")

          this.obtenerReporte()

        }else{
          return
        }
      } catch (error) {
        console.log("ocurrio un error")
        console.log(error.response)
      }
    },

    async obtenerReporte(){
      try {
        const pb = new PocketBase(this.pb_url)

        let filterBuscar = `creador="${this.seleccionUsuario}" && ( fechaEntrada >= "${this.fechaPeticion.desde}" && fechaSalida <= "${this.fechaPeticion.hasta}" )`

        const records = await pb.collection('reportes').getFullList({
          sort: '-created',
          filter:filterBuscar
        });
        this.asistenciaLista_Usuario= records

        console.log(this.asistenciaLista_Usuario)
      } catch (err) {
        console.log(err.response.data)
      }
    },

    buscarNombrePorID(valor){
      const storeConexion = useStoreConexion()
      const listaUsuarios = storeConexion.usuariosLista
      
      const usuarioEncontrado = listaUsuarios.find(item => item.id === valor);
      if (usuarioEncontrado) {
        return usuarioEncontrado.name;
      }else{
        'sin Nombre'
      }
    },


    buscarIDPorNombre(valor){
      const storeConexion = useStoreConexion()
      const listaUsuarios = storeConexion.usuariosLista
      
      const usuarioEncontrado = listaUsuarios.find(item => item.name === valor);
      if (usuarioEncontrado) {
        console.log("lista de usuarios")
        console.log(usuarioEncontrado.id)
        return usuarioEncontrado.id;
      }else{
        'sin Nombre'
      }
    },

    DialogoDescripsion(valor){
      this.dialogoDescripsion = valor
    },

    //consulta a la bd por fecha (no se esta usando por ahora )
    async obtenerConsultaPorFecha(){
      const pb = new PocketBase(this.pb_url)
      try {
        const records = await pb.collection('reportes').getFullList({
          sort: '-created',
          filter:`fechaEntrada >= "2023-12-16" && fechaSalida <= "2023-12-23"`
        });
        console.log(records)
      } catch (error) {
        console.log(error.response)
      }
    }

  },
    
})