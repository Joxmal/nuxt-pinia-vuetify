import { defineStore } from "pinia";
import PocketBase from "pocketbase";
import type { GetProyectorDTO } from "./interfaces";
import { obtenerFechaHoraActual } from "~/assets/funciones_reuzables/times";

export const useProyectorStore = defineStore("useProyectorStore", {
	state: () => ({
		pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

		getProctorDto: [] as GetProyectorDTO[],

		formProyector: {
			fecha_entrada: "",
			fecha_salida: obtenerFechaHoraActual() as string,
			departamento: "",
			responsable: "",
			tlf: null as string | null | number,
			descripsion: "",
		},
	}),
	getters: {},

	actions: {
		async obtenerAsistencias() {
			const toastId = useNuxtApp().$toast.loading("Cargando");

			try {
				const records = await this.pb
					.collection("reportes_proyector")
					.getFullList<GetProyectorDTO>({
						sort: "-fecha_entrada",
						perPage: 20000,
					});

				useNuxtApp().$toast.remove(toastId);
			} catch (error) {
				useNuxtApp().$toast.update(toastId, {
					render: "Error al crear",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			}
		},

		async crearAsistencia(): Promise<void> {
			const toastId = useNuxtApp().$toast.loading("Cargando");

			const data = { ...this.formProyector };

			// Convertir fecha_salida a formato ISO
			data.fecha_salida = new Date(data.fecha_salida || "").toISOString();

			// Verificar y convertir fecha_entrada
			const fechaEntrada: Date = new Date(data.fecha_entrada || "");
			data.fecha_entrada = isNaN(fechaEntrada.getTime())
				? ""
				: fechaEntrada.toISOString();

			try {
				const record = await this.pb
					.collection("reportes_proyector")
					.create(data);

				useNuxtApp().$toast.update(toastId, {
					render: "Creación exitosa!",
					type: "success",
					isLoading: false,
					autoClose: 5000,
				});
			} catch (error) {
				useNuxtApp().$toast.update(toastId, {
					render: "Error al crear",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			}
		},
	},
});
