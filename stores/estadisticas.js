import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useEstadisticas = defineStore('useEstadisticas', {
    state: () => ({
        pb_url:useRuntimeConfig().public.POCKETBASE_URL,
        listaReportes:[],
        ListaReportesFiltrada:null,
        
        ListaTotalAsistencias:0,
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
        async obtenerDatosReportes(){
            const pb = new PocketBase(this.pb_url)

            try {
                this.cargando = true
                const {items,page,perPage,totalItems,totalPages} = await pb.collection('reportes').getList(1, 30000, {
                    filter: "",
                    sort: '-created',
                    expand:'creador',
                });
                this.listaReportes = items
                this.cargando = false

            } catch (error) {
                console.error(error)
            }
        },

        ordenar(){
            const resultado = {};

            this.listaReportes.forEach((reporte) => {
                const creador = reporte.expand.creador.username;
                const tipoReporte = reporte.tipoReporte;
              
                if (!resultado[creador]) {
                  resultado[creador] = {
                    Asistencias: {
                      CORRECTIVO: 0,
                      PREVENTIVO: 0,
                      CABLEADO:0,
                      "ASIST. EXTERNO":0,
                      "ASIST. INTERNO":0,
                      "ASIST. TÉCNICA":0,
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

        listaDeTrabajadores(){
            const lista = {...this.ListaReportesFiltrada}
            let nuevoObjeto = {};
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

              const DataAsistenciasPersonalTotal ={
                labels: objeto.labels,
                datasets: [
                  {
                    backgroundColor: [  '#8549ba','#00a950','#166a8f','#acc236','#537bc4','#f53794','#f67019','#4dc9f6','#58595b','#8549ba','#00a950','#166a8f','#acc236','#537bc4','#f53794','#f67019','#4dc9f6','#58595b'
                ],
                    data: objeto.data,
              
                  }
                ]
              }  

              this.ListaTotalAsistencias= DataAsistenciasPersonalTotal
              return DataAsistenciasPersonalTotal

        },
    },
})
