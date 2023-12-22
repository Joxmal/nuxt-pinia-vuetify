<template>
    <v-list>
      <v-slide-x-transition group>
        <v-list-item v-for="item in items" :key="item.id" class="pa-2 border">
          <v-list-item color="red" class="text-red">
            {{ item.text }}
          </v-list-item>
          <v-list-item-action>
            <v-btn @click="removeItem(item.id)">
              Remove
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-slide-x-transition>
    </v-list>

    <div class="contenedor">
  <div class="centro">
    centro
  </div>
  <div class="derecha">
    derecha
  </div>
</div>

    <pre>
        {{ items }}

    </pre>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { id: 1, text: 'Item 1' },
          { id: 2, text: 'Item 2' },
          { id: 3, text: 'Item 3' },
        ],
      };
    },
    methods: {
      removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
      },
    },
  };
  </script>
  

<style scoped>
.contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.centro {
  /* Estilos del div centrado */
  margin: auto;
}

.derecha {
  /* Estilos del div alineado a la derecha */
  margin-left: auto;
}
</style>