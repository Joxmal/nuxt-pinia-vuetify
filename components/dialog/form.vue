<template>
  <v-dialog max-width="800px" persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" class="mb-2" v-bind="props"> {{ boton_titulo }} </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card loading position="relative">
        <alert-success
          mensaje="Creado con éxito"
          v-show="mostrar_alert_create"
          style="position: absolute; right: 0" />

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
          <v-btn
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

const props = defineProps(
    {
        boton_titulo:String,
        mostrar_alert_create:Boolean,
        mostrar_alert_delete: Boolean,

    }
)



</script>