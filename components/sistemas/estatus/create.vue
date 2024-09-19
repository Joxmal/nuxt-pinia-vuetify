<template>
  <pre>
    {{ store.data_DB }}
  </pre>
  <dialog-form
    :boton-reset-formulario="true"
    titulo_dialog="Crear"
    boton_titulo="CREAR"
    @crear="store.createEstatus()"
  >
    <template #contenido>
      <v-container>
        <v-row>
          <v-col cols="12" >
            <v-text-field v-model="store.form.nombre" hide-details density="comfortable">

            </v-text-field>
          </v-col>

          <v-row justify="center">
            <v-switch
              id="switch"
              hide-details
              density="compact"
              v-model="store.form.activo"
              base-color="red"
              :color="store.form.activo != false ? 'green' : 'red'">
              
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

  <table-general
    titulo_table="Asistencias"
    :titulos="headers"
    :listaItems="store.data_DB "
    @editar="console.log($event)"
    @eliminar="store.deleteEstatus($event)"
  >
  </table-general>
</template>


<script setup>
import { useEstatusSistemasStore } from '~/stores/sistemas/estatus';
const store = useEstatusSistemasStore()


const headers = [
  {
    key: "nombre",
    title: "Nombre",
    sortable: true,
  },
  {
    key: "activo",
    title: "Estado",
    value: (item) => item.activo ? 'Activado': 'Desactivado' ,
    sortable: true,
  },
  {
    value: (item) => new Date(item.created).toLocaleDateString(),
    key: "created",
    title: "creado",
  },
  {
    value: (item) => new Date(item.updated).toLocaleDateString(),
    key: "created",
    title: "Actualizado",
  },
  { key: "actions", title: "Acciones" },
];

onMounted(()=>{
  store.getEstatus()
})
</script>