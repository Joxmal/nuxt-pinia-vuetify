import { defineStore } from "pinia";
import PocketBase from 'pocketbase'
import jsPDF from "jspdf";
import autoTable  from "jspdf-autotable";



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
    //loading de las cards
    loadinCards:true,

    //lista de asistencia
    asistenciaLista_Usuario: '',
    conteoTotalAsistencia:'',

    //datos del dialogo
    dialogoDescripsion:'',

    //ID de la asistencia al editar
    ID_asistencia_editar:'id',
    modoEditar:false,

    tipoReporte:['PREVENTIVO','CORRECTIVO','CABLEADO','ASIST. EXTERNO','ASIST. INTERNO','ASIST. TÉCNICA','RESPALDO','OPERATIVOS ESP.'],

    //seleccion del id de creacion (para buscar en la bd a partir de la ID del usuario)
    seleccionUsuario:useStoreConexion().avatarID,

    //paginacion para ver las cards
    paginationItemsPorPagina:50,
    pagination:1,
    totalPage:5,

    //filtros de busqueda para la base de datos
    tipoReporteFiltro:['TODOS','PREVENTIVO','CORRECTIVO','CABLEADO','ASIST. EXTERNO','ASIST. INTERNO','ASIST. TÉCNICA','RESPALDO','OPERATIVOS ESP.'], 
    variablesFiltro:{
      filtroCreador: `creador="${useStoreConexion().avatarID}"`,
      tipoAsistencia:'TODOS',
      fechaPeticion: {
        rango: {
          activo:true,
          desde: "2020-12-01",
          hasta: "2040-12-01",
        },
        fecha:"2023-12-20"
      }
    }


  }),
  getters:{
    conteoAsistencia: (state) => state.asistenciaLista_Usuario.items.length,
    filtroBusqueda() {
      const { fechaPeticion, filtroCreador, tipoAsistencia } = this.variablesFiltro;
      const { rango, fecha } = fechaPeticion;
    
      let filterBuscar = "";
    
      if (rango.activo) {
        if (filtroCreador === 'creador="jlpwz10ms03on6z"') {
          filterBuscar += `(fechaEntrada >= "${rango.desde}" && fechaSalida <= "${rango.hasta}")`;
        } else {
          filterBuscar += `creador="${this.seleccionUsuario}" && (fechaEntrada >= "${rango.desde}" && fechaSalida <= "${rango.hasta}")`;
        }
    
        if (tipoAsistencia !== "TODOS") {
          filterBuscar += ` && tipoReporte = "${tipoAsistencia}"`;
        }
      } else {
        if (filtroCreador === 'creador="jlpwz10ms03on6z"') {
          filterBuscar += `fechaEntrada ~ "${fecha}"`;
        } else {
          filterBuscar += `creador="${this.seleccionUsuario}" && fechaEntrada ~ "${fecha}"`;
        }
    
        if (tipoAsistencia !== "TODOS") {
          filterBuscar += ` && tipoReporte = "${tipoAsistencia}"`;
        }
      }
    
      return filterBuscar;
    },
    contadorTiposAsistencia(){
      const reportes = {};
      if (this.asistenciaLista_Usuario !== '') {
        this.asistenciaLista_Usuario.items.forEach(item => {
          const tipoReporte = item.tipoReporte;
          if (tipoReporte in reportes) {
            reportes[tipoReporte]++;
          } else {
            reportes[tipoReporte] = 1;
          }
        });
        return reportes
      }
    }


  },
  actions:{
    resetearReporte(){
      this.form.item=''
      this.form.tipoReporte=null
      this.form.departamento=null,
      this.form.funcionario=null,
      this.form.horaEntrada="08:00",
      this.form.horaSalida="14:30",
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

        this.obtenerPrimerDiaMes()
        this.obtenerUltimoDiaMes()
        this.obtenerDiaActual()

    },
    async crearReporte(data){
      this.form.creador= useStoreConexion().avatarID

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

      this.loadinCards= true

      try {
        const pb = new PocketBase(this.pb_url)

        let filterBuscar = this.filtroBusqueda

        console.log(this.filtroBusqueda)

        const records = await pb.collection('reportes').getList(this.pagination, this.paginationItemsPorPagina, {
          sort: '-created',
          filter:filterBuscar
        });
        console.log(records)

        this.asistenciaLista_Usuario= records
        this.conteoTotalAsistencia = records.totalItems
        this.totalPage= records.totalPages

      } catch (err) {
        console.log(err)
      }

      this.loadinCards= false

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
    },

    //calcular primer y ultimo dia del mes
  obtenerDiaActual(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
    const día = fechaActual.getDate();

    const fechaFormateada = `${año}-${mes}-${día}`;
    
    this. variablesFiltro.fechaPeticion.fecha = fechaFormateada
  },
  
  obtenerPrimerDiaMes(){
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      let mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
      mes = mes.toString().padStart(2, "0"); // pasar a 01 en caso de que sea 1
      const día = "01"
      const fechaFormateada = `${año}-${mes}-${día}`;
      
      this.variablesFiltro.fechaPeticion.rango.desde = fechaFormateada
  },
  obtenerUltimoDiaMes(){
      const fechaActual = new Date();
      const año = fechaActual.getFullYear();
      let mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
      mes = mes.toString().padStart(2, "0"); // pasar a 01 en caso de que sea 1

      const últimoDía = new Date(año, mes, 0).getDate();
      const fechaFormateada = `${año}-${mes}-${últimoDía}`;

      this.variablesFiltro.fechaPeticion.rango.hasta = fechaFormateada
  },

  generarPDF(){
    const doc = new jsPDF('p', 'mm', 'letter')


    

    const columns = [`trabajador`,`tipoReporte`,`Departamento`,`funcionario`,`fechaInicio`,`fechaSalida`,`NroItem`]

    let data = this.asistenciaLista_Usuario.items
    data = data.map(item=>([
      this.buscarNombrePorID(item.creador),
      item.tipoReporte,
      item.departamento,
      item.funcionario,
      new Date(item.fechaEntrada).toLocaleDateString(), 
      new Date(item.fechaSalida).toLocaleDateString(),
      item.item,
    ]));


    autoTable(doc,{
      startY:20,
      margin:{horizontal:10},
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      showHead: "everyPage",
      didDrawPage: function (data) {

          // Header
          doc.setFontSize(20);
          doc.setTextColor(40);
          doc.text("Reporte", 95,10);

          // Footer
          const str = "pagina " + doc.internal.getNumberOfPages();

          doc.setFontSize(10);

          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
          },
      head:[columns],
      body: data


    })
    
    
    doc.addPage();
    doc.text('CONTEO',95,15);

    let dataConteo = this.contadorTiposAsistencia
    dataConteo = Object.entries(dataConteo)
    console.log(dataConteo)
    
    const separado = dataConteo.reduce((resultado, [nombre, valor]) => {
      resultado.strings.push(nombre);
      resultado.numeros.push(valor);
      return resultado;
    }, { strings: [], numeros: [] });

    console.log(separado);

    autoTable(doc,{
      startY:20,
      margin:{horizontal:10},
      // styles: { overflow: "linebreak" },
      // bodyStyles: { valign: "top" },
      // showHead: "everyPage",
      head:[separado.strings],
      body: [separado.numeros]
    })
    //-------------------------------------------

    // otra tabla con el total
    let sumaTotal = 0
    console.log(separado.numeros)

    for (let numero of separado.numeros) {
      console.log(numero)
      sumaTotal += numero
    }
    console.log(sumaTotal)
    autoTable(doc,{
      styles: { overflow: "linebreak" },
      headStyles:{ halign: 'center' },
      bodyStyles: { halign: 'center' },
      margin:{horizontal:10},
      startY:50,
      // bodyStyles: { valign: "top" },
      // showHead: "everyPage",
      head:[['total']],
      body: [[sumaTotal]]
    })
  
    window.open(doc.output('bloburl'), '_blank');

  }

  },
})