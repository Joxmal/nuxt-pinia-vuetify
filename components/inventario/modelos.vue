<template>
  <!-- //diloago para crear un modelo  -->
  <v-card class="pa-2 d-flex flex-wrap ga-2 ma-10">
    <v-chip @click.stop="modoEditar(item)" v-for="item in storeEquipos.getListModelosDto " :key="item.id"
      @click="console.log(item)">
      <v-icon icon="mdi-pencil"></v-icon>
      <strong>{{ item.nombre_tipo }}</strong>&nbsp;
      <v-icon @click.stop="storeEquipos.eliminarModelo(item.id)" icon="mdi-delete"></v-icon>
    </v-chip>
  </v-card>

  <DialogGeneralSimple @boton-dialog="modo_editar = false" id-boton="dilogoCreacionModelo"
    name-boton="Crear Modelo de tipo" :ocultar-boton="false">
    <template #contenido>
      <v-card class="pa-4">

        <v-card-title :class="!modo_editar ? 'text-success' : 'text-warning'" class="text-h5 text-center">
          {{ !modo_editar ? 'CREAR MODELO' : 'EDITAR MODELO' }}
        </v-card-title>

        <v-form fast-fail
          @submit.prevent=" !modo_editar ? storeEquipos.crearModelo() : storeEquipos.editarModelo(id_Editar)">
          <v-row>
            <v-col cols="12">
              <v-text-field :rules="rule_not_empy" v-model="formComponentes_modelos.nombre_tipo"
                label="titulo del Modelo" hide-details="auto" density="compact" />
            </v-col>

            <v-col v-for="(item, index) in formComponentes_modelos.componentes" :key="index" cols="6">

              <v-btn density="compact" class="text-warning"
                @click.stop="formComponentes_modelos.componentes.splice(index, 1)" icon="mdi-close" />
              <v-text-field class="mb-2" v-model="item.nombre" variant="outlined" label="Nombre" hide-details="auto"
                density="compact" />
              <v-select label="tipo de dato" v-model="item.tipo" variant="outlined" density="compact"
                :items="['string', 'number']" hint="string es letras, number es numero">
              </v-select>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-btn location="bottom center" density="compact" size="60" icon="mdi-plus"
                  @click.stop="sumarRowComponente({ nombre: '' })">
                </v-btn>
              </v-col>

              <v-col cols="12">
                <v-btn v-if="!modo_editar" block color="success" type="submit">CREAR</v-btn>
                <v-btn v-if="modo_editar" block color="warning" type="submit">EDITAR</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>

    </template>
  </DialogGeneralSimple>
</template>

<script setup lang="ts">
import { useEquiposStore } from '~/stores/listas/equipos';
import { rule_not_empy } from '~/assets/rules/generals';
import type { GetListModelosDto } from '~/stores/listas/equipos.interfaces';
const storeEquipos = useEquiposStore()

const { count_reload, formComponentes_modelos } = storeToRefs(storeEquipos)

watch(count_reload, () => {
  storeEquipos.obtenerModelos()
})

onMounted(() => {
  storeEquipos.obtenerModelos()
})

interface SumarRowComponente {
  nombre: string,
  valor?: null | string | number
  tipo?: 'number' | 'string'
}

function sumarRowComponente(data: SumarRowComponente) {
  const { nombre = '', tipo = 'string', valor = null } = data
  formComponentes_modelos.value.componentes.push(
    {
      "nombre": nombre,
      "valor": valor,
      "tipo": tipo
    }
  )
}

const modo_editar = ref(false)
const id_Editar = ref('')
function modoEditar(item: GetListModelosDto) {
  const boton = document.getElementById('dilogoCreacionModelo')?.click()

  modo_editar.value = true

  id_Editar.value = item.id
  formComponentes_modelos.value.nombre_tipo = item.nombre_tipo
  formComponentes_modelos.value.componentes = item.componentes

}
</script>