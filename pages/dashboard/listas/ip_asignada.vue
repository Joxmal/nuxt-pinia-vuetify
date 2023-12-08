<template>
    <v-btn @click="boton = !boton"></v-btn>
<table-general :listaItems="listaItems" :titulos="titulos " titulo_table="IP asignada al usuario"
    @editar="editar"
    @eliminar="recibe"
    >
    <template #dialogo>
        <dialog-form
        :propactivacion="boton"
         titulo_dialog="crear ip"
         boton_titulo="NUEVA ASIGNACION"
         :mostrar_alert_create="true"
        @crear="recibe">
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
    </template>
</table-general>
<pre>
</pre>
<v-divider/>
datos para el form
<pre>
    {{ data }}
</pre>
<v-divider/>
datos para editar:
<pre>
    {{ dataEditar }}
</pre>






</template>

<script setup>
import { useIPListaStore } from '~/stores/ip_lista'
const store = useIPListaStore()


const boton = ref(true)

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
    { key: 'departamento', title: 'Departamento'},
    { key: 'creado', title: 'Creado'},
    { key: 'cedula', title: 'Cedula'},
    { key: 'actions', title: 'Actions' },
    { key: 'id', title: 'system'},
]

const listaItems = [
    {
        ip: "10.13.180",
        usuario: "jose",
        departamento: "INFORMATICA",
        cedula:'28045702',
        creado: "2023-12-07",
        id: 'a21dad1'
    },
    {
        ip: "10.11.145",
        usuario: "CESAR",
        departamento: "CATASTRO",
        cedula:'8965232',
        creado: "2022-11-05",
        id: 'a1dad1ad1a'
    }
]




const data = reactive({
    ip:'',
    usuario:'',
    departamento:'',
    cedula:'',
    id:''
})


const dataEditar= ref()


function recibe(valor){
    console.log(valor)   
}

function editar(valor){
    console.log(valor)

    data.ip = valor.ip
    data.usuario = valor.ip
    data.departamento = valor.ip
    data.cedula = valor.ip
    data.id = valor.id
}
</script>
