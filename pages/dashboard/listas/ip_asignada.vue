<template>
    <table-general :listaItems="listaItems" :titulos="titulos" />
    <pre>
        {{ store.listaMapeada }}
    </pre>
    <dialog-form>
        <template #contenido>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" >
                        <v-text-field
                            label="IP"
                            hint="IP asignada al equipo y usuario"
                            v-model="data.ip"
                            required>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" >
                        <v-text-field
                            label="usuario"
                            hint="nombre del operador de la maquina"
                            v-model="data.usuario">
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" >
                        <v-autocomplete
                            :items="store.listaDepartamento"
                            label="Departamento"
                            hint="departamento al que pertenece el usuario"
                            v-model="data.departamento"
                            required>
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" >
                        <v-text-field
                            label="Cedula"
                            v-model="data.cedula"
                            hint="cedula del usuario"
                            required>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </dialog-form>
    {{ data }}
</template>

<script setup>
import { useIPListaStore } from '~/stores/ip_lista'
const store = useIPListaStore()

const titulos = [
    { key: 'ip',
     title: 'IP',
     sortable:true,
    },
    {
     key: 'usuario',
     sortable: true,
     title: 'Usuario',
    },
    { key: 'creado', title: 'Creado'},
    { key: 'cedula', title: 'Cedula'},
    { key: 'id', title: 'system'},
]

const listaItems = [
    {
        ip: "10.13.180",
        usuario: "jose",
        departamento: "INFORMATICA",
        creado: "2023-12-07",
        cedula:'28045702',
        id: 'a21dad1'
    }
]

const data = reactive({
    ip:'',
    usuario:'',
    departamento:'',
    cedula:'',
})

</script>
