<template>
  <v-dialog max-width="900px" persistent>
    <template v-slot:activator="{ props }">
      <v-btn v-show="!prop.ocultar_boton" :style="classBtn" v-bind="props" color="indigo-lighten-5"
        @click="$emit('modoCrear')" :id="prop.id_boton || 'boton-dialogo'"> {{ boton_titulo || "NUEVO" }}
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card position="relative">
        <v-form ref="form" @submit.prevent validate-on="input">
          <alert-error style="position: fixed; right: 1rem; top: 0.4rem;" v-show="prop.iconError" mensaje="error" />
          <alert-success :icon="prop.icon" mensaje="Creado con éxito" v-show="mostrar_alert_create"
            style="position: fixed; right: 0;z-index: 20;" />

          <v-card-title>
            <span class="text-h5">{{ titulo_dialog }}</span>
          </v-card-title>

          <slot name="contenido"></slot>

          <small>*siga las instrucciones</small>

          <v-card-actions>
            <v-row v-if="!prop.ocultarBotones">
              <v-col cols="12" v-if="botonResetFormulario">
                <v-btn block @click="$emit('resetearFormulario')" class="ma-2" color="primary" variant="outlined"
                  border>Reset
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn block color="red-darken-1" variant="tonal" @click="$emit('cerrar'), isActive.value = false">
                  Cerrar
                </v-btn>
              </v-col>

              <v-col v-if="modoEditar" cols="6">
                <v-btn block type="submit" color="yellow-darken-1" variant="tonal" @click="validarFormulario('editar')">
                  Editar
                </v-btn>
              </v-col>

              <v-col v-if="!modoEditar" cols="6">
                <v-btn block type="submit" color="green" variant="tonal" @click="validarFormulario('crear')">
                  Crear
                </v-btn>
              </v-col>

            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>

const prop = defineProps([
  'titulo_dialog', // titulo del dialogo
  'boton_titulo', //nombre del boton
  'mostrar_alert_create', // mostrar o no la alerta de nueva creacion
  'modoEditar', // activar el boton de editar
  'icon', // icono de alerta succes
  'iconError',  // icono de error
  'id_boton', // id del boton (en caso de que queramos seleccionarlo con js)
  'ocultar_boton', // ocultar o no el boton (true o false)
  'botonResetFormulario', // mostrar o no el boton para resetear para formulario
  'ocultarBotones', // ocutar botonnes de editar y de crear
  "classBtn" // estilo del btn que abre el dialogo
])

const emit = defineEmits([
  'crear',
  'modoCrear',
  'editarDialogForm',
  'cerrar',
  'resetearFormulario'
])

const form = ref(null); // Referencia al formulario

const validarFormulario = async (accion) => {
  const { valid: isValid } = await form.value.validate(); // Validar el formulario
  if (isValid) {
    // Emitir el evento correspondiente según la acción
    if (accion === 'editar') {
      emit('editarDialogForm');
    } else {
      emit('crear');
    }
  } else {
    console.log("Formulario no válido"); // Manejo de errores (opcional)
  }
};

const myButton = ref(null)

defineExpose({
  myButton
})


</script>