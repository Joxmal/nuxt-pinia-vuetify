<template>
  <dialog-form
    :boton-reset-formulario="true"
    titulo_dialog="Crear"
    boton_titulo="CREAR"
    @crear="store.createEstatus()"
    @editarDialogForm="store.updateEstatus(editar_ID)"
    @cerrar="modoEditar=false"
    @resetearFormulario="store.resetearForm()"
    :modo-editar="modoEditar"
    id_boton="CrearStatusAsistencia"
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
    @editar="component_modoEditar"
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
    cellProps:(item)=>{
      return { class: item.item.activo ? 'text-success' : 'text-warning' }
    }
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

watch(
  () => store.count_reload_status,
  (newValue) => {
    store.getEstatus();
  }
);

const modoEditar= ref(false)
const editar_ID = ref('')
function component_modoEditar(data){
  modoEditar.value = true
  console.log(data)
  document.getElementById('CrearStatusAsistencia').click()

  store.form.nombre = data.nombre
  store.form.activo = data.activo
  editar_ID.value = data.id
}


</script>