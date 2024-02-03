<template>
  <v-app>
    <v-layout app>
      <v-app-bar border color="primary" elevation="15" scroll-behavior="hide elevate" >
          <template v-slot:prepend>
              <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
              <nuxt-link  to="/dashboard" class="text-surface text-decoration-none">
                <v-toolbar-title  >INICIO</v-toolbar-title>
              </nuxt-link>
          </template>
            <v-btn  :loading="storeReset.loading" @click="storeReset.resetDataFromDB()" variant="text" icon="mdi-restart"></v-btn>
            <template v-slot:append>
              <avatar-general/>
            
          </template>
      </v-app-bar>

      <v-navigation-drawer
        class=""
        rail
        permanent
        
      >
        <v-list-item
          nav
          :prepend-avatar="store.avatarImagen || 'https://randomuser.me/api/portraits/women/75.jpg'"
          height="45"
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

      <v-navigation-drawer
        class=""
        border="right"
        v-model="drawer" width="175"
        @mouseenter="drawer= true"
        >
        <v-list>
          <v-list-item-title height="60px" class="text-center text-h3 pt-3 text-overline">{{ViewMenu}}</v-list-item-title>
          <v-divider/>
            <!-- General -->
          <nuxt-link class="text-decoration-none" :class="listaNavegacion.class" v-show="ViewMenu==='inicio'" :to="lista.path" v-for="lista in listaNavegacion.general" :key="lista.value">
            <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
          </nuxt-link>

            <!-- Reportes -->
          <nuxt-link v-show="ViewMenu=='reporte'" :class="listaNavegacion.class" :to="lista.path" v-for="lista in listaNavegacion.reportes" :key="lista.value" style="text-decoration: none;">
            <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
          </nuxt-link>

            <!-- listado -->
          <nuxt-link v-show="ViewMenu=='listas'" :class="listaNavegacion.class" :to="lista.path" v-for="lista in listaNavegacion.listas" :key="lista.value" style="text-decoration: none;">
            <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
          </nuxt-link>
          
          
          <!-- sistemas -->
          <nuxt-link v-show="ViewMenu=='sistemas'" :class="listaNavegacion.class"  :to="lista.path" v-for="lista in listaNavegacion.sistemas" :key="lista.value" style="text-decoration: none;">
            <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
          </nuxt-link>

          <!-- sistemas -->
          <nuxt-link v-show="ViewMenu=='impresoras'" :class="listaNavegacion.class"  :to="lista.path" v-for="lista in listaNavegacion.impresoras" :key="lista.value" style="text-decoration: none;">
            <v-list-item :append-icon="lista.icon" :title="lista.value" :value="lista.value"/>
          </nuxt-link>
        </v-list>

      </v-navigation-drawer>
      <v-main >

          <v-container>
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
  class:"text-colorLink",

  general:{
    1:{ icon:'mdi-newspaper', value:'noticias', path:'/dashboard/general/noticias'},
    2:{ icon:'mdi-folder-plus', value:'numeros'}, 
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
    4:{ icon:'mdi-test-tube', value:'pruebas', path:'/dashboard/general/pruebas'},
    5:{ icon:'mdi-test-tube', value:'pruebas2', path:'/dashboard/general/pruebas'},
  },
  listas:{
    1:{ icon:'mdi-office-building-cog-outline', value:'Items', path:'/dashboard/listas/items'},
    2:{ icon:'mdi-account', value:'Usuarios', path:'/dashboard/listas/ip_asignada'}, 
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
  },
  reportes:{
    1:{ icon:'mdi-file-chart', value:'asistencia', path:'/dashboard/reportes/generarAsistencia'},
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
  },
  sistemas:{
    1:{ icon:'mdi-ip-outline', value:'adadd', path:'/dashboard/sistemas/ip'},
    2:{ icon:'mdi-multicast', value:'Map Ofic', path:'/dashboard/sistemas/mapaOficinas'}, 
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
  },
  impresoras:{
    1:{ icon:'mdi-map-marker-star-outline', value:'ubicaciones', path:'/dashboard/impresoras'},
    2:{ icon:'mdi-folder-plus', value:'numeros'}, 
    3:{ icon:'mdi-alert-decagram', value:'importante'}, 
  },

}


function cerrarbarra() {
  setTimeout(() => {
    drawer.value = false
  }, 500);
}


</script>


<style>

</style>