<template>
  <div style="position: fixed;left: 60%;top: 100px;transform: translate(-30%,-40%);margin: 0 auto; z-index: 50;">
    <alert-warning v-show="mostrar_alert_delete" mensaje="eliminado" />
  </div>

  <v-card flat min-height="340" class="pa-5" rounded="lg" border elevation="5">


    <div v-if="props.loading === false"><s-v-g-spinner-frames class="text-h1 w-100" /></div>
    <v-data-table class="daTableGeneral" v-else :fixed-header="true" :style="{ maxHeight: '120dvh' }" :hover="true"
      density="compact" :headers="props.titulos" :items="props.listaItems" :search="search" :row-props="props.rowProps">

      <template v-slot:top>
        <v-toolbar rounded="lg" color="primary" flat>
          <v-toolbar-title>{{ titulo_table }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <slot name="dialogo"></slot>
        </v-toolbar>

        <v-text-field v-model="search" label="Busqueda" prepend-inner-icon="mdi-magnify" single-line
          variant="underlined" hide-details />
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="$emit('editar', item)">
          mdi-pencil
        </v-icon>

        <v-icon size="small" end @click="$emit('eliminar', item.id)">
          mdi-delete
        </v-icon>
      </template>

      <template v-if="!props['expanded-row']" v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="text-blue-darken-1 text-subtitle-1 font-weight-bold text-center py-1" :colspan="columns.length">
            {{ item.description }}
          </td>
        </tr>
      </template>

    </v-data-table>

  </v-card>
</template>



<script setup>

const props = defineProps([
  'titulo_table',
  'mostrar_alert_delete',
  'listaItems',
  'titulos',
  'loading',
  'expanded-row',
  'rowProps'
])
onMounted(() => {

})

const emit = defineEmits([
  'editar', 'eliminar'
])

const search = ref()

//icono de mostrar y ocultar




</script>

<style>
.daTableGeneral table td+td {
  border-left: 1px solid #dddddd;
}
</style>