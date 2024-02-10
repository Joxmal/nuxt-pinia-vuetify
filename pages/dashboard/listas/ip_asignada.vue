<template>
<table-general 
    titulo_table="IP asignada al usuario"
    :mostrar_alert_delete="store.iconDelete"
    :listaItems="store.mapeoLista" 
    :titulos="titulos" 
    :loading="store.activarTabla" 
    @editar="editar"
    @eliminar="store.deleteListaDatos"
    >
    <template #dialogo>
        <dialog-form
         :icon="icono_EDitar_Crear"
         :modoEditar="modoEditar"
         :titulo_dialog="modoTitulo"
         boton_titulo="NUEVA ASIGNACION"
         :mostrar_alert_create="store.iconCreated"
         @editarDialogForm="editarListaDatos"
         @crear="crearListaDatos(data)"
         @modoCrear="cambiarCreacion"
        >
            <template #contenido>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" >
                            <v-text-field
                                label="IP"
                                hint="IP asignada al equipo y usuario (se recomienda colocar)"
                                persistent-hint
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
                                :items="useListasStore().listaDepartamento"
                                label="Departamento"
                                hint="departamento al que pertenece el usuario"
                                persistent-hint
                                v-model="data.departamento"
                                required>
                            </v-autocomplete>
                        </v-col>
    
                        <v-col cols="12" sm="6" >
                            <v-text-field
                                label="Cedula"
                                v-model="data.cedula"
                                hint="cedula del usuario SOLO NUMEROS (OPCIONAL)"
                                persistent-hint
                                required
                                type="number"
                                >
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


<!-- datos para el form
<pre>
    {{ data }}
</pre>
<v-divider/>
lista bd:

<pre>
    {{ store.listaIPObtenida }}
</pre>
lista mapeada
<pre>
    {{ store.mapeoLista }}

</pre> -->


</template>

<script setup>
import { useIPListaStore } from '~/stores/ip_lista'
const store = useIPListaStore()
definePageMeta({
    middleware:'autenticacion'
})


// titulos de la tabla
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
//datos para el form
const data = reactive({
    ip:'',
    usuario:'',
    departamento:'',
    cedula:'',
    id:''
})
// resetear los datos del form
function resetData(){
    data.ip = ""
    data.usuario = ""
    data.departamento = ""
    data.cedula = ""
    data.id = ''
}


function recibe(valor){
    console.log(valor)   
}


function editarListaDatos(){
    const editarDb = {
        "IP": data.ip,
        "usuario": data.usuario,
        "departamento": data.departamento,
        "cedula": data.cedula
    }
    store.updateListaDatos(data.id,editarDb)
}

//crear 
function crearListaDatos(data){
    const datosDB = {
        "IP": data.ip,
        "usuario": data.usuario,
        "departamento": data.departamento,
        "cedula": data.cedula
    }
    store.crearListaDatos(datosDB)
    resetData()
}

const icono_EDitar_Crear = ref()

//cambiar a modo editar y creacion

function cambiarCreacion(){
    modoEditar.value = false
    icono_EDitar_Crear.value =  undefined
    modoTitulo.value = 'CREAR'
    resetData()
}

const modoEditar = ref()
const modoTitulo = ref()

function editar(valor){
    const elemento = document.getElementById('boton-dialogo')
    elemento.click()
    modoEditar.value = true
    modoTitulo.value = 'EDITAR'
    icono_EDitar_Crear.value = 'mdi-pencil'

    console.log(valor)

    data.ip = valor.ip
    data.usuario = valor.usuario
    data.departamento = valor.departamento
    data.cedula = valor.cedula
    data.id = valor.id
}

onMounted(()=>{
    store.obtenerListaDatos()
})


</script>
