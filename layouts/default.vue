<template>
    <v-app>
        <v-layout>
            <v-app-bar scroll-behavior="hide elevate" prominent app>
                <template v-slot:prepend>
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <nuxt-link to="/dashboard" style="text-decoration: none;">
                      <v-toolbar-title >informatica-sgi</v-toolbar-title>
                    </nuxt-link>
                </template>
                <template v-slot:append>
                    <v-btn :loading="storeReset.loading" @click="storeReset.resetDataFromDB()" variant="text" icon="mdi-restart"></v-btn>
                </template>
                
            </v-app-bar>
            <v-navigation-drawer
        theme="dark"
        rail
        permanent
      >
        <v-list-item
          nav
          :prepend-avatar="store.avatarImagen || 'https://randomuser.me/api/portraits/women/75.jpg'"
          height="45"
          inset
        >
        </v-list-item>

        <v-divider></v-divider>

        <v-list
        v-model:selected="categoria"
          density="compact"
          nav
        >

            <v-list-item @click="MostrarMenu('inicio'),drawer= true" prepend-icon="mdi-view-dashboard" value="inicio"/>

            <v-list-item @click="MostrarMenu('listas'),drawer= true" prepend-icon="mdi-list-status" value="listas"/>

            <v-list-item @click="MostrarMenu('reporte'),drawer= true" prepend-icon="mdi-desktop-classic" value="reporte"/>

            <v-list-item @click="MostrarMenu('impresoras'),drawer= true" prepend-icon="mdi-printer-outline" value="impresoras"/>

            <v-list-item @click="MostrarMenu('sistemas'),drawer= true" prepend-icon="mdi-sitemap-outline" value="sistemas"/>



        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer permanent floating v-model="drawer" width="200"
      @mouseenter="drawer= true"
      @mouseleave="cerrarbarra"
      >
        <v-list>
            <v-list-item-title height="60px" class="text-center text-h3 pt-3 text-overline">{{ViewMenu}}</v-list-item-title>
            <v-divider/>

            <!-- General -->
            <nuxt-link v-show="ViewMenu==='inicio'" :to="lista.path" v-for="lista in listaNavegacion.general" :key="lista.value" style="text-decoration: none;">
              <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
            </nuxt-link>

            <!-- Reportes -->
            <nuxt-link v-show="ViewMenu=='reporte'" :to="lista.path" v-for="lista in listaNavegacion.reportes" :key="lista.value" style="text-decoration: none;">
              <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
            </nuxt-link>

            <!-- listado -->
            <nuxt-link v-show="ViewMenu=='listas'" :to="lista.path" v-for="lista in listaNavegacion.listas" :key="lista.value" style="text-decoration: none;">
              <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
            </nuxt-link>


        </v-list>

      </v-navigation-drawer>
            <v-main app>
                <v-container app>
                    <slot />
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>

<script setup>
import {useStoreConexion} from '~/stores/useStoreConexion'
import {useResetStorage} from '~/stores/reset'

const store = useStoreConexion()
const storeReset =useResetStorage()

const loading = ref(false)

const drawer = ref(false)
const categoria = ref()
const ViewMenu= ref('inicio')


function MostrarMenu(valor){
  ViewMenu.value = valor
}

const listaNavegacion = {
  general:{
    1:{ icon:'mdi-newspaper', value:'noticias', path:'/dashboard/general/noticias'},
    2:{ icon:'mdi-folder-plus', value:'numeros'}, 
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
  },
  listas:{
    1:{ icon:'mdi-office-building-cog-outline', value:'Items', path:'/dashboard/listas/items'},
    2:{ icon:'mdi-folder-plus', value:'Reportes'}, 
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
  },
  reportes:{
    1:{ icon:'mdi-file-chart', value:'reportes', path:'/dashboard/reportes/generarReporte'},
    2:{ icon:'mdi-folder-plus', value:'numeros'}, 
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
  }
}


function cerrarbarra() {
  setTimeout(() => {
    drawer.value = false
  }, 500);
}


</script>