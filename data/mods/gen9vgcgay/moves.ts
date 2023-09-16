export const Moves: {[k: string]: ModdedMoveData} = {
	struggle: {
		inherit: true,
		basePower: 90,
	},
	// Sleep Nerf
	spore: {
		inherit: true,
		pp: 5,
		shortDesc: "Puts target to sleep. Fails if priority",
		onTryMove(attacker, defender, move) {
			if (move.pranksterBoosted) {
				this.add('-fail', attacker, 'move: Spore');
				return null;
			}
		},
	},
	hypnosis: {
		inherit: true,
		pp: 5,
	},
	sleeppowder: {
		inherit: true,
		pp: 5,
	},
	sing: {
		inherit: true,
		accuracy: 60,
		pp: 5,
	},
	// Sleeping Moves
	snore: {
		inherit: true,
		basePower: 110,
		category: 'Physical',
	},
	dreameater: {
		inherit: true,
		shortDesc: "User or Target must be sleeping. Heal 50%.",
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') ||
					source.status === 'slp' || source.hasAbility('comatose');
		},
	},
	// Genie moves
	bleakwindstorm: {
		inherit: true,
		basePower: 95,
		accuracy: 85,
		shortDesc: "30% to lower foe(s) Speed by 1. Hail: can't miss.",
		onModifyMove(move, pokemon, target) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
	},
	sandsearstorm: {
		inherit: true,
		basePower: 95,
		accuracy: 85,
		shortDesc: "20% chance to burn foe(s). Sand: can't miss.",
		onModifyMove(move, pokemon, target) {
			if (this.field.isWeather('sandstorm')) move.accuracy = true;
		},
	},
	springtidestorm: {
		inherit: true,
		basePower: 95,
		accuracy: 85,
		shortDesc: "20% to lower foe(s) Atk by 1. Sun: can't miss.",
		onModifyMove(move, pokemon, target) {
			if (target && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) move.accuracy = true;
		},
	},
	wildboltstorm: {
		inherit: true,
		basePower: 95,
		accuracy: 85,
	},
	// Omniboost moves
	ominouswind: {
		inherit: true,
		"isNonstandard": null,
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva).",
		secondary: {
			chance: 20,
			self: {
				boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
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
				boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
			},
		},
	},
	"silverwind": {
		"inherit": true,
		shortDesc: "20% chance to raise all stats by 1 (not acc/eva).",
		secondary: {
			chance: 20,
			self: {
				boosts: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
			},
		},
		"isNonstandard": null,
	},
	// Multi Hits
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
		multihit: [2, 5],
		"category": "Physical",
		"type": "Steel",
		"isNonstandard": null,
	},
	"furyattack": {
		"inherit": true,
		"accuracy": 100,
		"basePower": 25,
		multihit: [2, 5],
		"category": "Physical",
		"type": "Flying",
		"isNonstandard": null,
	},
	furyswipes: {
		"inherit": true,
		"accuracy": 100,
		"basePower": 25,
	},
	pinmissile: {
		"inherit": true,
		"accuracy": 100,
	},
	tailslap: {
		"inherit": true,
		"accuracy": 100,
		shortDesc: "Hits 3-5 Times",
		multihit: [3, 5],
	},
	"flameburst": {
		"inherit": true,
		"accuracy": 100,
		multihit: [2, 5],
		shortDesc: "Hits 2-5 Times, does 1/16 each to other enemy.",
		"basePower": 20,
		"category": "Special",
		"type": "Fire",
		"isNonstandard": null,
	},
	rockblast: {
		inherit: true,
		accuracy: 95,
	},
	armthrust: {
		inherit: true,
		basePower: 25
	},
	clamp: {
		inherit: true,
		isNonstandard: null,
		basePower: 25,
		accuracy: 100,
		volatileStatus: undefined,
		multihit: [2, 5],
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	"swagger": {
		inherit: true,
		"accuracy": 95,
		isNonstandard: null
	},
	"falseswipe": {
		inherit: true,
		"basePower": 140,
		isNonstandard: null
	},
	// Multi Turn
	"razorwind": {
		inherit: true,
		"basePower": 150,
		isNonstandard: null
	},
	"fly": {
		inherit: true,
		isNonstandard: null,
		basePower: 100,
		accuracy: 100,
	},
	"dig": {
		inherit: true,
		isNonstandard: null,
		basePower: 100,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['earthquake', 'magnitude'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
			onResidual(pokemon) {
				if (pokemon.ability === 'eartheater') {
					this.heal(pokemon.baseMaxhp / 4);
				}
			},
		},
	},
	futuresight: {
		inherit: true,
		isNonstandard: null,
		basePower: 150,
	},
	doomdesire: {
		inherit: true,
		isNonstandard: null,
		basePower: 150,
	},
	// Explosions
	"mistyexplosion": {
		inherit: true,
		"basePower": 150,
		isNonstandard: null
	},
	"explosion": {
		inherit: true,
		"basePower": 350
	},
	"selfdestruct": {
		inherit: true,
		"basePower": 275
	},
	// Regular Moves
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
	zenheadbutt: {
		inherit: true,
		accuracy: 95,
	},
	visegrip: {
		inherit: true,
		basePower: 80,
		shortDesc: "Does 2x damage if it crits.",
		onBasePower(basePower, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				return this.chainModify(2);
			}
		},
	},
	holdhands: {
		inherit: true,
		boosts: {atk: 1, spa: 1},
		shortDesc: "Inspire each other, boosting both Pokemon Atk/SpA by 1.",
		onHit(target, source, move) {
			this.boost({atk: 1, spa: 1}, target, source, move, false, true);
			this.boost({atk: 1, spa: 1}, source, source, move, false, true);
		},
	},
	grassyglide: {
		inherit: true,
		basePower: 60,
	},
	gastroacid: {
		inherit: true,
		target: "allAdjacent",
		shortDesc: "Nullifies the ability of all other pokemon.",
	},
	lick: {
		inherit: true,
		shortDesc: "50% chance to paralyze the target.",
		secondary: {chance: 50, status: 'par'},
	},
	growth: {
		inherit: true,
		shortDesc: "User's Atk and SpA +1; +2 in Sun/Grassy Terrain.",
		onModifyMove(move, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) ||
				this.field.isTerrain('grassyterrain') && pokemon.isGrounded()) {
				move.boosts = {atk: 2, spa: 2};
			}
		},
	},
	acupressure: {
		inherit: true,
		shortDesc: "Raises a non-acc random stat of the user/ally by 2.",
		onHit(target) {
			const stats: BoostID[] = [];
			let stat: BoostID;
			for (stat in target.boosts) {
				if (stat === 'accuracy' || stat === 'evasion') continue;
				if (target.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = 2;
				this.boost(boost);
			} else {
				return false;
			}
		},
	},
	screech: {
		inherit: true,
		accuracy: 100,
	},
	metalsound: {
		inherit: true,
		accuracy: 100,
	},
	rage: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "+25 power for each time user was hit. Max: 1000bp",
		basePower: 25,
		basePowerCallback(pokemon) {
			return Math.min(1000, 25 + 25 * pokemon.timesAttacked);
		},
		self: {},
	},
	punishment: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "60 power +20 for each of target's boosts, Max: 300BP.",
		basePowerCallback(pokemon, target) {
			let power = 60 + 20 * target.positiveBoosts();
			if (power > 300) power = 300;
			this.debug('BP: ' + power);
			return power;
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
		shortDesc: "Attacks 3 times, 10% chance to burn/para/freeze each.",
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
		shortDesc: "Always crits.",
		willCrit: true
	},
	echoedvoice: {
		inherit: true,
		shortDesc: "Raises Special Attack by 1.",
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
		shortDesc: "Raises Special Attack by 1.",
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
	aurorabeam: {
		inherit: true,
		basePower: 80,
	},
	powder: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "If using a Fire move, target loses 1/2 max HP.",
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Powder');
			},
			onTryMovePriority: -1,
			onTryMove(pokemon, target, move) {
				if (move.type === 'Fire') {
					this.add('-activate', pokemon, 'move: Powder');
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 2), 1));
					this.attrLastMove('[still]');
					return false;
				}
			},
		},
	},
	spark: {
		inherit: true,
		basePower: 70,
	},
	poisontail: {
		inherit: true,
		target: "allAdjacentFoes",
		shortDesc: "Hits both foes, High Crit Rate, 10% to poison.",
		basePower: 75,
	},
	feint: {
		inherit: true,
		basePower: 40
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
	twineedle: {
		inherit: true,
		isNonstandard: null,
		basePower: 45,
	},
	wildcharge: {
		inherit: true,
		basePower: 100,
	},
	belch: {
		inherit: true,
		basePower: 130,
		accuracy: 100,
	},
	moonblast: {
		inherit: true,
		isNonstandard: null,
		basePower: 90,
	},
	aircutter: {
		inherit: true,
		isNonstandard: null,
		basePower: 70,
	},
	doublekick: {
		inherit: true,
		basePower: 35,
	},
	shadowpunch: {
		inherit: true,
		basePower: 75,
	},
	steelwing: {
		inherit: true,
		isNonstandard: null,
		basePower: 75,
		accuracy: 95
	},
	rollingkick: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "100% chance to lower speed by 1.",
		basePower: 70,
		accuracy: 100,
		secondary: {chance: 100, boosts: {spe: -1}},
	},
	frostbreath: {
		inherit: true,
		isNonstandard: null,
		basePower: 55,
		accuracy: 100
	},
	skyuppercut: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Super effective on Flying. Hits Flying Enemies.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		basePower: 70,
		accuracy: 100,
	},
	dragonrush: {
		inherit: true,
		accuracy: 80,
	},
	snatch: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "User steals certain support moves for it and allies to use.",
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'Snatch');
			},
			onAnyPrepareHitPriority: -1,
			onAnyPrepareHit(source, target, move) {
				const snatchUser = this.effectState.source;
				if (snatchUser.isSkyDropped()) return;
				if (!move || move.isZ || move.isMax || !move.flags['snatch'] || move.sourceEffect === 'snatch') {
					return;
				}
				snatchUser.removeVolatile('snatch');
				this.add('-activate', snatchUser, 'move: Snatch', '[of] ' + source);
				this.actions.useMove(move.id, snatchUser);
				for (const ally of (snatchUser as Pokemon).adjacentAllies()) {
					this.actions.useMove(move.id, ally);
				}
				return null;
			},
		},
	},
	// Fang Buff
	hyperfang: {
		inherit: true,
		isNonstandard: null,
		basePower: 90,
		accuracy: 100,
	},
	firefang: {
		inherit: true,
		basePower: 75
	},
	thunderfang: {
		inherit: true,
		basePower: 75
	},
	icefang: {
		inherit: true,
		basePower: 75,
		shortDesc: "10% chance to frostbite. 10% to flinch.",
		secondaries: [
			{chance: 10, status: 'fst'},
			{chance: 10, volatileStatus: 'flinch'},
		],
	},
	// Near Signaure Moves
	wringout: {
		inherit: true,
		isNonstandard: null,
		category: "Physical",
		shortDesc: "More power the more %HP target has, Max 141BP.",
		basePowerCallback(pokemon, target, move) {
			const hp = target.hp;
			const maxHP = target.maxhp;
			const bp = Math.floor(Math.floor((140 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
			this.debug('BP for ' + hp + '/' + maxHP + " HP: " + bp);
			return bp;
		},
	},
	stuffcheeks: {
		inherit: true,
		shortDesc: "User Eats berry, gains +1 Atk, +2 Def.",
		onHit(pokemon) {
			if (!this.boost({atk: 1, def: 2})) return null;
			pokemon.eatItem(true);
		},
	},
	needlearm: {
		inherit: true,
		isNonstandard: null,
		basePower: 80
	},
	crabhammer: {
		inherit: true,
		shortDesc: "High Crit Ratio, 30% chance to lower speed by 1.",
		secondary: {
			chance: 30,
			boosts: {spe: -1},
		},
	},
	present: {
		inherit: true,
		shortDesc: "80, 110, 140 power, if target ally, heals 50%.",
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
				move.basePower = 80;
			} else if (rand < 2) {
				move.basePower = 110;
			} else {
				move.basePower = 140;
			}
		},
	},
	furycutter: {
		inherit: true,
		accuracy: 100,
		shortDesc: "Power doubles with each hit, up to 640.",
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['furycutter'] || move.hit === 1) {
				pokemon.addVolatile('furycutter');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['furycutter'].multiplier, 1, 640);
			this.debug('BP: ' + bp);
			return bp;
		},
	},
	meditate: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Boosts Atk and SpDef by 1",
		boosts: {
			atk: 1,
			spd: 1
		},
	},
	charge: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Doubles next Electric attack and heals 33%",
		heal: [1, 3],
		boosts: null,
	},
	smellingsalts: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Power doubles if target is paralyzed, Does not Cure.",
		onHit(target) {
		},
	},
	psychoshift: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Transfers user's status to the target. Cures Ally Status.",
		onTryHit(target, source, move) {
			if (!source.status) return false;
			move.status = source.status;
		},
		self: {
			onHit(pokemon) {
				pokemon.cureStatus();
				for (const allyActive of pokemon.adjacentAllies()) {
					allyActive.cureStatus();
				}
			},
		},
	},
	// Some signature Moves
	wickedblow: {
		inherit: true,
		basePower: 69
	},
	sparklingaria: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Target is immune and cured if burned.",
		basePower: 100,
		onTryHit(target, source, move) {
			if (source.status === 'brn') {
				this.add('-immune', target, '[from] move: Sparkling Aria');
				return null;
			}
		},
	},
	surgingstrikes: {
		inherit: true,
		basePower: 23,
	},
	technoblast: {
		inherit: true,
		isNonstandard: null,
		basePower: 100,
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.onDrive) return;
			move.type = item.onDrive;
		}
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
		basePower: 125,
	},
	snipeshot: {
		inherit: true,
		shortDesc: "+2 critical hit ratio. Cannot be redirected.",
		critRatio: 3,
	},
	shelter: {
		inherit: true,
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
		boosts: {def: 1, spd: 1},
	},
	spicyextract: {
		inherit: true,
		shortDesc: "Raises target's Atk by 2 and lowers its Def by 2.",
		boosts: {atk: 3, def: -3},
	},
	mysticalpower: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
		type: "Fairy",
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
		basePower: 80,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
		basePower: 90,
		type: "Steel",
	},
	anchorshot: {
		inherit: true,
		isNonstandard: null,
		basePower: 85,
	},
	shelltrap: {
		inherit: true,
		isNonstandard: null,
		basePower: 160,
	},
	beakblast: {
		inherit: true,
		isNonstandard: null,
		basePower: 130,
	},
	zingzap: {
		inherit: true,
		isNonstandard: null,
		basePower: 90,
	},
	mountaingale: {
		inherit: true,
		shortDesc: "Hits both opponents. 20% chance to frostbite.",
		target: "allAdjacentFoes",
		isNonstandard: null,
		accuracy: 90,
		secondary: {chance: 20, status: 'fst'},
	},
	gravapple: {
		inherit: true,
		shortDesc: "Target: 100% -2 Def. During Gravity: 2x power.",
		onBasePower(basePower) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(2);
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -2,
			},
		},
	},
	appleacid: {
		inherit: true,
		shortDesc: "100% chance to lower the target's Sp. Def by 2.",
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
		basePower: 75,
	},
	healorder: {
		inherit: true,
		shortDesc: "Heals the user by 100% of its max HP.",
		pp: 5,
		heal: [1, 1],
		isNonstandard: null
	},
	milkdrink: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Heals Ally by 50% or self by 100%",
		pp: 5,
		heal: null,
		onHit(target, source) {
			let healAmt = Math.floor(target.baseMaxhp * 0.5);
			if (target === source) {
				healAmt = target.baseMaxhp;
			}
			if (!this.heal(healAmt)) {
				this.add('-immune', target);
				return this.NOT_FAIL;
			}
		},
		target: "adjacentAllyOrSelf",
	},
	originpulse: {
		inherit: true,
		basePower: 100,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Hits Twice, 20% to drop defense",
		basePower: 50,
		multihit: 2,
	},
	ragefist: {
		inherit: true,
		shortDesc: "+50 power each time user was hit. Max: 1000bp",
		basePowerCallback(pokemon) {
			return Math.min(1000, 50 + 50 * pokemon.timesAttacked);
		},
	},
	esperwing: {
		inherit: true,
		shortDesc: "100% chance to raise user Speed by 2. High crit.",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 2,
				},
			},
		},
	},
	dragondarts: {
		inherit: true,
		basePower: 55
	},
	twinbeam: {
		inherit: true,
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once.",
		basePower: 55,
		smartTarget: true,
	},
	diamondstorm: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Hits both in sandstorm, 50% raise defense by 1",
		target: "normal",
		category: "Special",
		basePower: 95,
		accuracy: 100,
		onModifyMove(move, source, target) {
			if (this.field.isWeather('sandstorm')) {
				move.target = 'allAdjacentFoes';
			}
		},
		self: {
			chance: 50,
			boosts: {def: 1},
		},
	},
	doubleshock: {
		inherit: true,
		basePower: 130
	},
	spiritshackle: {
		inherit: true,
		basePower: 95,
	},
	revelationdance: {
		inherit: true,
		basePower: 100,
	},
	volttackle: {
		inherit: true,
		basePower: 130,
	},
	tripledive: {
		inherit: true,
		isNonstandard: null,
		basePower: 80,
	},
	geargrind: {
		inherit: true,
		isNonstandard: null,
		basePower: 50,
		accuracy: 90
	},
	gearup: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Raises Atk, Sp. Atk of allies by 1.",
		onHitSide(side, source, move) {
			const targets = side.allies().filter(target => (
				!target.volatiles['maxguard'] || this.runEvent('TryHit', target, source, move)
			));
			if (!targets.length) return false;
			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({atk: 1, spa: 1}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
	},
	icehammer: {
		inherit: true,
		basePower: 110
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
		basePower: 85,
	},
	toxicthread: {
		inherit: true,
		isNonstandard: null,
		target: "allAdjacentFoes",
		shortDesc: "Lowers both enemies' Spe by 1 and poisons.",
		// onHit(target, source, move) {
		// 	const foe = source.side.foe;
		// 	foe.addSideCondition('toxicspikes');
		// 	// if (!foe.getSideCondition('toxicspikes')) {
		// 	// }
		// 	if (!foe.getSideCondition('stickyweb')) {
		// 		foe.addSideCondition('stickyweb');
		// 	}
		// },
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Traps target, -1 Def/SpD and 1/6 dmg each turn.",
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Octolock', '[of] ' + source);
				this.effectState.boundDivisor = source.hasItem('bindingband') ? 4 : 6;
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['octolock'];
					this.add('-end', pokemon, 'Octolock', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({def: -1, spd: -1}, pokemon, source, this.dex.getActiveMove('octolock'));
				this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source && this.effectState.source.isActive) pokemon.tryTrap();
			},
		},
	},
	filletaway: {
		inherit: true,
		shortDesc: "+2 Atk, SpAtk, Spe for 1/3 user HP, Ally Heals 1/3.",
		onTry(source) {
			if (source.hp <= source.maxhp / 3 || source.maxhp === 1) return false;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 3);
			for (const allyActive of pokemon.adjacentAllies()) {
				this.heal(allyActive.baseMaxhp / 3, allyActive, pokemon);
			}
		},
	},
	fairylock: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Prevents all Pokemon from switching for next 3 turns.",
		condition: {
			duration: 4,
			onFieldStart(target) {
				this.add('-fieldactivate', 'move: Fairy Lock');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
	},
	freezingglare: {
		inherit: true,
		shortDesc: "20% chance to frostbite, +Ice Type",
		secondary: {chance: 20, status: 'fst'},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ice', type);
		},
	},
	thunderouskick: {
		inherit: true,
		shortDesc: "Lowers Def by 1, +Elec Type",
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Electric', type);
		},
	},
	fierywrath: {
		inherit: true,
		shortDesc: "20% to make foe(s) flinch, +Fire Type",
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Fire', type);
		},
	},
	lusterpurge: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "100% chance to reduce SpDef by 1",
		basePower: 80,
		secondary: {
			chance: 100, boosts: {spd: -1},
		},
	},
	mistball: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "100% chance to reduce SpA by 1",
		basePower: 80,
		secondary: {
			chance: 100, boosts: {spa: -1},
		},
	},
	accelerock: {
		inherit: true,
		basePower: 60,
	},
	attackorder: {
		inherit: true,
		accuracy: true,
	},
	// Moves edited for abilities
	auroraveil: {
		inherit: true,
		onTry(source) {
			return this.field.isWeather(['hail', 'snow']) || source.hasAbility("trueaurora");
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				let numTurns = 5;
				if (source?.hasItem('lightclay') || source?.hasAbility('trueaurora')) {
					numTurns += 3;
				}
				return numTurns;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
	},
	finalgambit: {
		inherit: true,
		damageCallback(pokemon) {
			let damage = pokemon.hp;
			pokemon.faint();
			if (pokemon.hasAbility('reckless')) {
				damage *= 1.3;
			}
			return damage;
		},
	},
	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (effect.ability === 'thunderstorm') {
					return 3;
				}
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	pollenpuff: {
		inherit: true,
		onHit(target, source) {
			if (source.isAlly(target)) {
				let healAmt = Math.floor(target.baseMaxhp * 0.5);
				if (source.hasAbility('honeygather')) {
					healAmt = Math.floor(target.baseMaxhp * 0.75);
				}
				if (!this.heal(healAmt)) {
					this.add('-immune', target);
					return this.NOT_FAIL;
				}
			}
		},
	},
	superfang: {
		inherit: true,
		damageCallback(pokemon, target) {
			if (pokemon.ability === 'strongjaw') {
				return this.clampIntRange(target.getUndynamaxedHP() * 3 / 4, 1);
			}
			return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
		},
	},
	// Z Moves
	trickortreat: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Charges, +Ghost to target's type, omniboost turn 2.",
		pp: 1,
		flags: {charge: 1, protect: 1, reflectable: 1, mirror: 1, allyanim: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, attacker, attacker, move);
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, attacker, attacker, move);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		}
	},
	forestscurse: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Charges, +Grass to target's type, omniboost turn 2.",
		pp: 1,
		flags: {charge: 1, protect: 1, reflectable: 1, mirror: 1, allyanim: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, attacker, attacker, move);
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, attacker, attacker, move);
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		}
	},
	conversion: {
		inherit: true,
		isNonstandard: null,
		pp: 1,
		shortDesc: "Charges, User's type to first move, Omniboost turn 2.",
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
	sinisterarrowraid: {
		inherit: true,
		isNonstandard: null,
		isZ: false,
		flags: {protect: 1, mirror: 1, charge: 1},
		shortDesc: "Charges, uses move turn 2",
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
	splinteredstormshards: {
		inherit: true,
		isNonstandard: null,
		isZ: false,
		flags: {protect: 1, mirror: 1, charge: 1},
		shortDesc: "Charges, uses move turn 2, ends terrain",
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
	extremeevoboost: {
		inherit: true,
		isNonstandard: null,
		isZ: false,
		shortDesc: "Eevee Only, Charges, Double Omniboosts turn 2",
		onTry(source, target, move) {
			if (source.species.name === 'Eevee' || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Extreme Evoboost');
			this.hint("Only a Pokemon whose form is Eevee can use this move.");
			return null;
		},
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
	// Max Moves
	gmaxreplenish: {
		inherit: true,
		isNonstandard: null,
		isMax: false,
		flags: {protect: 1, mirror: 1},
		basePower: 80,
		shortDesc: "Restores berry on attack.",
		self: {
			onHit(source) {
				// if (this.random(2) === 0) return;
				if (source.item) return;
				if (source.lastItem && this.dex.items.get(source.lastItem).isBerry) {
					const item = source.lastItem;
					source.lastItem = '';
					this.add('-item', source, this.dex.items.get(item), '[from] move: G-Max Replenish');
					source.setItem(item);
				}
			},
		},
	},
	gmaxmalodor: {
		inherit: true,
		isNonstandard: null,
		isMax: false,
		flags: {protect: 1, mirror: 1},
		basePower: 90,
		shortDesc: "Poisons both foes after successful use.",
	},
	gmaxsteelsurge: {
		inherit: true,
		isNonstandard: null,
		isMax: false,
		flags: {protect: 1, mirror: 1},
		basePower: 90,
		shortDesc: "Sets up a Steel Hazard after use.",
	},
	gmaxgravitas: {
		inherit: true,
		isNonstandard: null,
		isMax: false,
		flags: {protect: 1, mirror: 1},
		category: "Special",
		basePower: 90,
		shortDesc: "Sets up Gravity after succesful use.",
	},
	gmaxfinale: {
		inherit: true,
		isNonstandard: null,
		isMax: false,
		flags: {protect: 1, mirror: 1},
		category: "Special",
		basePower: 90,
		shortDesc: "Heals self and allies by 1/6th.",
	},
	gmaxdepletion: {
		inherit: true,
		isNonstandard: null,
		isMax: false,
		flags: {protect: 1, mirror: 1},
		category: "Special",
		basePower: 90,
		shortDesc: "Foes: last move -2 PP.",
	},
	// Pledges
	firepledge: {
		inherit: true,
		shortDesc: "Use with other pledge for 200bp combined attack.",
		basePowerCallback(target, source, move) {
			if (['grasspledge', 'waterpledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 200;
			}
			return 80;
		}
	},
	waterpledge: {
		inherit: true,
		shortDesc: "Use with other pledge for 200bp combined attack.",
		basePowerCallback(target, source, move) {
			if (['grasspledge', 'firepledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 200;
			}
			return 80;
		}
	},
	grasspledge: {
		inherit: true,
		shortDesc: "Use with other pledge for 200bp combined attack.",
		basePowerCallback(target, source, move) {
			if (['firepledge', 'waterpledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 200;
			}
			return 80;
		}
	},
	// Freeze -> Frostbite
	blizzard: {
		inherit: true,
		shortDesc: "15% chance to frostbite foes. Can't miss in Snow.",
		secondary: {chance: 15, status: 'fst'},
	},
	icebeam: {
		inherit: true,
		shortDesc: "10% chance to frostbite.",
		secondary: {chance: 10, status: 'fst'},
	},
	freezedry: {
		inherit: true,
		shortDesc: "10% chance to frostbite.",
		secondary: {chance: 10, status: 'fst'},
	},
	icepunch: {
		inherit: true,
		shortDesc: "10% chance to frostbite.",
		secondary: {chance: 10, status: 'fst'},
	},
	// Recharge moves
	hyperbeam: {
		inherit: true,
		self: null,
		shortDesc: "User cannot move next turn if it fails to KO.",
		basePower: 140,
		onHit(target, source) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
	},
	gigaimpact: {
		inherit: true,
		self: null,
		shortDesc: "User cannot move next turn if it fails to KO.",
		basePower: 140,
		onHit(target, source) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
	},
	frenzyplant: {
		inherit: true,
		self: null,
		shortDesc: "User recharges doesn't KO. Physical if user's Atk > SpA.",
		basePower: 140,
		onHit(target, source, move) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
			if (!source.isAlly(target)) this.hint(move.category + " Frenzy Plant");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Frenzy Plant");
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	hydrocannon: {
		inherit: true,
		self: null,
		shortDesc: "User recharges doesn't KO. Physical if user's Atk > SpA.",
		basePower: 140,
		onHit(target, source, move) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
			if (!source.isAlly(target)) this.hint(move.category + " Hydro Cannon");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Hydro Cannon");
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	blastburn: {
		inherit: true,
		self: null,
		shortDesc: "User recharges doesn't KO. Physical if user's Atk > SpA.",
		basePower: 140,
		onHit(target, source, move) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
			if (!source.isAlly(target)) this.hint(move.category + " Blast Burn");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Blast Burn");
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
	},
	rockwrecker: {
		inherit: true,
		isNonstandard: null,
		self: null,
		shortDesc: "User cannot move next turn if it fails to KO.",
		basePower: 140,
		onHit(target, source) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
		self: null,
		shortDesc: "User cannot move next turn if it fails to KO.",
		basePower: 150,
		onHit(target, source) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
	},
	// pp changes
	flamethrower: {
		inherit: true,
		pp: 10,
	},
	thunderbolt: {
		inherit: true,
		pp: 10,
	},
	allyswitch: {
		inherit: true,
		pp: 5,
	},
	protect: {
		inherit: true,
		pp: 5,
	},
	trumpcard: {
		inherit: true,
		isNonstandard: null,
		pp: 2
	},
	// Making Standard
	flashfreeze: {
		inherit: true,
		isNonstandard: null,
	},
	icerink: {
		inherit: true,
		isNonstandard: null,
	},
	quarry: {
		inherit: true,
		isNonstandard: null,
	},
	smeltery: {
		inherit: true,
		isNonstandard: null,
	},
	firewall: {
		inherit: true,
		isNonstandard: null,
	},
	stalacbite: {
		inherit: true,
		isNonstandard: null,
	},
	divebomb: {
		inherit: true,
		isNonstandard: null,
	},
	psychout: {
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
	sacredfire: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
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
	electrify: {
		inherit: true,
		isNonstandard: null,
	},
	topsyturvy: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	"hiddenpowerbug": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	"hiddenpowerdark": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerdragon": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerelectric": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerfighting": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	"hiddenpowerfire": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerflying": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	"hiddenpowerghost": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	"hiddenpowergrass": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerice": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerpoison": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	"hiddenpowerpsychic": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerrock": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	"hiddenpowersteel": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	"hiddenpowerwater": {
		"inherit": true,
		"isNonstandard": null,
	},
	"hiddenpowerground": {
		"inherit": true,
		"category": "Physical",
		"isNonstandard": null,
	},
	mindblown: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	aromatherapy: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	moongeistbeam: {
		inherit: true,
		isNonstandard: null,
	},
	sunsteelstrike: {
		inherit: true,
		isNonstandard: null,
	},
	matblock: {
		inherit: true,
		isNonstandard: null,
	},
	spotlight: {
		inherit: true,
		isNonstandard: null,
	},
	strangesteam: {
		inherit: true,
		isNonstandard: null,
	},
	decorate: {
		inherit: true,
		isNonstandard: null,
	},
	floralhealing: {
		inherit: true,
		isNonstandard: null,
	},
	craftyshield: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	signalbeam: {
		inherit: true,
		isNonstandard: null,
	},
	psychoboost: {
		inherit: true,
		isNonstandard: null,
	},
	clangingscales: {
		inherit: true,
		isNonstandard: null,
	},
	clangoroussoul: {
		inherit: true,
		isNonstandard: null,
	},
	obstruct: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	thousandarrows: {
		inherit: true,
		isNonstandard: null,
	},
	magiccoat: {
		inherit: true,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		isNonstandard: null,
	},
	dragonhammer: {
		inherit: true,
		isNonstandard: null,
	},
	blazingtorque: {
		inherit: true,
		isNonstandard: null,
	},
	noxioustorque: {
		inherit: true,
		isNonstandard: null,
	},
	magicaltorque: {
		inherit: true,
		isNonstandard: null,
	},
	combattorque: {
		inherit: true,
		isNonstandard: null,
	},
	wickedtorque: {
		inherit: true,
		isNonstandard: null,
	},
	secretsword: {
		inherit: true,
		isNonstandard: null,
	},
	purify: {
		inherit: true,
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		isNonstandard: null,
	},
	jumpkick: {
		inherit: true,
		isNonstandard: null,
	},
	mefirst: {
		inherit: true,
		isNonstandard: null,
	},
	laserfocus: {
		inherit: true,
		isNonstandard: null,
	},
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	searingshot: {
		inherit: true,
		isNonstandard: null,
		target: "normal",
	},
	shellsidearm: {
		inherit: true,
		isNonstandard: null,
	},
	autotomize: {
		inherit: true,
		isNonstandard: null,
	},
};
