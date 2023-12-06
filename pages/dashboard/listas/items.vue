<template>
    <tableData
    :titulos="titulos"
    :lista-items="store.listaMapeada"
    >
    </tableData>
    <v-divider/>
    <pre>
        {{ store.itemsLista }}
    </pre>
    <v-divider></v-divider>
    
</template>

<script setup>
import {useItemsStore} from '~/stores/items'

definePageMeta({
    middleware:'autenticacion'
})

const store = useItemsStore()

const titulos = [
    { key: 'NRO_ITEM',
     title: 'NRO_ITEM',
     sortable:false,
    },
    {
        key: 'cpu',
        sortable: false,
        title: 'CPU',
    },
    { key: 'tarjeta_madre', title: 'Tarjeta madre' },
    { key: 'mem_ram_tipo', title: 'Mem_ram tipo' },
    { key: 'mem_ram_capacidad', title: 'Mem ram capacidad' },
    { key: 'case', title: 'Case' },
    { key: 'mouse', title: 'Mouse' },
    { key: 'teclado', title: 'Teclado' },
    { key: 'monitor', title: 'Monitor' },
    { key: 'creado', title: 'Creado' },
    { key: 'actions', title: 'Actions' },
    { key: 'id', title: 'ID' },
]

onBeforeMount(()=>{
    store.obtenerDatos()
})

</script>