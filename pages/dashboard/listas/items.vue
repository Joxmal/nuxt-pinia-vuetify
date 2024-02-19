<template>
  <!-- alertas -->
  <div>
    <v-slide-x-transition group>
      <AlertError v-show="useListasStore().ocurrioUnError === true" key="1"
        style="position: fixed; right: 20px; z-index: 20" mensaje="ERROR" />
      <AlertSuccess v-show="useListasStore().envioExitoso === true" key="2"
        style="position: fixed; right: 20px; z-index: 20" mensaje="Cargado con exito" />
    </v-slide-x-transition>
  </div>

  <v-expansion-panels variant="popout" class="my-4">
    <!-- departamento  -->
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-black"><v-icon color="secondary" icon="mdi-home-group" class="mr-2"/> Departamentos</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card color="" class="mx-auto">
          <v-card-subtitle>Lista de cada departamento</v-card-subtitle>
          <v-card-text>
            <div class="d-flex ga-2 flex-wrap aling-center py-2">
              <v-scroll-y-transition group>
                <v-chip closable @click:close="
                  eliminarItemLista({
                    listaDelItem: itemsDepartamento,
                    posicion: i,
                    jsonPinia: 'jsonDepartamentos',
                  }),
                  (activarBotonDepartamento = true)
                  " v-for="(item, i) in itemsDepartamento.listaDepartamento" :key="item" class="text-center">
                  {{ item }}
                </v-chip>
              </v-scroll-y-transition>
            </div>
            <v-form @submit.prevent v-if="useStoreConexion().avatarRole === 'superUser'">
              <v-text-field @keyup.enter="
                agregarNuevoItem({
                  nuevoItem: NuevoDepartamento,
                  listaDelItem: itemsDepartamento,
                  jsonPinia: 'jsonDepartamentos',
                }),
                (activarBotonDepartamento = true)
                " v-model="NuevoDepartamento"></v-text-field>
              <v-card-actions>
                <v-btn :disabled="!activarBotonDepartamento" @click="actualizarListas" variant="flat" class="mx-auto"
                  color="primary">ACTUALIZAR BASE DE DATOS</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <!-- CPU -->
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-black"><v-icon color="secondary" icon="mdi-cpu-64-bit" class="mr-2"/>CPU</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card color="" class="mx-auto">
          <v-card-subtitle>Lista de cada CPU</v-card-subtitle>
          <v-card-text>
            <div class="d-flex ga-2 flex-wrap aling-center py-2">
              <v-scroll-y-transition group>
                <v-chip v-for="(item, i) in itemsCpu.cpu" :key="item" closable class="text-center" @click:close="
                  eliminarItemLista({
                    listaDelItem: itemsCpu,
                    posicion: i,
                    jsonPinia: 'jsonCpu',
                  }),
                  (activarBotonCpu = true)
                  ">
                  {{ item }}
                </v-chip>
              </v-scroll-y-transition>
            </div>
            <v-form @submit.prevent v-if="useStoreConexion().avatarRole === 'superUser'">
              <v-text-field @keyup.enter="
                agregarNuevoItem({
                  nuevoItem: NuevoCpu,
                  listaDelItem: itemsCpu,
                  jsonPinia: 'jsonCpu',
                }),
                (activarBotonCpu = true)
                " v-model="NuevoCpu"></v-text-field>
              <v-card-actions>
                <v-btn :disabled="!activarBotonCpu" @click="actualizarListas" variant="flat" class="mx-auto"
                  color="primary">ACTUALIZAR BASE DE DATOS</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <!--Monitor-->
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-black"><v-icon color="secondary" icon="mdi-monitor-star" class="mr-2"/>Monitor</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card color="" class="mx-auto">
          <v-card-subtitle>Lista de cada Monitor</v-card-subtitle>
          <v-card-text>
            <div class="d-flex ga-2 flex-wrap aling-center py-2">
              <v-scroll-y-transition group>
                <v-chip v-for="(item, i) in itemsMonitor.monitor" :key="item" closable class="text-center" @click:close="
                  eliminarItemLista({
                    listaDelItem: itemsMonitor,
                    posicion: i,
                    jsonPinia: 'jsonMonitor',
                  }),
                  (activarBotonMonitor = true)
                  ">
                  {{ item }}
                </v-chip>
              </v-scroll-y-transition>
            </div>
            <v-form @submit.prevent v-if="useStoreConexion().avatarRole === 'superUser'">
              <v-text-field @keyup.enter="
                agregarNuevoItem({
                  nuevoItem: NuevoMonitor,
                  listaDelItem: itemsMonitor,
                  jsonPinia: 'jsonMonitor',
                }),
                (activarBotonMonitor = true)
                " v-model="NuevoMonitor"></v-text-field>
              <v-card-actions>
                <v-btn :disabled="!activarBotonMonitor" @click="actualizarListas" variant="flat" class="mx-auto"
                  color="primary">ACTUALIZAR BASE DE DATOS</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <!--Impresora-->
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-black"><v-icon color="secondary" icon="mdi-printer" class="mr-2"/>Impresora</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card color="" class="mx-auto">
          <v-card-subtitle>Lista de cada Impresora</v-card-subtitle>
          <v-card-text>
            <div class="d-flex ga-2 flex-wrap aling-center py-2">
              <v-scroll-y-transition group>
                <v-chip v-for="(item, i) in itemsImpresora.impresora" :key="item" closable class="text-center"
                  @click:close="
                    eliminarItemLista({
                      listaDelItem: itemsImpresora,
                      posicion: i,
                      jsonPinia: 'jsonImpresora',
                    }),
                    (activarBotonImpresora = true)
                    ">
                  {{ item }}
                </v-chip>
              </v-scroll-y-transition>
            </div>
            <v-form @submit.prevent v-if="useStoreConexion().avatarRole === 'superUser'">
              <v-text-field @keyup.enter="
                agregarNuevoItem({
                  nuevoItem: NuevoImpresora,
                  listaDelItem: itemsImpresora,
                  jsonPinia: 'jsonImpresora',
                }),
                (activarBotonImpresora = true)
                " v-model="NuevoImpresora">
              </v-text-field>
              <v-card-actions>
                <v-btn :disabled="!activarBotonImpresora" @click="actualizarListas" variant="flat" class="mx-auto"
                  color="primary">ACTUALIZAR BASE DE DATOS</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <!--tarjeta Madre-->
    <v-expansion-panel>
      <v-expansion-panel-title class="font-weight-black"><v-icon color="secondary" icon="mdi-chip" class="mr-2"/>Tarjeta Madre</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card color="" class="mx-auto">
          <v-card-subtitle>Lista de cada Tarjeta Madre</v-card-subtitle>
          <v-card-text>
            <div class="d-flex ga-2 flex-wrap aling-center py-2">
              <v-scroll-y-transition group>
                <v-chip v-for="(item, i) in itemsTarjetaMadre.tarjeta_madre" :key="item" closable class="text-center"
                  @click:close="
                    eliminarItemLista({
                      listaDelItem: itemsTarjetaMadre,
                      posicion: i,
                      jsonPinia: 'jsonTarjeta_madre',
                    }),
                    (activarBotonImpresora = true)
                    ">
                  {{ item }}
                </v-chip>
              </v-scroll-y-transition>
            </div>
            <v-form @submit.prevent v-if="useStoreConexion().avatarRole === 'superUser'">
              <v-text-field @keyup.enter="
                agregarNuevoItem({
                  nuevoItem: NuevoTarjetaMadre,
                  listaDelItem: itemsTarjetaMadre,
                  jsonPinia: 'jsonTarjeta_madre',
                }),
                (activarBotonTarjetaMadre = true)
                " v-model="NuevoTarjetaMadre">
              </v-text-field>
              <v-card-actions>
                <v-btn :disabled="!activarBotonTarjetaMadre" @click="actualizarListas" variant="flat" class="mx-auto"
                  color="primary">ACTUALIZAR BASE DE DATOS</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <!--tooners-->
    <!-- <v-expansion-panel >
      <v-expansion-panel-title class=" font-weight-black"><v-icon color="secondary" icon="mdi-water-plus-outline" class="mr-2"/> Tooners Modelos  </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card color="" class="mx-auto">
          <v-card-subtitle>Lista de cada Tooner</v-card-subtitle>
          <v-card-text>
            <div class="d-flex ga-2 flex-wrap aling-center py-2">
              <v-scroll-y-transition group>
                <v-chip v-for="(item, i) in itemsTooner.tooners" :key="item" closable class="text-center"
                  @click:close="
                    eliminarItemLista({
                      listaDelItem: itemsTooner,
                      posicion: i,
                      jsonPinia: 'jsonTooners',
                    }),
                    (activarBotonTooner = true)
                    ">
                  {{ item }}
                </v-chip>
              </v-scroll-y-transition>
            </div>
            <v-form @submit.prevent v-if="useStoreConexion().avatarRole === 'superUser'">
              <v-text-field @keyup.enter="
                agregarNuevoItem({
                  nuevoItem: NuevoTooner,
                  listaDelItem: itemsTooner,
                  jsonPinia: 'jsonTooners',
                }),
                (activarBotonTooner = true)
                " v-model="NuevoTooner">
              </v-text-field>
              <v-card-actions>
                <v-btn :disabled="!activarBotonTooner" @click="actualizarListas" variant="flat" class="mx-auto"
                  color="primary">ACTUALIZAR BASE DE DATOS</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel> -->
  </v-expansion-panels>
