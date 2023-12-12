<template>
  <v-switch
        inset
        density="compact"
        v-model="valor"
        base-color="primary"
        :color="valor != false ? 'primary' : 'red' "
        hide-details
        append-icon="mdi-weather-night"
        prepend-icon="mdi mdi-white-balance-sunny"
        >
        
    </v-switch>
</template>
  
<script setup>
import { useTheme } from 'vuetify'

const valor = ref(false)

const theme = useTheme()

function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}



watch(valor,()=>{
    toggleTheme ()
})
</script>
