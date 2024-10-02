import { defineStore } from "pinia";
import PocketBase from "pocketbase";
import type { GetOperativoDto } from "./interfaces";

export const useOperativosEspecialesImagesStore = defineStore(
	"useOperativosEspecialesImagesStore",
	{
		state: () => ({
			pb: new PocketBase(useRuntimeConfig().public.POCKETBASE_URL),

			listOperativos: [] as GetOperativoDto[],

			form: {
				departamento: "",
				razon: "",
			},
		}),
		getters: {},

		actions: {
			async obtenerOperativos() {
				const records = await this.pb
					.collection("operativos_especiales")
					.getFullList<GetOperativoDto>({
						sort: "-fecha",
					});

				records.forEach((record, i) => {
					record.imagenes = record.imagenes.map((imagen) =>
						this.pb.files.getUrl(records[i], imagen)
					);
				});
				console.log(records);

				this.listOperativos = records;
			},
		},
	}
);
