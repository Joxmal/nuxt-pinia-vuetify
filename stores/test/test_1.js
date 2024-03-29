import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useTest1Store = defineStore('useTest1Store', {
    state: () => ({
        pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),
        
        form:{
            "departamento": "",
            "razon": "",
        },


        cargando:false,
        envioExitoso:false,
        eliminarExitoso:false,
        editarExitoso:false,
        ocurrioUnError:false,

    }),

    // fecha_entrada >= "2024-02-21" && fecha_entrada <= "2024-02-22"
    getters:{


    },

    actions:{
        notificacion(propiedad){
            this[propiedad] = true
            setTimeout(() => {
                this[propiedad] = false
            }, 3000);
        },

        async enviarArchivo({archivo}){
            this.cargando = true

            const form = {...this.form}
            form.documento = archivo
            console.log(this.pb)
            console.log(form)
            console.log(useRuntimeConfig().public.POCKETBASE_URL)

            this.cargando = false
            this.notificacion("envioExitoso")

            try {
                const record = await this.pb.collection('archivo').create(form);
                console.log(record)
            } catch (error) {
                this.cargando = false
                this.notificacion("ocurrioUnError")

                console.error(error)
                console.error(error.response)
            }
        },

        async verArchivos(){
            try {
                this.cargando = true
                const records = await this.pb.collection('archivo').getFullList({
                    sort: '-created',
                });
                console.log(records)
                
                //obtener token de seguridad
                const token = await this.pb.files.getToken();
                console.log(token)


                const ulrArchivos = []


                records.forEach((archivo,index)=>{
                    const firstFilename = archivo.documento;
                    const url = this.pb.files.getUrl(archivo,firstFilename,{token})
                    ulrArchivos.push(url+"?download=1")
                    archivo.documento =  url
                })
                this.cargando = false

                console.log(records)
                return records
            } catch (error) {
                this.cargando = false
                this.notificacion("ocurrioUnError")
                console.error(error)
            }

        }

    },
    
})
