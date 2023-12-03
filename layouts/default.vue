<template>
    <v-app>
        <v-layout>
            <v-app-bar scroll-behavior="hide elevate" prominent app>
                <template v-slot:prepend>
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>informatica-sgi</v-toolbar-title>
                </template>
                <template v-slot:append>
                    <v-btn variant="text" icon="mdi-filter"></v-btn>

                </template>
                
            </v-app-bar>
            
            <v-navigation-drawer
        theme="dark"
        rail
        permanent
        @mouseover="drawer= true"
        @mouseleave="drawer= false"
      >
        <v-list-item
          nav
          prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"
          height="45"
          inset
        >
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          density="compact"
          nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" value="Inicio"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" value="mensajes"></v-list-item>
          <v-list-item prepend-icon="mdi-desktop-classic" value="computadoras"></v-list-item>
          <v-list-item prepend-icon="mdi-printer-outline" value="impresoras"></v-list-item>
          <v-list-item prepend-icon="mdi-sitemap-outline" value="sistemas"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer permanent floating v-model="drawer" width="200"
      @mouseover="drawer= true"
      @mouseleave="drawer= false"
      >
        <v-list>
            <v-list-item-title height="60px" class="text-center text-h5 pt-3" inset>INICIO</v-list-item-title>
            <v-divider/>
          <v-list-item title="Home" value="home"></v-list-item>
          <v-list-item title="Contacts" value="contacts"></v-list-item>
          <v-list-item title="Settings" value="settings"></v-list-item>
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


const drawer = ref(false)


</script>