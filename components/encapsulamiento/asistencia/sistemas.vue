<template>
  <dialog-form
    :boton-reset-formulario="true"
    titulo_dialog="NUEVA ASISTENCIA DE SISTEMAS"
    boton_titulo="CREAR"
    @crear="store.crearReporteSistemas()"
    id_boton="boton_asistencia_sistemas"
    @cerrar="modoEditar=false"
    :modo-editar="modoEditar"
    @editarDialogForm="store.editarReportesSistemas(IDSelecionada)"
    @resetearFormulario="store.resetearReporteSistemas()"
  >
    <template #contenido>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-select
              density="compact"
              label="Sistema"
              :items="mapeoSistemas"
              item-value="id"
              item-title="nombre"
              v-model="formSistemas.sistema"
            />
          </v-col>
          <v-col cols="6">
            <v-select
              label="Actividad"
              density="compact"
              :items="mapeoActividadesSistemas"
              item-value="id"
              item-title="nombre"
              v-model="formSistemas.actividad"
            />
          </v-col>
  
          <v-col cols="12" sm="6">
            <v-card
              style="border: 2px solid rgb(6, 143, 255)"
              variant="elevated"
              class="pa-1"
            >
              <v-card-title class="text-center">fecha de entrada</v-card-title>
              <v-divider :thickness="3" class="border-opacity-50"></v-divider>
              <v-sheet
                class="mt-2 d-flex flex-column justify-center align-center font-weight-black"
              >
                <input
                  class="mx-auto"
                  type="datetime-local"
                  min="2023-01-01"
                  max="2024-12-30"
                  v-model="formSistemas.fechaEntrada"
                />
              </v-sheet>
            </v-card>
          </v-col>
  
          <v-col cols="12" sm="6">
            <v-card
              style="border: 2px solid rgb(6, 143, 255)"
              variant="elevated"
              class="pa-1"
            >
              <v-card-title class="text-center">fecha de Salida</v-card-title>
              <v-divider :thickness="3" class="border-opacity-50"></v-divider>
              <v-sheet
                class="mt-2 d-flex flex-column justify-center align-center font-weight-black"
              >
                <input
                  class="mx-auto"
                  type="datetime-local"
                  min="2023-01-01"
                  max="2024-12-30"
                  v-model="formSistemas.fechaSalida"
                />
              </v-sheet>
            </v-card>
          </v-col>
  
          <v-col cols="12">
            <v-textarea
              rows="3"
              clearable
              label="Descripción"
              variant="outlined"
              v-model="formSistemas.descripcion"
            >
            </v-textarea>
          </v-col>
          <v-col cols="12" >
            <v-select
              label="Estado de la asistencia"
              density="compact"
              :items="transformarItems"
              item-value="id"
              item-title="nombre"
              v-model="formSistemas.estatus"
              >
              
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </dialog-form>

  <table-general
    expanded-row
    titulo_table="Asistencias"
    :titulos="headers"
    :listaItems="itemsTable"
    @editar="component_modoEditar"
    @eliminar="store.eliminarReportesSistemas($event)"
  >
  </table-general>
</template>

<script setup>
import { convertirFechaUTC } from "~/assets/funciones_reuzables/times";
import { useAsistenciasStore } from "~/stores/asistencias";
import { useListasActividadesStore } from "~/stores/listas/actividades";
import { useListasSistemasStore } from "~/stores/listas/sistemas";
import { useEstatusSistemasStore } from "~/stores/sistemas/estatus";
const storeEstatusSistemasS = useEstatusSistemasStore()

const store_sistemas = useListasSistemasStore();
const store_sistemas_actividades = useListasActividadesStore();
const store = useAsistenciasStore();
const { formSistemas } = storeToRefs(store);

const mapeoActividadesSistemas = computed(() => {
  if (
    store_sistemas_actividades.$state.BD_procesada_listaAtividades?.Sistemas
  ) {
    const data = [
      store_sistemas_actividades.$state.BD_procesada_listaAtividades?.Sistemas
        ?.tareas,
    ];

    const transformedData = data.map((obj) => Object.values(obj)).flat();

    return transformedData;
  } else {
    return null;
  }
});

const mapeoSistemas = computed(() => {
  if (store_sistemas.$state.BD_procesada_listaAtividades?.Sistemas) {
    const data = [
      store_sistemas.$state.BD_procesada_listaAtividades?.Sistemas?.tareas,
    ];

    const transformedData = data.map((obj) => Object.values(obj)).flat();

    return transformedData;
  } else {
    return null;
  }
});

const itemsTable = computed(() => {
  console.log(store.dataTabla);

  if (store.dataTabla.length !== 0) {
    const data = store.dataTabla.map((item) => {
      return {
        creador: item.expand.creador.name,
        actividad: item.expand.actividad.tarea,
        sistema: item.expand.sistema.sistema,
        fechaEntrada: item.fechaEntrada,
        fechaSalida: item.fechaSalida,
        id: item.id,
        description: item.descripcion,
        estatus:item.expand.estatus.nombre,
        data: {
          creador: item.expand.creador,
          actividad: item.expand.actividad,
          sistema: item.expand.sistema,
          estatus:item.expand.estatus
        },
      };
    });
    return data;
  } else {
    return [];
  }
});

watch(
  () => store.count_reload_sistemas,
  (newValue) => {
    store.obtenerReportesSistemas();
  }
);

const headers = [
  {
    key: "creador",
    title: "Creador",
    sortable: true,
  },
  {
    key: "actividad",
    title: "Actividad",
    sortable: true,
  },
  {
    key: "sistema",
    title: "Sistema",
    sortable: true,
  },
  {
    key: "estatus",
    title: "Estatus",
    sortable: true,
  },
  {
    value: (item) => new Date(item.fechaEntrada).toLocaleDateString(),
    key: "fechaEntrada",
    title: "Fecha Entrada",
  },
  {
    value: (item) => new Date(item.fechaSalida).toLocaleDateString(),
    key: "fechaSalida",
    title: "Fecha Salida",
  },
  { key: "actions", title: "Acciones" },
  { title: "", key: "data-table-expand" },
];
const modoEditar= ref(false)
const IDSelecionada = ref()
function component_modoEditar(data){
  console.log("dataTable",data)

  modoEditar.value = true
  document.getElementById('boton_asistencia_sistemas').click()

  store.formSistemas.actividad = data.data.actividad.id
  store.formSistemas.descripcion = data.description
  store.formSistemas.fechaEntrada = convertirFechaUTC(data.fechaEntrada)
  store.formSistemas.fechaSalida = convertirFechaUTC(data.fechaSalida)
  store.formSistemas.sistema = data.data.sistema.id
  store.formSistemas.estatus = data.data.estatus.id

  IDSelecionada.value = data.id
}

const transformarItems = computed(()=> storeEstatusSistemasS.data_DB.filter(item => item.activo === true))
</script>
