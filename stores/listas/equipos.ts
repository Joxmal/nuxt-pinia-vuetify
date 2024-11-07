import { defineStore } from "pinia";
import PocketBase from "pocketbase";
import { obtenerFechaHoraActual } from "~/assets/funciones_reuzables/times";
import type {
	EquiposFormComponentesComponentes,
	GetListModelosDto,
	GetTagDto,
} from "./equipos.interfaces";

export const useEquiposStore = defineStore("useEquiposStore", {
	state: () => ({
		count_reload: 0,

		pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

		getTagsDto: [] as GetTagDto[],

		formProyector: {},

		formtTag: {
			tag_name: "",
		},

		//modelos

		getListModelosDto: [] as GetListModelosDto[],

		formComponentes_modelos: {
			nombre_tipo: "",
			componentes: [] as EquiposFormComponentesComponentes[],
		},

		// false si no se encuentra en la oficna y true si lo esta
		ubicacionOficina: false,
	}),
	getters: {},
	actions: {
		async obtenerTags() {
			try {
				const records = await this.pb
					.collection("equipos_tags")
					.getFullList<GetTagDto>({
						sort: "-created",
						perPage: 20000,
					});

				this.getTagsDto = records;
			} catch (error) {
				const toastId = useNuxtApp().$toast.error("Error al obtener los tags");
			}
		},

		async crearTag() {
			const data = { ...this.formtTag };
			try {
				await this.pb.collection("equipos_tags").create(data);
				this.count_reload++;
				useNuxtApp().$toast.success("Tag creado");
			} catch (error: any) {
				if (error?.data.data.tag_name.code === "validation_not_unique") {
					useNuxtApp().$toast.error("Ya existe ese tag");
				} else {
					useNuxtApp().$toast.error("Error");
				}
			}
		},

		async eliminarTags(item: GetTagDto) {
			const confirma = confirm(`quieres eliminar el tag ${item.tag_name}`);
			if (!confirma) return;
			try {
				await this.pb.collection("equipos_tags").delete(item.id);
				this.count_reload++;
				const toastId = useNuxtApp().$toast.error("tag elimnado");
			} catch (error) {
				const toastId = useNuxtApp().$toast.error("Error al eliminar");
			}
		},

		//modelos
		async obtenerModelos() {
			try {
				const records = await this.pb
					.collection("equipos_componentes_modelos")
					.getFullList<GetListModelosDto>({
						perPage: 1000,
						sort: "-created",
					});
				this.getListModelosDto = records;
				console.log(this.getListModelosDto);
			} catch (error) {}
		},

		async crearModelo() {
			try {
				const data = { ...this.formComponentes_modelos };

				if (data.nombre_tipo.length === 0) {
					useNuxtApp().$toast.error("complete los campos");
					return;
				}

				const record = await this.pb
					.collection("equipos_componentes_modelos")
					.create(data);
				console.log(record);
				this.count_reload++;
			} catch (error) {
				console.error(error);
			}
		},

		async eliminarModelo(id: string) {
			const confirma = confirm("Eliminar?");
			if (!confirma) return;
			try {
				const record = await this.pb
					.collection("equipos_componentes_modelos")
					.delete(id);
				this.count_reload++;
			} catch (error) {
				console.error(error);
			}
		},

		async editarModelo(id: string) {
			const data = { ...this.formComponentes_modelos };

			useNuxtApp().$toast.success("Editado");

			try {
				const record = await this.pb
					.collection("equipos_componentes_modelos")
					.update(id, data);
			} catch (error) {}
		},
	},
});
