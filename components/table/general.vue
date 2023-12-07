<template>
<alert-warning v-show="store.iconShow.delete"
  mensaje="eliminado con exito" 
/>
<v-card
  flat
  min-height="340"
>
  <v-data-table v-if="store.listaMapeada"
    sticky
    :hover="true"
    :height="400"
    :fixed-header="true"
    density="compact"
    :headers="props.titulos"
    :items="props.listaItems"
    :search="search">

    <template v-slot:top>
      <v-toolbar
        flat>
        <v-toolbar-title>ITEMS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          max-width="800px"
          persistent>
        
          <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                class="mb-2"
                v-bind="props"
              >
                Nuevo Item
              </v-btn>
            </template>

          <template v-slot:default="{ isActive }">
            <v-card loading position="relative">
              <alert-success 
              mensaje="Creado con exito" 
              v-show="store.iconShow.create" 
              style="position: absolute;right: 0;"
              />

              <v-card-title>
                <span class="text-h5">Nuevo item</span>
              </v-card-title>

              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="N° Item"
                      hint="Nro unico asignado por la alcaldia"
                      v-model = data.NRO_ITEM
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="CPU"
                      hint="CPU del equipo"
                      v-model = data.cpu
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="motherboard"
                      hint="tarjeta madre del equipo"
                      v-model = data.tarjeta_madre
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col 
                    cols="12" 
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :items="['DDR1', 'DDR2', 'DDR3', 'DDR4','NO']"
                      label="RAM TIPO"
                      v-model = data.Memoria_ram_tipo
                      required
                    >
                    </v-select>
                  </v-col>

                  <v-col 
                    cols="12" 
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :items="['<1GB','1GB', '2GB', '4GB', '8GB','16GB','NO']"
                      label="RAM CAP"
                      hint="cantidad de memoria del equipo"
                      persistent-hint
                      required
                      v-model = data.Memoria_ram_capacidad
                    >
                    </v-select>
                  </v-col>

                  <v-col
                    cols="12" 
                    sm="6"
                    md="4"
                  >
                    <v-autocomplete
                      :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo','NO']"
                      label="Fan Cooler"
                      hint="ventilador, solo el del CPU"
                      persistent-hint
                      required
                      v-model = data.fan_cooler
                    >
                    </v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12" 
                    sm="6"
                    md="4"
                  >
                    <v-autocomplete
                      :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo','ASTRON','NO']"
                      label="Case"
                      hint="Cajon donde esta el pc"
                      persistent-hint
                      v-model = data.case
                    ></v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12" 
                    sm="6"
                    md="4"
                  >
                    <v-autocomplete
                      :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo','NO']"
                      label="Mouse"
                      hint="Marca del mouse"
                      persistent-hint
                      v-model = data.mouse
                    ></v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12" 
                    sm="6"
                    md="4"
                  >
                    <v-autocomplete
                      :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo','NO']"
                      label="Teclado"
                      hint="Marca del teclado"
                      persistent-hint
                      v-model = data.teclado
                    ></v-autocomplete>
                  </v-col>

                  <v-col
                    cols="12" 
                    sm="6"
                    md="12"
                  >
                    <v-autocomplete
                      :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo','NO']"
                      label="Monitor"
                      hint="Marca Monitor"
                      persistent-hint
                      v-model = data.monitor
                    ></v-autocomplete>
                  </v-col>
                </v-row>


              </v-container>

              <small>*indicates required field</small>
              

              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="isActive.value = false"
                >
                  Cerrar
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="store.enviarItemsForm(data),resetData() "
                >
                  Crear
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

      </v-toolbar>
      <v-text-field
        v-model="search"
        label="Busqueda"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="underlined"
        hide-details/>
    </template>



    <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="store.eliminarItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
  <div v-else><s-v-g-spinner-frames class="text-h1 w-100"/></div>

</v-card>
</template>



<script setup>
import {useItemsStore} from '~/stores/items'

const store = useItemsStore()

const props = defineProps(['listaItems','titulos'])

const search = ref()

const dialog = ref(true)
const dialogDelete = ref(false)

//icono de mostrar y ocultar
const showIconos = reactive({
  delete:false,
  create:false
})

const data = reactive({
  NRO_ITEM:'',
  cpu:'',
  tarjeta_madre:'',
  Memoria_ram_tipo:'',
  Memoria_ram_capacidad:'',
  fan_cooler:'',
  case:'',
  mouse:'',
  teclado:'',
  monitor:'',
})

function resetData() {
  data.NRO_ITEM = '';
  data.cpu = '';
  data.tarjeta_madre = '';
  data.Memoria_ram_tipo = '';
  data.Memoria_ram_capacidad = '';
  data.fan_cooler = '';
  data.case = '';
  data.mouse = '';
  data.teclado = '';
  data.monitor = '';
}

function editItem(valor){
  console.log(valor)
}


</script>