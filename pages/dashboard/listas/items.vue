<template>
    <tableData 
    :titulos="titulos"
    :lista-items="store.listaMapeada"
    />
    <v-divider></v-divider>
    <pre>
        {{ store.itemsLista }}

    </pre>
    <v-divider></v-divider>

    <v-divider></v-divider>
    <v-divider></v-divider>
    <!-- <div v-for="datos in store.itemsLista">
        <pre>
            {{datos }}
        </pre>
    </div> -->
    <v-divider></v-divider>
    


</template>

<script setup>
import {useItemsStore} from '~/stores/items'

definePageMeta({
    middleware:'autenticacion'
})

const store = useItemsStore()

const titulos = [
    {
    align: 'start',
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


const listaItems= [
    {
    cpu:'core 2 duo',
    tajeta_madre: 'asrock',
    mem_ram_tipo: "DDR3",
    mem_ram_capacidad: "3GB,1GB,1GB",
    case: "HP",
    mouse: "LOGITECH",
    teclado: "HP",
    monitor:'LG',
    creado:'2021-12-02',
    },
    {
    cpu:'core 2 duo',
    tajeta_madre: 'asrock',
    mem_ram_tipo: "DDR3",
    mem_ram_capacidad: "3GB,1GB,1GB",
    case: "HP",
    mouse: "LOGITECH",
    teclado: "HP",
    monitor:'LG',
    creado:'2020-12-02',
    },
    {
    cpu:'core 2 duo',
    tajeta_madre: 'asrock',
    mem_ram_tipo: "DDR3",
    mem_ram_capacidad: "3GB,1GB,1GB",
    case: "HP",
    mouse: "LOGITECH",
    teclado: "HP",
    monitor:'LG',
    creado:'2019-12-02',
    },
]

onBeforeMount(()=>{
    store.obtenerDatos()
})

</script>