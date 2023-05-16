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
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Magmortar') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Magmortar"],
		isNonstandard: null,
	},
	electirizer: {
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
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Rhyperior') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Rhyperior"],
		isNonstandard: null,
	},
	dousedrive: {
		"inherit": true,
		isNonstandard: null,
	},
	shockdrive: {
		"inherit": true,
		isNonstandard: null,
	},
	burndrive: {
		"inherit": true,
		isNonstandard: null,
	},
	chilldrive: {
		"inherit": true,
		isNonstandard: null,
	},
	dubiousdisc: {
		"inherit": true,
		isNonstandard: null,
		onDrive: 'Ghost'
	},
	neutralizingorb: {
		name: "Neutralizing Orb",
		spritenum: 0,
		fling: {
			basePower: 30,
		},
		onStart(pokemon){
			this.add('-endability', pokemon);
			this.singleEvent('End', pokemon.getAbility(), pokemon.abilityState, pokemon, pokemon, 'neutralizingorb')
		},
		shortDesc: "Nullifies the holder's Ability.",
		num: 2000,
		gen: 9
	},
	lightball: {
		inherit: true,
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' || pokemon.baseSpecies.baseSpecies === 'Raichu') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Pikachu' || pokemon.baseSpecies.baseSpecies === 'Raichu') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Pikachu-Cosplay", "Pikachu-Rock-Star", "Pikachu-Belle", "Pikachu-Pop-Star", "Pikachu-PhD", "Pikachu-Libre", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World","Raichu"],
	}
};
