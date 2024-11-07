const rule_test = [
	(value: any) => {
		return (
			!value ||
			!value.length ||
			value[0].size < 2000000 ||
			"Debe pegar menos de 2MB"
		);
	},
];

export const rule_not_empy = [
	(value: any) => {
		if (value) return true;
		return "Complete el campo";
	},
];