</template>

<script setup>
definePageMeta({
  middleware: "autenticacion",
});

//departamentos---------------------------------
const itemsDepartamento = ref({
  listaDepartamento: "",
});
const NuevoDepartamento = ref("");
const activarBotonDepartamento = ref(false);
//cpu-------------------------------------------
const itemsCpu = ref({
  cpu: "",
});
const NuevoCpu = ref("");
const activarBotonCpu = ref(false);
//Monitor -----------------------------------------------
const itemsMonitor = ref({
  monitor: "",
});
const NuevoMonitor = ref("");
const activarBotonMonitor = ref(false);
// impresora -----------------------------------------------
const itemsImpresora = ref({
  impresora: "",
});
const NuevoImpresora = ref("");
const activarBotonImpresora = ref(false);
//Tarjeta madre -----------------------------------------------
const itemsTarjetaMadre = ref({
  tarjeta_madre: "",
});
const NuevoTarjetaMadre = ref("");
const activarBotonTarjetaMadre = ref(false);
//Tooners -----------------------------------------------
const itemsTooner = ref({
  tooners: "",
});
const NuevoTooner = ref("");
const activarBotonTooner = ref(false);
// -----------------------------------------------

function agregarNuevoItem({ nuevoItem, listaDelItem, jsonPinia }) {
  if (nuevoItem === "") {
    return;
  }
  if (
    listaDelItem[Object.keys(listaDelItem)[0]].includes(nuevoItem.toUpperCase())
  ) {
    alert("No coloques repetidos");
    return;
  }

  console.log(Object.keys(listaDelItem)[0]);

  listaDelItem[Object.keys(listaDelItem)[0]].push(nuevoItem.toUpperCase());
  nuevoItem = "";
  console.log(jsonPinia);
  useListasStore()[`${jsonPinia}`] = listaDelItem;
}
//-------------------------

