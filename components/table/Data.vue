<template>
    <v-card
      flat
      title="Items guardados"
    >
      <template v-slot:text>
        <v-text-field
          
          v-model="search"
          label="Busqueda"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="underlined"
          hide-details
        ></v-text-field>
      </template>
  
      <v-data-table
        :expand-on-click="true"
        :hover="true"
        :hide-no-data="true"
        :height="400"
        :fixed-header="true"
        density="compact"
        :headers="props.titulos"
        :items="props.listaItems"
        :search="search"
      >
      
      <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      </template>
      </v-data-table>
    </v-card>
</template>

<script setup>
const props = defineProps(['listaItems','titulos'])
const search = ref()



function editItem(valor){
  console.log(valor)
  console.log(valor.name)

}


</script>