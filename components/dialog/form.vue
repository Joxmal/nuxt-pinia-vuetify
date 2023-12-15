<template>
  <v-dialog max-width="900px" persistent>
    <template v-slot:activator="{ props } ">
      <v-btn color="indigo-lighten-5" @click="$emit('modoCrear')" id="boton-dialogo" class="mb-2" v-bind="props"> {{ boton_titulo || "NUEVO" }}</v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card loading position="relative">
        <alert-error style="position: fixed; right: 1rem; top: 0.4rem;" v-show="prop.iconError" mensaje="error"/>
        <alert-success
          :icon="prop.icon"
          mensaje="Creado con éxito"
          v-show="mostrar_alert_create"
          style="position: fixed; right: 0" />

        <v-card-title>
          <span class="text-h5">{{ titulo_dialog }}</span>
        </v-card-title>

        <slot name="contenido"></slot>

        <small>*siga las instrucciones</small>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="isActive.value = false">
            Cerrar
          </v-btn>

          <v-btn v-if="modoEditar"
            color="blue-darken-1"
            variant="text"
            @click="$emit('editarDialogForm')">
            Editar
          </v-btn>

          <v-btn v-else
            color="blue-darken-1"
            variant="text"
            @click="$emit('crear')">
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
const prop = defineProps(['titulo_dialog','boton_titulo','mostrar_alert_create','modoEditar','icon','iconError'])

defineEmits([
'crear','modoCrear','editarDialogForm'
])


</script>