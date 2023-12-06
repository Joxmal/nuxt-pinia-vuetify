<template>
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
        :search="search"
      >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>ITEMS</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            max-width="800px"
            persistent
          >
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

              <v-card loading>
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
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col 
                        cols="12" 
                        sm="6"
                        md="4"
                      >
                        <v-select
                          :items="['DDR1', 'DDR2', 'DDR3', 'DDR4']"
                          label="RAM TIPO"
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
                          :items="['<1GB','1GB', '2GB', '4GB', '8GB','16GB']"
                          label="RAM CAP"
                          hint="cantidad de memoria del equipo"
                          persistent-hint
                          required
                        >
                        </v-select>
                      </v-col>

                      <v-col
                        cols="12" 
                        sm="6"
                        md="4"
                      >
                        <v-autocomplete
                          :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo']"
                          label="Fan Cooler"
                          hint="ventilador, solo el del CPU"
                          persistent-hint
                          required
                        >
                        </v-autocomplete>
                      </v-col>

                      <v-col
                        cols="12" 
                        sm="6"
                        md="4"
                      >
                        <v-autocomplete
                          :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo','ASTRON']"
                          label="Case"
                          hint="Cajon donde esta el pc"
                          persistent-hint
                        ></v-autocomplete>
                      </v-col>

                      <v-col
                        cols="12" 
                        sm="6"
                        md="4"
                      >
                        <v-autocomplete
                          :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo']"
                          label="Mouse"
                          hint="Marca del mouse"
                          persistent-hint
                        ></v-autocomplete>
                      </v-col>

                      <v-col
                        cols="12" 
                        sm="6"
                        md="4"
                      >
                        <v-autocomplete
                          :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo']"
                          label="Teclado"
                          hint="Marca del teclado"
                          persistent-hint
                        ></v-autocomplete>
                      </v-col>

                      <v-col
                        cols="12" 
                        sm="6"
                        md="12"
                      >
                        <v-autocomplete
                          :items="['Generico','HP', 'Dell', 'VIT', 'Lenovo']"
                          label="Monitor"
                          hint="Marca Monitor"
                          persistent-hint
                        ></v-autocomplete>
                      </v-col>
                    </v-row>


                  </v-container>
                  <small>*indicates required field</small>
                

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="isActive.value = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="console.log('enviado')"
                  >
                    Save
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
        hide-details
        >
        </v-text-field>
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
        @click="deleteItem(item)"
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



function editItem(valor){
  console.log(valor)
  console.log(valor.name)

}


</script>