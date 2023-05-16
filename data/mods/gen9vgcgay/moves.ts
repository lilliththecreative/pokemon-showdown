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
	triattack: {
		inherit: true,
		basePower: 30,
		multihit: 3,
		shortDesc:"Attacks 3 times, 20% chance to burn/para/freeze"
	},
	smartstrike: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1}
	},
	slash: {
		inherit: true,
		basePower: 60,
		shortDesc:"Always crits",
		willCrit: true
	},
	echoedvoice: {
		num: 497,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Echoed Voice",
		shortDesc:"Raises Special Attack by 1",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Beautiful"
	},
	chargebeam: {
		inherit: true,
		accuracy: 100,
		shortDesc:"Raises Special Attack by 1",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		}
	},
	eggbomb: {
		inherit: true,
		accuracy: 100,
		type: "Fire"
	},
	healorder: {
		inherit: true,
		shortDesc:"Heals the user by 100% of its max HP",
		heal: [1, 1]
	},
	milkdrink: {
		inherit: true,
		shortDesc:"Heals the user by 100% of its max HP",
		heal: [1, 1]
	}
};
