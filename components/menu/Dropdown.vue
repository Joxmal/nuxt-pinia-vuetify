<template>
    <v-menu :location="location">
      <template v-slot:activator="{ props }">
        <v-btn
          style="position: absolute; top:0.2rem;right:0.2rem"
          color="primary"
          dark
          v-bind="props"
          icon="mdi-dots-vertical"
          size="x-small"
        >
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          class="text-subtitle-2"
        >
          <v-list-item @click="$emit('editar')" density="compact" append-icon="mdi-pencil" class="cursor">
            editar
          </v-list-item>

          <v-list-item @click="$emit('eliminar')" density="compact" append-icon="mdi-delete-empty" class="cursor">
            eliminar
          </v-list-item>
          
          <v-list-item v-if="!ocultarDescripsion" @click="$emit('descripcion')" density="compact" append-icon="mdi-view-dashboard" class="cursor">
            descripcion
          </v-list-item>

          <v-list-item v-if="opcionExtra" @click="$emit(`${opcionExtra}`)" density="compact" append-icon="mdi-yin-yang" class="cursor">
            {{opcionExtra}}
          </v-list-item>

        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script setup>


defineProps({
    location:{
      type: String,
      default:'bottom'
    },
    ocultarDescripsion:{
      type:Boolean,
      default: false
    },
    opcionExtra:{
      type:String,
    }
})
</script>

<style scoped>

.cursor{
    cursor:pointer
}
</style>