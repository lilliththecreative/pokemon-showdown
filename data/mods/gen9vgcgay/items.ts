export const Items: {[k: string]: ModdedItemData} = {
	thickclub: {
		"inherit": true,
		isNonstandard: null,
	},
	custapberry: {
		"inherit": true,
		isNonstandard: null,
	},
	enigmaberry: {
		"inherit": true,
		isNonstandard: null,
	},
	dracoplate: {
		"inherit": true,
		isNonstandard: null,
	},
	dreadplate: {
		"inherit": true,
		isNonstandard: null,
	},
	earthplate: {
		"inherit": true,
		isNonstandard: null,
	},
	fistplate: {
		"inherit": true,
		isNonstandard: null,
	},
	flameplate: {
		"inherit": true,
		isNonstandard: null,
	},
	icicleplate: {
		"inherit": true,
		isNonstandard: null,
	},
	insectplate: {
		"inherit": true,
		isNonstandard: null,
	},
	ironplate: {
		"inherit": true,
		isNonstandard: null,
	},
	meadowplate: {
		"inherit": true,
		isNonstandard: null,
	},
	mindplate: {
		"inherit": true,
		isNonstandard: null,
	},
	skyplate: {
		"inherit": true,
		isNonstandard: null,
	},
	splashplate: {
		"inherit": true,
		isNonstandard: null,
	},
	spookyplate: {
		"inherit": true,
		isNonstandard: null,
	},
	stoneplate: {
		"inherit": true,
		isNonstandard: null,
	},
	toxicplate: {
		"inherit": true,
		isNonstandard: null,
	},
	zapplate: {
		"inherit": true,
		isNonstandard: null,
	},
	pixieplate: {
		"inherit": true,
		isNonstandard: null,
	},
	magmarizer: {
		"inherit": true,
		onModifyAtkPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Magmortar') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Magmortar"],
		isNonstandard: null,
	},
	electrizer: {
		"inherit": true,
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Electivire') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Electivire"],
		isNonstandard: null,
	},
	protector: {
		"inherit": true,
		onModifyAtkPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Rhyperior') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Rhyperior"],
		isNonstandard: null,
	},
};
