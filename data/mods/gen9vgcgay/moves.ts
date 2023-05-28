export const Moves: {[k: string]: ModdedMoveData} = {
	ominouswind: {
		inherit: true,
		"isNonstandard": null,
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva).",
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
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva).",
		secondary: {
			chance: 20,
			self: {
				boosts: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
			},
		},
	},
	"silverwind": {
		"inherit": true,
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva).",
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
		shortDesc: "+50 power for each time user was hit. Max: 1000bp",
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
	"cometpunch": {
		"inherit": true,
		"accuracy": 100,
		"basePower": 25,
		"category": "Physical",
		"type": "Fairy",
		"isNonstandard": null,
	},
	"spikecannon": {
		"inherit": true,
		"accuracy": 100,
		"basePower": 25,
		"category": "Physical",
		"type": "Steel",
		"isNonstandard": null,
	},
	"furyattack": {
		"inherit": true,
		"accuracy": 100,
		"basePower": 25,
		"category": "Physical",
		"type": "Flying",
		"isNonstandard": null,
	},
	"flameburst": {
		"inherit": true,
		"accuracy": 100,
		"basePower": 25,
		"category": "Special",
		"type": "Fire",
		"isNonstandard": null,
	},
	rockblast: {
		"inherit": true,
		"accuracy": 95,
	},
	armthrust: {
		"inherit": true,
		basePower: 25
	},
	"swagger": {
		inherit: true,
		"accuracy": 100,
		isNonstandard: null
	},
	"falseswipe": {
		inherit: true,
		"basePower": 180,
		isNonstandard: null
	},
	"razorwind": {
		inherit: true,
		"basePower": 150,
		isNonstandard: null
	},
	"mistyexplosion": {
		inherit: true,
		"basePower": 150,
		isNonstandard: null
	},
	"explosion": {
		inherit: true,
		"basePower": 350
	},
	"crabhammer": {
		"inherit": true,
		shortDesc: "High Crit Ratio, 30% chance to lower speed by 1.",
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
		shortDesc:"Attacks 3 times, 10% chance to burn/para/freeze each.",
		secondary: {
			chance: 10,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('fst', source);
				}
			},
		},
	},
	smartstrike: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		isNonstandard: null
	},
	slash: {
		inherit: true,
		basePower: 60,
		shortDesc:"Always crits.",
		willCrit: true
	},
	echoedvoice: {
		inherit: true,
		shortDesc:"Raises Special Attack by 1.",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
	},
	chargebeam: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		shortDesc:"Raises Special Attack by 1.",
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
		type: "Fire",
		isNonstandard: null
	},
	healorder: {
		inherit: true,
		shortDesc:"Heals the user by 100% of its max HP.",
		heal: [1, 1],
		isNonstandard: null
	},
	milkdrink: {
		inherit: true,
		shortDesc:"Heals the user by 100% of its max HP.",
		heal: [1, 1],
		isNonstandard: null
	},
	conversion: {
		inherit: true,
		isNonstandard: null,
		shortDesc:"Charges, changes user's type to match its first move and boosts all stats turn 2.",
		boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
		flags: {charge: 1, nonsky: 1, nosleeptalk: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		}
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
		basePower: 50,
		multihit: 2,
	},
	diamondstorm: {
		inherit: true,
		isNonstandard: null,
		shortDesc:"Hits both in sandstorm, 50% raise defense by 1",
		target: "normal",
		onModifyMove(move, source, target) {
			if (this.field.isWeather('sandstorm')) {
				move.target = 'allAdjacentFoes';
			}
		},
		self: {
			chance: 50,
			boosts: {
				def: 1,
			},
		},
	},
	doubleshock: {
		inherit: true,
		basePower: 130
	},
	spiritshackle: {
		inherit: true,
		basePower: 100,
	},
	megapunch: {
		inherit: true,
		basePower: 90,
		accuracy: 100
	},
	megakick: {
		inherit: true,
		basePower: 130,
	},
	present: {
		inherit: true,
		shortDesc: "100, 130, 160 power, if target ally, heals 50% instead",
		accuracy: 100,
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onHit(target, source) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					this.add('-immune', target);
					return this.NOT_FAIL;
				}
			}
		},
		onModifyMove(move, pokemon, target) {
			const rand = this.random(3);
			if (rand < 1) {
				move.basePower = 100;
			} else if (rand < 2) {
				move.basePower = 130;
			} else {
				move.basePower = 160;
			}
		},
	},
	wildcharge: {
		inherit: true,
		basePower: 100,
	},
	revelationdance: {
		inherit: true,
		basePower: 100,
	},
	doublekick: {
		inherit: true,
		basePower: 40,
	},
	shadowpunch: {
		inherit: true,
		basePower: 80
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
		basePower: 90,
		type: "Steel",
	},
	tailwind: {
		inherit: true,
		shortDesc: "1.5x speed for your side for 4 turns",
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Tailwind');
					return 6;
				}
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
	// Freeze -> Frostbite
	blizzard: {
		inherit: true,
		secondary: { chance: 20, status: 'fst'},
	},
	icebeam: {
		inherit: true,
		secondary: { chance: 10, status: 'fst'},
	},
	freezedry: {
		inherit: true,
		secondary: { chance: 10, status: 'fst'},
	},
	freezingglare: {
		inherit: true,
		secondary: { chance: 10, status: 'fst'},
	},
	icepunch: {
		inherit: true,
		secondary: { chance: 10, status: 'fst'},
	},
	icefang: {
		inherit: true,
		secondaries: [
			{ chance: 10, status: 'fst'},
			{ chance: 10, volatileStatus: 'flinch'},
		],
	},
	// Making Standard
	technoblast: {
		inherit: true,
		isNonstandard: null
	},
	infernalparade: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
		inherit: true,
		isNonstandard: null,
	},
	purifyingwater: {
		inherit: true,
		isNonstandard: null,
	},
	divinesmite: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	dualchop: {
		inherit: true,
		isNonstandard: null,
	},
	tailglow: {
		inherit: true,
		isNonstandard: null,
	},
	aeroblast: {
		inherit: true,
		isNonstandard: null,
	},
	anchorshot: {
		inherit: true,
		isNonstandard: null,
	},
	aurawheel: {
		inherit: true,
		isNonstandard: null,
	},
	poweruppunch: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
	},
};
