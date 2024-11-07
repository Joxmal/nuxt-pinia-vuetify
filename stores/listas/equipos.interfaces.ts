export interface GetTagDto {
	collectionId: string;
	collectionName: string;
	created: Date;
	id: string;
	tag_name: string;
	updated: Date;
}

//--------
// formComponentes

export interface GetListModelosDto {
	collectionId: string;
	collectionName: string;
	componentes: EquiposFormComponentesComponentes[];
	created: Date;
	id: string;
	nombre_tipo: string;
	updated: Date;
}

export interface EquiposFormComponentesComponentes {
	nombre: string;
	valor: string | null | number;
	tipo: string;
}
