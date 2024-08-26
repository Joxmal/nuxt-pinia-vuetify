<template>
  <AlertPaquete
    :cargando="notificaciones.cargando"
    :ocurrioUnError="notificaciones.ocurrioUnError"
    :eliminarExitoso="notificaciones.eliminarExitoso"
    :envioExitoso="notificaciones.envioExitoso"
    :editar-exitoso="notificaciones.editarExitoso"
  />

  <DevOnly>
    <v-btn @click="modoEditar = !modoEditar">alternar edicion</v-btn>
    <v-btn @click="abrirDialog">abrirDialog</v-btn>
  </DevOnly>
  <hr />
  <pre>
    <!-- {{listatabla}} -->
  </pre>

  <v-card class="mx-auto" rounded="lg">
    <v-card-item>
      <v-card-title>Actividades</v-card-title>
    </v-card-item>

    <v-divider />

    <div class="pa-4">
      <TableGeneral
        v-if="
          Object.keys(storeActividades.BD_procesada_listaAtividades).length > 0
        "
        titulo_table="Actividades"
        :titulos="titulos"
        :listaItems="storeActividades.itemsTabla_BD_procesada_listaAtividades"
        :loading="
          Object.keys(storeActividades.BD_procesada_listaAtividades).length > 0
            ? true
            : false
        "
        @eliminar="storeActividades.eliminarActividad({ id: $event })"
        @editar="AbrirModoEditar"
      >
        <template #dialogo>
          <dialog-form
            v-if="useStoreConexion().avatarRole === 'superUser'"
            :botonResetFormulario="true"
            @resetearFormulario="storeActividades.resetearFormulario()"
            :id_boton="idDialogFormulario"
            icon="crear"
            :modoEditar="modoEditar"
            :titulo_dialog="titulo_dialog"
            boton_titulo="NUEVA TAREA"
            @crear="storeActividades.crearActividad({ data: form })"
            @cerrar="modoEditar = false"
            @editarDialogForm="storeActividades.editarActividad({ data: form })"
          >
            <template #contenido>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Area"
                      hint="Area en la que se va a crear la tarea"
                      persistent-hint
                      :items="storeActividades.listaAreas"
                      v-model="form.area"
                      :rules="ruleNoEmpty"
                      required
                    >
                    </v-select>
                  </v-col>
                  <!-- :items="storeActividades.listarParaSelect?.[form.area]" -->
                  <v-col cols="12" sm="6">
                    <v-textField
                      :rules="ruleNoEmpty"
                      label="Tarea"
                      hint="Nombre de la tarea"
                      persistent-hint
                      v-model="form.tarea"
                      required
                    >
                    </v-textField>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      :rules="ruleNoEmpty"
                      v-model="form.description"
                      counter
                      label="Descripción"
                      hint="Descripción de la tarea"
                      maxlength="100"
                      persistent-hint
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </dialog-form>
        </template>
      </TableGeneral>
    </div>
  </v-card>

  <v-btn color="primary">count</v-btn>
</template>

<script setup>
import { useListasActividadesStore } from "~/stores/listas/actividades";
const storeActividades = useListasActividadesStore();

const { form } = storeToRefs(storeActividades);

const { notificaciones } = storeActividades;

const titulos = [
  {
    key: "area",
    title: "Area",
    sortable: true,
    width: 20,
    Size: 50,
    align: "center",
  },
  {
    key: "tarea",
    title: "Tarea",
    sortable: true,
    align: "center",
  },
  {
    key: "description",
    title: "Descripsión",
    align: "center",
    sortable: false,
  },
  { key: "actions", title: "Acciones", align: "center" },
];

const listatabla = ref();
onMounted(async () => {
  await storeActividades.obtenerActvidades();
  console.log(
    storeActividades.buscarActividadIdPorNombre(
      "mantenimiento preventivo servidor"
    )
  );
  console.log(storeActividades.buscarActividadIdPorNombre("ASIST. TÉCNICA"));
});

watch(
  () => storeActividades.count_reload,
  async (newValue) => {
    // Realiza las acciones que desees cuando la propiedad cambie
    await storeActividades.obtenerActvidades();
  }
);

const titulo_dialog = ref("Crear");
const modoEditar = ref(false);

watch(
  () => modoEditar.value,
  async (newValue) => {
    modoEditar.value === false
      ? (titulo_dialog.value = "Crear")
      : (titulo_dialog.value = "Editar");
    console.log(titulo_dialog.value);
  }
);

const ruleNoEmpty = [
  (value) => {
    if (value) return true;
    return "Debe rellenar el campo";
  },
];

const idDialogFormulario = "BotonIdDialogFormulario";

function AbrirModoEditar(data) {
  storeActividades.formId = data.id;

  form.value.area = data.area;
  form.value.description = data.description;
  form.value.tarea = data.tarea;

  modoEditar.value = true;

  abrirDialog();
}

function abrirDialog() {
  const boton = document.getElementById(idDialogFormulario);
  boton.click();
}
</script>
