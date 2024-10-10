<template>
    <div class="text-center">
        <v-btn v-show="!ocultarBoton" :id="idBoton" color="primary" @click="dialog = true">
            {{ props.nameBoton }}
        </v-btn>
    </div>
    <v-dialog v-model="dialog">
        <slot name="contenido">
        </slot>

    </v-dialog>
</template>


<script setup>

const props = defineProps({
    nameBoton: {
        typeo: String,
        default: 'Abrir'
    },
    idBoton: {
        type: String,
        default: 'boton'
    },
    ocultarBoton: {
        type: Boolean,
        default: true
    }
})

const dialog = ref()

const botonAbrirDialog = ref()

</script>