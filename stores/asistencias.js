import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useAsistenciasStore = defineStore('useAsistenciasStore', {
    state: () => ({
      pb_url: useRuntimeConfig().public.POCKETBASE_URL,
      listaTotalEmpleados_oficina: undefined,
      
      listaDepartamento:undefined,
      mapeo:false,


      //formulario de creacion
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

      //fechas de peticiones a la base de datos de las asistencias 
      fechaPeticion:{
        desde:"2000-12-16",
        hasta:"2040-12-16"
      }

    }),
    getters:{

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
        const storeConexion = useStoreConexion()
        const pb = new PocketBase(this.pb_url)
        const records = await pb.collection('reportes').getFullList({
          sort: '-created',
          filter:`creador="${storeConexion.avatarID}" && ( fechaEntrada >= "${this.fechaPeticion.desde}" && fechaSalida <= "${this.fechaPeticion.hasta}" )`
        });
        console.log(records)
        this.asistenciaLista_Usuario= records
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

    DialogoDescripsion(valor){
      this.dialogoDescripsion = valor
    },

    //consulta a la bd por fecha 
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