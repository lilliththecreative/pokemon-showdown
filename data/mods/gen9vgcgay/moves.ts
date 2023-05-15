export const Moves: {[k: string]: ModdedMoveData} = {
	ominouswind: {
		inherit: true,
		"isNonstandard": null,
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva)",
		secondary: {
			chance: 20,
			self: {
				boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
			},
		},
	},
	ancientpower: {
		inherit: true,
		"isNonstandard": null,
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva)",
		secondary: {
			chance: 20,
			self: {
				boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
			},
		},
	},
	"silverwind": {
		"inherit": true,
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva)",
		secondary: {
			chance: 20,
			self: {
				boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
			},
		},
		"isNonstandard": null,
	},
	ragefist: {
		inherit: true,
		basePowerCallback(pokemon) {
			return Math.min(1000, 50 + 50 * pokemon.timesAttacked);
		},
	},
	"barrage": {
		"inherit": true,
		"accuracy": 100,
		"basePower": 25,
		"category": "Physical",
		"type": "Psychic",
		"isNonstandard": null,
	},
	"swagger": {
		inherit: true,
		"accuracy": 100,
	},
	"falseswipe": {
		inherit: true,
		"basePower": 180,
	},
	"razorwind": {
		inherit: true,
		"basePower": 150,
	},
	"mistyexplosion": {
		inherit: true,
		"basePower": 150,
	},
	"explosion": {
		inherit: true,
		"basePower": 350,
		recoil: [1,2],
	},
	"crabhammer": {
		"inherit": true,
		shortDesc: "High Crit Ratio, 30% chance to lower target's speed by 1",
		secondary: {
			chance: 30,
			boosts: {spe: -1},
		},
	},
	payback: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			if (this.queue.willMove(target)) {
				return 50;
			}
			this.debug('BP doubled');
			return 100;
		},
	},
	gunkshot: {
		inherit: true,
		accuracy: 85,
	},
};
