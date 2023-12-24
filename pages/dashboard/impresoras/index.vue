<template>
    <v-carousel class="mb-4" progress="warning" hide-delimiter-background color="background" show-arrows="hover">
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
    </v-carousel>
<v-container class="d-flex flex-wrap ga-2">
    <v-card border elevation="10" v-for="n in 20" width="200" class="pb-2">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>
    
        <v-img cover height="120" src="https://http2.mlstatic.com/D_NQ_NP_933912-MLV46596998678_072021-O.webp"></v-img>
        <v-card-item>
            <v-card-title>HP 117</v-card-title>
    
            <v-card-subtitle>
                <span class="me-1">MUY USADA</span>
    
                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
    
            <MenuDropdown/>
        </v-card-item>
    
        <v-card-text class="d-flex ga-2 justify-space-between">
            <v-tooltip text="Descripsion">
                <template v-slot:activator="{ props }">
                    <v-btn border icon="mdi-image-text" v-bind="props"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip text="Tooner">
                <template v-slot:activator="{ props }">
                    <v-btn border icon="mdi-water" v-bind="props"></v-btn>
                </template>
            </v-tooltip>
    
        </v-card-text>
    
        <v-divider class="mx-4 mb-1"></v-divider>
    
        <v-card-title>Modelo Tooner</v-card-title>
    
        <div class="px-4">
            <v-chip link>MAXIPRINT 105-A</v-chip>
        </div>
    </v-card>
</v-container>

</template>

<script setup>
const items = [
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
]
</script>