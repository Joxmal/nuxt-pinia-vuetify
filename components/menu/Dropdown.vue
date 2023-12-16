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
            <v-list-item @click="$emit(item.title)" v-for="(item, index) in items" :key="index" 
             density="compact"  
             :append-icon="item.icon"
             class="cursor"
             >
                {{ item.title }}
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
    }
})

  const items = [
    { title: 'editar', icon:'mdi-pencil' },
    { title: 'eliminar', icon:'mdi-delete-empty' },
    { title: 'descripcion', icon:'mdi-view-dashboard' },
  ]
</script>

<style scoped>

.cursor{
    cursor:pointer
}
</style>