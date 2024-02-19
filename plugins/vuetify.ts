import { createVuetify,type ThemeDefinition } from "vuetify";

import 'vuetify/styles';

import { aliases, mdi } from 'vuetify/iconsets/mdi'

// import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'
// import es from 'date-fns/esm/locale/es'
// import enUS from "date-fns/locale/en-US";
// import { en } from "vuetify/locale";

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const myCustomDARKTheme: ThemeDefinition = {
    dark: true,
    colors: {
        colorLink:"#CAF1FF",
        background: "#15202b",
        surface: "#12212F",
        primary: "#3f51b5",
        secondary: "#03dac6",
        error: "#f44336",
        info: "#2196F3",
        success: "#4caf50",
        warning: "#fb8c00",
    },
  }

const customLightTheme = {
    dark: false,
    colors: {
        colorLink:"#003EFF",
        background: "#eee",
        surface: "#FFFFFF",
        primary: "#3f51b5",
        secondary: "#00ccff",
        error: "#f44336",
        success: "#138000",
        info: "#1456F3",
    },
};

export default defineNuxtPlugin(nuxtApp=>{
    const vuetify = createVuetify({
        icons:{
            defaultSet:'mdi',
            aliases,
            sets:{
                mdi,
            },
        },
        // date:{
        //     adapter: DateFnsAdapter,
        //     locale:{
        //         es:en,
        //         en:enUS,
        //     }
        // },
        // locale:{
        //     locale:"es",
        //     fallback:"es"
        // },
        components,
        directives,
        ssr: false,
        theme:{
            defaultTheme: 'myCustomDARKTheme',
            variations:{
                colors:['primary','secondary'],
                lighten:4,
                darken:5
            },
            themes:{
                myCustomDARKTheme,
                customLightTheme
            }
        }
    })

    nuxtApp.vueApp.use(vuetify)
})