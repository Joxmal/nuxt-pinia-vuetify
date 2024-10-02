<template>
  <v-card @click="$emit('abrirDialog', props.images)" class="w-100 " min-height="240">
    <v-img :src="props.images[0]" aspect-ratio="1" class="bg-grey-lighten-2" height="125" cover>
    </v-img>
    <v-card-title class="text-h6">
      {{ props.title }}
    </v-card-title>

    <v-card-subtitle class="">
      {{ fechaEnEspañol(props.fecha) }}
    </v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click.stop="show = !show"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ props.text }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
const show = ref(false)

interface Props {
  title?: string
  images?: string[]
  text?: string
  fecha?: Date | string

}
const emits = defineEmits(['abrirDialog'])

const props = withDefaults(defineProps<Props>(), {
  title: 'title',
  images: () => ['https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'],
  text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
  fecha: () => new Date()
})




function fechaEnEspañol(fecha: string | Date) {
  const fechaOptenida = new Date(fecha)
  return fechaOptenida.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

} 
</script>