import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useIPListaStore = defineStore('useIPListaStore', {
    state: () => ({
        pb_url: useRuntimeConfig().public.POCKETBASE_URL,
        
        //tabla de datos
        listaIPObtenida: '',
        mapeoLista:'mapeo',
        activarTabla: false,
        iconCreated:false,

        listaDepartamento : [
            "ADMINISTRACION",
            "ASUNTOS SOCIALES",
            "ATENCION AL CIUDADANO",
            "AUDITORIA INTERNA",
            "BIENES",
            "CATASTRO",
            "CATASTRO ARCHIVOS",
            "CATASTRO AVALUO",
            "CATASTRO AREA TECNICA",
            "CATASTRO GEOMATICA",
            "CATASTRO REVISION",
            "CATASTRO TAQUILLA",
            "CLAP",
            "CONSULTORIA JURIDICA",
            "CONTRATACIONES",
            "CULTURA",
            "DEPARTAMENTO DE DESARROLLO ECONOMICO",
            "DEPARTAMENTO DE DESARROLLO URBANO",
            "DEPARTAMENTO DE PLANIFICACION",
            "DESPACHO",
            "DGGATISPM",
            "DIRECCION GENERAL",
            "DISCAPACIDAD",
            "EDUCACION",
            "EVENTOS",
            "FOTOCOPIADORA",
            "INFORMATICA",
            "INADEMAR",
            "PRESUPUESTO",
            "REGISTRO CIVIL",
            "RECURSOS HUMANOS",
            "SALA SITUACIONAL",
            "SECRETARIA DE JUVENTUD",
            "SERVICIO GENERAL",
            "SINDICATURA",
            "SUMINISTRO",
            "TESORERIA",
            "TRIBUTOS",
            "TRIBUTOS TAQUILLA",
            "TURISMO",
            "VIVIENDA",
            "ZETA"
        ],
    }),


    getters:{

    },


  actions:{
    async obtenerListaDatos(){
        const pb = new PocketBase(this.pb_url)
        const records = await pb.collection('ip_asignadas').getFullList({
            sort: '-created',
        });
        this.mapeoLista = records.map(item=>{
            return{
                ip: item.IP,
                usuario: item.usuario,
                departamento: item.departamento,
                creado: item.created.split(' ')[0],
                cedula: item.cedula,
                id: item.id
            } 
        })
        this.listaIPObtenida = records
        this.activarTabla = true
    },

    async crearListaDatos(data){
        const pb = new PocketBase(this.pb_url)
        await pb.collection('ip_asignadas').create(data);

        this.obtenerListaDatos()
        
        this.iconCreated= true
        setTimeout(() => {
        this.iconCreated= false
        }, 2000);

    },

    async updateListaDatos(id,data){
        const pb = new PocketBase(this.pb_url)
        await pb.collection('ip_asignadas').update(id, data);
        this.obtenerListaDatos()
    },

    async deleteListaDatos(id){
        const pb = new PocketBase(this.pb_url)
        await pb.collection('ip_asignadas').delete(id);
        this.obtenerListaDatos()
    }
    },
    
})
