<template>
  <dev-only>
    {{ storeProyector.ubicacionOficina }}
    <hr>
    <pre>
      {{ storeProyector.UbicacionActualProyector }}
    </pre>
    <hr>
  </dev-only>


  <dialog-form @editarDialogForm="storeProyector.editarReporte(IDSelecionada)" @cerrar="modoEditar = false"
    :modo-editar="modoEditar" titulo_dialog="NUEVA ASISTENCIA PROYECTOR" boton_titulo="CREAR"
    @crear="storeProyector.creaReporteProyector()" id_boton="boton_reporte_proyector">
    <template #contenido>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card position="relative" style="border: 2px solid rgb(6, 143, 255)" variant="elevated" class="pa-1">
              <v-btn @click="formProyector.fecha_salida = ''" position="absolute" density="compact" variant="outlined"
                location="top right" color="primary">reset</v-btn>
              <v-card-title class="text-center">Fecha de salida</v-card-title>
              <v-divider :thickness="3" class="border-opacity-50"></v-divider>
              <v-sheet class="mt-2 d-flex flex-column justify-center align-center font-weight-black">
                <input class="mx-auto" type="datetime-local" min="2023-01-01" max="2024-12-30"
                  v-model="formProyector.fecha_salida" />
              </v-sheet>
            </v-card>

          </v-col>

          <v-col cols="12" sm="6">
            <v-card position="relative" style="border: 2px solid rgb(6, 143, 255)" variant="elevated" class="pa-1">
              <v-btn @click="formProyector.fecha_entrada = ''" position="absolute" density="compact" variant="outlined"
                location="top right" color="primary">reset</v-btn>
              <v-card-title class="text-center">Fecha de entrada</v-card-title>
              <v-divider :thickness="3" class="border-opacity-50"></v-divider>
              <v-sheet class="mt-2 d-flex flex-column justify-center align-center font-weight-black">
                <input class="mx-auto" type="datetime-local" min="2023-01-01" max="2024-12-30"
                  v-model="formProyector.fecha_entrada" />
              </v-sheet>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <!-- @vue-ignore -->
            <v-autocomplete density="compact" label="Departamento"
              hint="Departamento al cual se le realiza la asistencia" persistent-hint open-text="abrir"
              close-text="cerrar" :items="storeListas.listaDepartamento" v-model="formProyector.departamento">
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <!-- @vue-ignore -->
            <v-autocomplete density="compact" label="Funcionario"
              :items="storeAsistencias.listaTotalEmpleados_oficina[formProyector.departamento] || []"
              v-model="formProyector.responsable">
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field type="number" density="compact" label="Telefono" hint="Telefono del responsable"
              persistent-hint open-text="abrir" v-model="formProyector.tlf">
            </v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea rows="3" clearable label="Descripción" variant="outlined" v-model="formProyector.descripsion">
            </v-textarea>
          </v-col>

          <v-row justify="center">

            <v-switch width="110" id="switch" hide-details density="compact" v-model="formProyector.actual"
              base-color="red" :color="formProyector.actual != false ? 'green' : 'red'">

              <template v-slot:append>
                <label for="switch">
                  <v-icon>mdi-receipt-text-check-outline</v-icon>
                </label>
              </template>

              <template v-slot:prepend>
                <label for="switch" :value="false">
                  <v-icon>mdi-tag-remove</v-icon>
                </label>
              </template>
            </v-switch>

          </v-row>
        </v-row>
      </v-container>
    </template>
  </dialog-form>

  <table-general :row-props="rowProps" expanded-row titulo_table="Asistencias" :titulos="headers"
    :listaItems="itemsTable" @editar="component_modoEditar" @eliminar="storeProyector.eliminarReporte($event)">
  </table-general>
</template>

<script setup lang="ts">
import { useProyectorStore } from '~/stores/proyector/proyectorStorage';
import { obtenerFechaHoraActual, obtenerDiaActual, convertirFechaUTC } from '~/assets/funciones_reuzables/times';
import { useListasStore } from '~/stores/listas';

const storeListas = useListasStore()

function rowProps(data: any) {
  if (data.item.actual) {
    return {
      class: 'text-success'
    }
  } else {
    return {
      class: 'text-warning'
    }
  }
}

const headers = [
  {
    key: "departamento",
    title: "Departamento",
    sortable: true,
  },
  {
    key: "funcionario",
    title: "Funcionario",
    sortable: true,
  },
  {
    key: "tlf",
    title: "TLF",
    sortable: true,
  },
  {
    value: (item: any) => new Date(item.fechaSalida).toLocaleDateString(),
    key: "fechaSalida",
    title: "Fecha Salida",
  },
  {
    value: (item: any) => item.fechaEntrada === '' ? 'XXXXXX' : new Date(item.fechaEntrada).toLocaleDateString(),
    key: "fechaEntrada",
    title: "Fecha Entrada",
  },
  { key: "actions", title: "Acciones" },
  { title: "", key: "data-table-expand" },
];
const itemsTable = computed(() => {
  console.log(storeProyector.getProyectorDto);

  if (storeProyector.getProyectorDto.length !== 0) {
    const data = storeProyector.getProyectorDto.map((item) => {
      return {
        fechaEntrada: item.fecha_entrada,
        fechaSalida: item.fecha_salida,
        id: item.id,
        tlf: item.tlf,
        description: item.descripsion,
        departamento: item.departamento,
        funcionario: item.responsable,
        actual: item.actual
      };
    });
    return data;
  } else {
    return [];
  }
});


const storeProyector = useProyectorStore()

const storeAsistencias = useAsistenciasStore();

const { formProyector } = storeToRefs(storeProyector)
onMounted(async () => {
  await storeProyector.obtenerAsistencias()
  await storeAsistencias.obtenerDatos()

})

interface RowTable {
  fechaEntrada: string;
  fechaSalida: string;
  id: number;
  tlf: number;
  description: string;
  departamento: string;
  funcionario: string;
  actual: boolean
}


//modo Editar 
const modoEditar = ref(false)
const IDSelecionada = ref(0)
function component_modoEditar(data: RowTable) {
  console.log(data)

  modoEditar.value = true
  const button = document.getElementById('boton_reporte_proyector');

  if (button) {
    button.click();
  } else {
    console.warn("Button with ID 'boton_reporte_proyector' not found.");
  }

  storeProyector.formProyector.departamento = data.departamento
  storeProyector.formProyector.descripsion = data.description
  storeProyector.formProyector.fecha_entrada = data.fechaEntrada === "" ? '' : convertirFechaUTC(data.fechaEntrada)
  storeProyector.formProyector.fecha_salida = convertirFechaUTC(data.fechaSalida)
  storeProyector.formProyector.departamento = data.departamento
  storeProyector.formProyector.responsable = data.funcionario
  storeProyector.formProyector.tlf = data.tlf
  storeProyector.formProyector.actual = data.actual

  IDSelecionada.value = data.id
}

watch(
  () => storeProyector.count_reload,
  (newValue) => {
    storeProyector.obtenerAsistencias();
  }
);

</script>