function eliminarItemLista({ listaDelItem, posicion, jsonPinia }) {
  console.log(Object.keys(listaDelItem)[0]);
  listaDelItem[Object.keys(listaDelItem)[0]].splice(posicion, 1);
  console.log(jsonPinia);
  console.log(useListasStore().jsonPinia);
  useListasStore()[`${jsonPinia}`] = listaDelItem;
}

async function actualizarListas() {
  if (confirm("¿Estas seguro que quieres guardar?, no se puede volver atras")) {
    await useListasStore().cargarNuevoJson();
    await useListasStore().obtenerListas();
  }
}

onMounted(async () => {
  console.log(useListasStore().listas);
  await useListasStore().obtenerListas();

  itemsDepartamento.value.listaDepartamento = [
    ...useListasStore().listaDepartamento,
  ];
  itemsCpu.value.cpu = [...useListasStore().listaCPU];
  itemsMonitor.value.monitor = [...useListasStore().listaMonitor];
  itemsImpresora.value.impresora = [...useListasStore().listaImpresoras];
  itemsTarjetaMadre.value.tarjeta_madre = [...useListasStore().listaTarjetaMadre,];
  itemsTooner.value.tooners = [...useListasStore().listaTooner,]

  console.log(useListasStore().listaDepartamento);
});
</script>
