import { defineStore } from "pinia";
import PocketBase from 'pocketbase'



export const useIPListaStore = defineStore('useIPListaStore', {
    state: () => ({
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
        ]
    }),


    getters:{

    },


  actions:{


   
    },
    
})
