<template>
--{{ variablePrueba }} <br>
{{ variablesFiltroEquipos }} <br>

<input v-model="variablePrueba" type="text">
<input v-model="variablesFiltroEquipos.usuario" type="text">

<v-row justify="center" class="mt-2" > 
    <v-col cols="12" md="3">
      <v-text-field type="text" v-model="variablePrueba" ></v-text-field>
    </v-col>
</v-row>
<v-row justify="center" class="mt-2" > 
    <v-col cols="12" md="3">
      <input v-model="variablesFiltroEquipos.usuario" type="text">
    </v-col>
</v-row>
</template>

<script setup>

const {variablePrueba,variablesFiltroEquipos} = storeToRefs(useEquiposStore())

definePageMeta({
  middleware:'autenticacion',
})

</script>