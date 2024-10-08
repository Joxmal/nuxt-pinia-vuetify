<template>
  <pre>
    {{ formProyector }}
  </pre>
  <dialog-form titulo_dialog="NUEVA ASISTENCIA PROYECTOR" boton_titulo="CREAR" @crear="storeProyector.crearAsistencia()"
    id_boton="boton_asistencia_sistemas">
    <template #contenido>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card position="relative" style="border: 2px solid rgb(6, 143, 255)" variant="elevated" class="pa-1">
              <v-btn @click="formProyector.fecha_salida = ''" position="absolute" density="compact" variant="outlined"
                location="top right" color="primary">reset</v-btn>
              <v-card-title class="text-center">Fecha de salida</v-card-title>
              <v-divider :thickness="3" class="border-opacity-50"></v-divider>
              <v-sheet class="mt-2 d-flex flex-column justify-center align-center font-weight-black">
                <input class="mx-auto" type="datetime-local" min="2023-01-01" max="2024-12-30"
                  v-model="formProyector.fecha_salida" />
              </v-sheet>
            </v-card>

          </v-col>

          <v-col cols="12" sm="6">
            <v-card position="relative" style="border: 2px solid rgb(6, 143, 255)" variant="elevated" class="pa-1">
              <v-btn @click="formProyector.fecha_entrada = ''" position="absolute" density="compact" variant="outlined"
                location="top right" color="primary">reset</v-btn>
              <v-card-title class="text-center">Fecha de entrada</v-card-title>
              <v-divider :thickness="3" class="border-opacity-50"></v-divider>
              <v-sheet class="mt-2 d-flex flex-column justify-center align-center font-weight-black">
                <input class="mx-auto" type="datetime-local" min="2023-01-01" max="2024-12-30"
                  v-model="formProyector.fecha_entrada" />
              </v-sheet>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete density="compact" label="Departamento"
              hint="Departamento al cual se le realiza la asistencia" persistent-hint open-text="abrir"
              close-text="cerrar" :items="useListasStore().listaDepartamento" v-model="formProyector.departamento">
            </v-autocomplete>
          </v-col>

          <v-col cols="6" md="6">
            <v-autocomplete density="compact" label="Funcionario" :items="storeAsistencias.listaTotalEmpleados_oficina[formProyector.departamento]
              " v-model="formProyector.responsable">
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field type="number" density="compact" label="Telefono"
              hint="Departamento al cual se le realiza la asistencia" persistent-hint open-text="abrir"
              v-model="formProyector.tlf">
            </v-text-field>
          </v-col>


          <v-col cols="12">
            <v-textarea rows="3" clearable label="Descripción" variant="outlined" v-model="formProyector.descripsion">
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </dialog-form>
</template>

<script setup>
import { useProyectorStore } from '~/stores/proyector/proyectorStorage';
import { obtenerFechaHoraActual, obtenerDiaActual } from '~/assets/funciones_reuzables/times';

const storeProyector = useProyectorStore()

const storeAsistencias = useAsistenciasStore();

const { formProyector } = storeToRefs(storeProyector)
onMounted(() => {
  storeProyector.obtenerAsistencias()

  storeAsistencias.obtenerDatos()

  console.log(obtenerFechaHoraActual())
  console.log(obtenerDiaActual())

})
</script>