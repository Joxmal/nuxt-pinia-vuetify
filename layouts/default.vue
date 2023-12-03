<template>
    <v-app>
        <v-layout>
            <v-app-bar scroll-behavior="hide elevate" prominent app>
                <v-toolbar-title>informatica-sgi</v-toolbar-title>

                <v-btn variant="text" icon="mdi-filter"></v-btn>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </v-app-bar>
            
            <v-navigation-drawer
        theme="dark"
        rail
        permanent
      >
        <v-list-item
          nav
          prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list
          density="compact"
          nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" value="dashboard"></v-list-item>

          <v-list-item prepend-icon="mdi-forum" value="messages"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer permanent floating v-model="drawer">
        <v-list>
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

<script>
export default {
    data: () => ({
        drawer: false,
        group: null,
        items: [
            {
                title: 'Foo',
                value: 'foo',
            },
            {
                title: 'Bar',
                value: 'bar',
            },
            {
                title: 'Fizz',
                value: 'fizz',
            },
            {
                title: 'Buzz',
                value: 'buzz',
            },
        ],
    }),

    watch: {
        group() {
            this.drawer = false
        },
    },
}
</script>