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

  <v-card class="mx-auto" rounded="lg">
    <v-card-item>
      <v-card-title>Sistemas</v-card-title>
    </v-card-item>

    <v-divider />

    <div class="pa-4">
      <TableGeneral
        v-if="
          Object.keys(storeSistemas.BD_procesada_listaAtividades).length > 0
        "
        titulo_table="Sistemas"
        :titulos="titulos"
        :listaItems="storeSistemas.itemsTabla_BD_procesada_listaAtividades"
        :loading="
          Object.keys(storeSistemas.BD_procesada_listaAtividades).length > 0
            ? true
            : false
        "
        @eliminar="storeSistemas.eliminarActividad({ id: $event })"
        @editar="AbrirModoEditar"
      >
        <template #dialogo>
          <dialog-form
            v-if="useStoreConexion().avatarRole === 'superUser'"
            :botonResetFormulario="true"
            @resetearFormulario="storeSistemas.resetearFormulario()"
            :id_boton="idDialogFormulario"
            icon="crear"
            :modoEditar="modoEditar"
            :titulo_dialog="titulo_dialog"
            boton_titulo="CREAR SISTEMA"
            @crear="storeSistemas.crearActividad({ data: form })"
            @cerrar="modoEditar = false"
            @editarDialogForm="storeSistemas.editarActividad({ data: form })"
          >
            <template #contenido>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Area"
                      hint="Area en la que se va a crear la tarea"
                      persistent-hint
                      :items="storeSistemas.listaAreas"
                      v-model="form.area"
                      :rules="ruleNoEmpty"
                      required
                    >
                    </v-select>
                  </v-col>
                  <!-- :items="storeSistemas.listarParaSelect?.[form.area]" -->
                  <v-col cols="12" sm="6">
                    <v-textField
                      :rules="ruleNoEmpty"
                      label="Nombre Del sistema"
                      hint="Nombre de la tarea"
                      persistent-hint
                      v-model="form.sistema"
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
import { useListasSistemasStore } from "~/stores/listas/sistemas";
const storeSistemas = useListasSistemasStore();

const { form } = storeToRefs(storeSistemas);

const { notificaciones } = storeSistemas;

const titulos = [
  {
    key: "tarea",
    title: "Sistema",
    sortable: true,
    align: "center",
    width:200,
  },
  {
    key: "description",
    title: "Descripción",
    align: "center",
    sortable: false,
  },
  { key: "actions", title: "Acciones", align: "center" },
];

onMounted(async () => {
  await storeSistemas.obtenerActvidades();
});

watch(
  () => storeSistemas.count_reload,
  async (newValue) => {
    // Realiza las acciones que desees cuando la propiedad cambie
    await storeSistemas.obtenerActvidades();
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
  console.log(data)

  storeSistemas.formId = data.id;

  form.value.area = data.area;
  form.value.sistema = data.tarea;
  form.value.description = data.description;

  modoEditar.value = true;

  abrirDialog();
}

function abrirDialog() {
  const boton = document.getElementById(idDialogFormulario);
  boton.click();
}
</script>
