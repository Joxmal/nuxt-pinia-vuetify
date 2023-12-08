<template>
  <alert-warning v-show="mostrar_alert_create"
    mensaje="eliminado con exito" 
  />
  <v-card
    flat
    min-height="340"
  >
    <v-data-table v-if="listaItems"
      sticky
      :hover="true"
      :height="400"
      :fixed-header="true"
      density="compact"
      :headers="props.titulos"
      :items="props.listaItems"
      :search="search">
  
      <template v-slot:top>
        <v-toolbar
          flat>
          <v-toolbar-title>{{titulo_table}}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <slot name="dialogo"></slot>
        </v-toolbar>
  
        <v-text-field
          v-model="search"
          label="Busqueda"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="underlined"
          hide-details/>
      </template>
  
      <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            class="me-2"
            @click="$emit('editar',item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            @click="$emit('eliminar',item)"
          >
            mdi-delete
          </v-icon>
      </template>
  
    </v-data-table>
    <div v-else><s-v-g-spinner-frames class="text-h1 w-100"/></div>
  
  </v-card>
  </template>
  
  
  
  <script setup>
  
  const props = defineProps({
    titulo_table: String,
    mostrar_alert_create: Boolean,
    listaItems: Object,
    titulos: Object
  
  })

  const emit = defineEmits([
  'editar','eliminar'
  ])
  
  const search = ref()
  
  //icono de mostrar y ocultar
  
  
  
  
  </script>