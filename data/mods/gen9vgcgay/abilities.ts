export const Abilities: {[k: string]: ModdedAbilityData} = {
	slowstart: {
		inherit: true,
		condition: {
			duration: 3,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
	},
	pastelveil: {
		inherit: true,
		onStart(pokemon) {
			for (const ally of pokemon.alliesAndSelf()) {
				if (['psn', 'tox', 'brn', 'slp'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox', 'brn', 'slp'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn', 'tox', 'brn', 'slp'].includes(pokemon.status)) {
				this.add('-activate', this.effectState.target, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox', 'brn', 'slp'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox', 'brn', 'slp'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
	},
	reckless: {
		inherit: true,
		shortDesc: "This Pokemon's attacks with recoil or crash damage have 1.3x power; not Struggle.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage || move.mindBlownRecoil || move.selfdestruct) {
				this.debug('Reckless boost');
				return this.chainModify([13, 10]);
			}
		},
	},
	ironfist: {
		inherit: true,
		shortDesc: "This Pokemon's punch-based attacks have 1.5x power. Sucker Punch is not boosted.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				return this.chainModify([15, 10]);
			}
		},
	},
	berserk: {
		inherit: true,
		shortDesc: "Atk and Sp. Atk raised by 1 when it reaches 1/2 or less of max HP",
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1}, target, target);
			}
		},
	},
	megalauncher: {
		inherit: true,
		shortDesc: "Pulse and Cannon moves have 1.5x Power",
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse'] || move.name.toLowerCase().includes("cannon")) {
				return this.chainModify(1.5);
			}
		},
	},
	wonderskin: {
		inherit: true,
		shortDesc: "This Pokemon is immune to Status moves",
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Wonder Skin');
				return null;
			}
		},
	},
	sandforce: {
		inherit: true,
		shortDesc: "This Pokemon's Ground/Rock/Steel attacks do 1.5x in Sandstorm; immunity to it.",
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([3, 2]);
				}
			}
		},
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp/2) return priority + 1;
		},
		shortDesc: "If Pokemon's HP is >= 50%, Flying moves have priority increased by 1",
	},
	leafguard: {
		inherit: true,
		shortDesc: "Guards Self and Allies from Status Conditions in Sun",
		onAllySetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
	},
	runaway: {
		inherit: true,
		shortDesc: "Immune to Trapping",
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
	},
	tanglinghair: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Tangling Hair');
				target.addVolatile('trapped', source, null, 'trapper');
			}
		},
		shortDesc: "Traps target on contact"
	},
	// New Abilities
	triplethreat: {
		isNonstandard: null,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('halving secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 0.5;
				}
			}
			if (move.self?.chance) move.self.chance *= 0.5;
			if (!move.multihit && move.basePower > 0) {
				move.multihit = 3
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify([4, 10]);
		},
		name: "Triple Threat",
		shortDesc: "Moves hit 3 times at 40% power and 50% effect chance",
		rating: 3,
		num: -5,
	},
	mindsurfer: {
		isNonstandard: null,
		onModifySpe(spe) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Mind Surfer",
		shortDesc: "Doubles speed in Psychic Terrain",
		rating: 3,
		num: -6,
	},
	thunderstorm: {
		isNonstandard: null,
		onStart(source) {
			this.field.setWeather('raindance');
			this.field.setTerrain('electricterrain');
		},
		name: "Thunderstorm",
		shortDesc: "Sets Rain and Electric Terrain",
		rating: 4,
		num: -7,
	},
	justthetip: {
		isNonstandard: null,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name.toLowerCase().includes("drill")) {
				return this.chainModify([3, 2]);
			}
		},
		name: "Just the Tip",
		shortDesc: "Drill moves do 1.5x damage",
		rating: 3,
		num: -8,
	},
	arcticrush: {
		isNonstandard: null,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'rain'])) {
				return this.chainModify(2);
			}
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'rain'])) {
				return this.chainModify([3, 2]);
			}
		},
		name: "Arctic Rush",
		shortDesc: "Doubles Speed and boosts SpDef in Snow and Rain",
		rating: 3,
		num: -9,
	},
};
