import { defineStore } from "pinia";
import PocketBase from "pocketbase";
import type { GetProyectorDTO } from "./interfaces";
import { obtenerFechaHoraActual } from "~/assets/funciones_reuzables/times";

export const useProyectorStore = defineStore("useProyectorStore", {
	state: () => ({
		count_reload: 0,

		pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

		getProyectorDto: [] as GetProyectorDTO[],

		formProyector: {
			fecha_entrada: "",
			fecha_salida: obtenerFechaHoraActual() as string,
			departamento: "" as string | null | undefined,
			responsable: "",
			tlf: null as string | null | number,
			descripsion: "",
		},

		// false si no se encuentra en la oficna y true si lo esta
		ubicacionOficina: false,
	}),
	getters: {
		UbicacionActualProyector(): GetProyectorDTO | null {
			const ultimo =
				this.getProyectorDto.length > 0 ? this.getProyectorDto[0] : null;
			if (!ultimo) return null;

			if (ultimo.fecha_entrada === "") {
				this.ubicacionOficina = false;
			} else {
				this.ubicacionOficina = true;
			}

			return ultimo;
		},
	},

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

				this.getProyectorDto = records;

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

		async creaReporteProyector(): Promise<void> {
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

				this.count_reload++;
			} catch (error) {
				useNuxtApp().$toast.update(toastId, {
					render: "Error al crear",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			}
		},

		async eliminarReporte(id: number) {
			const confirma = confirm("Eliminar ?");
			if (!confirma) return;

			const toastId = useNuxtApp().$toast.loading("Eliminando");
			try {
				await this.pb.collection("reportes_proyector").delete(`${id}`);
				useNuxtApp().$toast.update(toastId, {
					render: "Eliminado!",
					type: "info",
					isLoading: false,
					autoClose: 5000,
				});

				this.count_reload++;
			} catch (error) {
				useNuxtApp().$toast.update(toastId, {
					render: "Error!",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			}
		},

		async editarReporte(id: number) {
			const toastId = useNuxtApp().$toast.loading("Editando!...");
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
					.update(`${id}`, data);

				useNuxtApp().$toast.update(toastId, {
					render: "Editado!",
					type: "success",
					isLoading: false,
					autoClose: 5000,
				});
				this.count_reload++;
			} catch (error) {
				useNuxtApp().$toast.update(toastId, {
					render: "Error!",
					type: "error",
					isLoading: false,
					autoClose: 5000,
				});
			}
		},
	},
});
