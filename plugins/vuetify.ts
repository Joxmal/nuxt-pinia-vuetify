import { createVuetify } from "vuetify";

// import DateFnsAdapter from '@date-io/date-fns'
// import enUS from 'date-fns/locale/en-US'
// import es from 'date-fns/esm/locale/es'
// import enUS from "date-fns/locale/en-US";
// import { en } from "vuetify/locale";

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export default defineNuxtPlugin(nuxtApp=>{
    const vuetify = createVuetify({
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
        ssr: true,
        theme:{
            defaultTheme: 'dark'
        }
    })

    nuxtApp.vueApp.use(vuetify)
})