import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useEstadisticas = defineStore('useEstadisticas', {
    state: () => ({
        pb_url:useRuntimeConfig().public.POCKETBASE_URL,
        listaReportes:[],
        ListaReportesFiltrada:null,
        
        //---------------asistencias
        ListaTotalAsistencias:0,
        totalAsistenciasCategorias:0,
        //---------------equipos
        listaTotalEquipos:0,
        totalEquiposPorOficina:0,
        chartJSEquiposPorPiso:0,
        //prueba TEST

        testEquipos:null,
        //-----------
        cargando:false,
    }), 
    persist:persistedState.localStorage, 
    getters:{

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
      // obtener todas las asistencias
        async obtenerDatosReportes(){
			    const toastId = useNuxtApp().$toast.loading("Cargando");


          const {avatarNombre}= useStoreConexion()

          let filter
          useStoreConexion().avatarRole === 'superUser'
            ? filter = ``
            : filter = `creador.name = "${avatarNombre}"`

          const pb = new PocketBase(this.pb_url)
          try {
            const {items,page,perPage,totalItems,totalPages} = await pb.collection('reportes').getList(1, 30000, {
              filter: filter,
              sort: '-created',
              expand:'creador',
            });
            this.listaReportes = items
            
            useNuxtApp().$toast.remove(toastId);
            console.log(items)
          } catch (error) {
            useNuxtApp().$toast.update(toastId, {
              render: "Error al Cargar los reportes",
              type: "error",
              isLoading: false,
              autoClose: 5000,
            });
            console.error(error)
          }
        },

      // obtener todos los equipos
        async obtenerDatosEquipos(){
        const pb = new PocketBase(this.pb_url)
        try {
          const {items,page,perPage,totalItems,totalPages} = await pb.collection('equipos').getList(1, 3000, {
            filter: "",
            sort: '-created',
            expand:'responsable',
        });
          this.listaTotalEquipos = items
          this.testEquipos = items
        } catch (error) {
          console.error(error)
        }
      },

      ///esta lista es solo de ASISTENCIAS ordena
      ordenar(){
          const resultado = {};

          this.listaReportes.forEach((reporte) => {
              const creador = reporte.expand.creador.name;
              const tipoReporte = reporte.tipoReporte;
            
              if (!resultado[creador]) {
                resultado[creador] = {
                  Asistencias: {
                    CORRECTIVO: 0,
                    PREVENTIVO: 0,
                    CABLEADO:0,
                    'OPERATIVOS ESP':0,
                    "PUNTO DE RED":0,
                    "ASIST. EXTERNO":0,
                    "ASIST. TÉCNICA":0,
                    "ACT. NO PROGRAMADA":0,
                    RESPALDO:0,
                    "OPERATIVOS ESP.":0,
                    total: 0
                  }
                };
              }
              if (resultado[creador].Asistencias.hasOwnProperty(tipoReporte)) {
                  resultado[creador].Asistencias[tipoReporte]++;
                  resultado[creador].Asistencias.total++;
                }
          });
          this.ListaReportesFiltrada = resultado
          return resultado
      },

      ///esta lista es solo de ASISTENCIAS
      listaDeTrabajadores() {
        const lista = { ...this.ListaReportesFiltrada };
        const nuevoObjeto = {};
        const sumaAsistenciasCategorias = Object.values(lista).reduce((acumulador, persona) => {
          const asistencias = persona.Asistencias;
          Object.keys(asistencias).forEach(key => {
            if (key !== "total") {
              acumulador[key] = (acumulador[key] || 0) + asistencias[key];
            }
          });
          return acumulador;
        }, {});
      
        const totalAsistenciasCategorias = {
          labels: Object.keys(sumaAsistenciasCategorias),
          data: Object.values(sumaAsistenciasCategorias)
        };
      
        const BarData = {
          labels: totalAsistenciasCategorias.labels,
          datasets: [
            {
              backgroundColor: ['rgba(133, 73, 186, 0.6)', 'rgba(0, 169, 80, 0.6)', 'rgba(22, 106, 143, 0.6)', 'rgba(172, 194, 54, 0.6)', 'rgba(83, 123, 196, 0.6)', 'rgba(245, 55, 148, 0.6)', 'rgba(246, 112, 25, 0.6)', 'rgba(77, 201, 246, 0.6)', 'rgba(88, 89, 91, 0.6)'],
              data: totalAsistenciasCategorias.data
            }
          ]
        };
      
        this.totalAsistenciasCategorias = BarData;
        // ----------------
      
        for (let key in lista) {
          if (lista.hasOwnProperty(key)) {
            const asistencias = lista[key].Asistencias;
            const totalAsistencias = asistencias.total;
            nuevoObjeto[key] = totalAsistencias;
          }
        }
      
        const objeto = {
          labels: Object.keys(nuevoObjeto),
          data: Object.values(nuevoObjeto)
        };
      
        const DataAsistenciasPersonalTotal = {
          labels: objeto.labels,
          datasets: [
            {
              backgroundColor: ['#8549ba', '#00a950', '#166a8f', '#acc236', '#537bc4', '#f53794', '#f67019', '#4dc9f6', '#58595b', '#8549ba', '#00a950', '#166a8f', '#acc236', '#537bc4', '#f53794', '#f67019', '#4dc9f6', '#58595b'],
              data: objeto.data,
              hoverOffset: 13,
            }
          ]
        };
      
        this.ListaTotalAsistencias = DataAsistenciasPersonalTotal;
        return DataAsistenciasPersonalTotal;
      },

      /// esta lista es de los equipos
      obtenerResumenEquipos() {
        const resultado = {};
      
        this.testEquipos.forEach((equipo) => {
          let { piso, direccion } = equipo;
      
          if(piso == 0){
            piso = "Sotano"
          }else if(piso == 1){
            piso = "Primer piso"
          }else if(piso == 2){
            piso = "Segundo piso"
          }else if(piso == 3){
            piso = "Tercer piso"
          }else if(piso == 4){
            piso = "Despacho"
          }else{
            piso = "Exteriores"
          }
      
          if (!resultado[piso]) {
            resultado[piso] = {
              departamento: {},
              total: 0,
            };
          }
      
          if (!resultado[piso].departamento[direccion]) {
            resultado[piso].departamento[direccion] = 0;
          }
      
          resultado[piso].departamento[direccion]++;
          resultado[piso].total++;
        });
        this.totalEquiposPorOficina = resultado

        const dataEquipoTotal = {
          labels:Object.keys(resultado),
          data:Object.values(resultado).map((item) => item.total)
        }

        const chartJSEquiposPorPiso = {
          labels: dataEquipoTotal.labels,
          datasets: [
            {
              backgroundColor: ['#8549ba', '#00a950', '#166a8f', '#acc236', '#537bc4', '#f53794', '#f67019', '#4dc9f6', '#58595b', '#8549ba', '#00a950', '#166a8f', '#acc236', '#537bc4', '#f53794', '#f67019', '#4dc9f6', '#58595b'],
              data: dataEquipoTotal.data,
              hoverOffset: 13,
            }
          ]
        };
        this.chartJSEquiposPorPiso = chartJSEquiposPorPiso
      }

    },
})
