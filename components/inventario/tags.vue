<template>
  <v-card class="pa-2 d-flex flex-wrap ga-2 ma-10">
    <v-chip v-for="item in storeEquipos.getTagsDto" :key="item.id" @click="console.log(item)">
      <strong>{{ item.tag_name }}</strong>&nbsp;
      <v-icon @click.stop="storeEquipos.eliminarTags(item)" icon="mdi-delete"></v-icon>
    </v-chip>
  </v-card>

  <DialogGeneralSimple name-boton="Crear nuevo Tag" :ocultar-boton="false">
    <template #contenido>
      <v-card>
        <v-form @submit.prevent="storeEquipos.crearTag()">
          <v-row>
            <v-col>
              <v-text-field :rules="rule_not_empy" v-model="storeEquipos.formtTag.tag_name" label="Nombre del tag"
                hide-details="auto" density="compact" />
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </template>
  </DialogGeneralSimple>
</template>

<script setup lang="ts">
import { useEquiposStore } from '~/stores/listas/equipos';
import { rule_not_empy } from '~/assets/rules/generals';
const storeEquipos = useEquiposStore()

const { count_reload } = storeToRefs(storeEquipos)



watch(count_reload, () => {
  storeEquipos.obtenerTags()
})

onMounted(() => {
  storeEquipos.obtenerTags()
})

</script>