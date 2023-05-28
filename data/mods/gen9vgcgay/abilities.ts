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
		shortDesc: "This Pokemon's punch-based attacks have 1.4x power. Sucker Punch is not boosted.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				return this.chainModify([14, 10]);
			}
		},
	},
	berserk: {
		inherit: true,
		shortDesc: "Atk and Sp. Atk raised by 1 when it reaches 1/2 or less of max HP.",
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
		shortDesc: "Pulse and Cannon moves have 1.5x Power.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse'] || move.name.toLowerCase().includes("cannon")) {
				return this.chainModify(1.5);
			}
		},
	},
	wonderskin: {
		inherit: true,
		shortDesc: "This Pokemon is immune to Status moves.",
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
	leafguard: {
		inherit: true,
		shortDesc: "Guards Self and Allies from Status Conditions in Sun.",
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
		shortDesc: "Immune to Trapping.",
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
				source.addVolatile('trapped', source, null, 'trapper');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		shortDesc: "Traps target and -1 speed on contact."
	},
	rockhead: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil' || effect.id === 'mindblown' || effect.id === 'selfdestruct') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		}
	},
	rivalry: {
		inherit: true,
		shortDesc: "1.5x damage on same gender, 0.9x damage on opposite gender",
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.5);
				} else {
					this.debug('Rivalry weaken');
					return this.chainModify(0.9);
				}
			}
		},
	},
	magmaarmor: {
		inherit: true,
		shortDesc: "Reduces Contact damage by 25%, 30% Chance to burn on contact moves",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.flags['contact']) mod /= 1.5;
			return this.chainModify(mod);
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
	},
	tangledfeet: {
		inherit: true,
		shortDesc: "Doubles Speed if confused",
		onModifySpe(spe, pokemon) {
			if (pokemon?.volatiles['confusion']) {
				return this.chainModify(2);
			}
		},
	},
	flamebody: {
		inherit: true,
		shortDesc: "30% to burn on any contact",
		onModifyMove(move) {
			if (!move?.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'brn',
				ability: this.dex.abilities.get('flamebody'),
			});
		},
	},
	liquidooze: {
		inherit: true,
		shortDesc: "Deals damage instead of draining, replaces items with Black Sludges on hit",
		onModifyMove(move) {
			move.secondaries?.push({
				chance: 100,
				onHit(target) {
					if (target.item === "leftovers" || target.item.endsWith("berry")) {
						this.add('message', 'Item replaced with Liquid Ooze')
						target.setItem("blacksludge")
					}
				}
			})
		}
	},
	quickfeet: {
		inherit: true,
		shortDesc: "1.5x speed if statused or has stat drops",
		onModifySpe(spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
			let boost: BoostID;
			for (boost in pokemon.boosts) {
				if (pokemon.boosts[boost] < 0) return this.chainModify(1.5);
			}
		},
	},
	healer: {
		inherit: true,
		shortDesc: "Heals ally by 1/16th, Also 30% to heal ally status",
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				if (allyActive.status && this.randomChance(3, 10)) {
					this.add('-activate', pokemon, 'ability: Healer');
					allyActive.cureStatus();
				}
				allyActive.heal(allyActive.baseMaxhp / 16)
			}
		},
	},
	bigpecks: {
		inherit: true,
		shortDesc: "Immune to defense lowering, Omniboost if intimidated",
		onTryBoost(boost, target, source, effect) {
			// if (source && target === source) return;
			if (boost.def && boost.def < 0) {
				delete boost.def;
				if (!(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
					this.add("-fail", target, "unboost", "Defense", "[from] ability: Big Pecks", "[of] " + target);
				}
			}
			if (effect.name === 'Intimidate' && boost.atk) {
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Big Pecks', '[of] ' + target);
				boost.atk = 1
				boost.def = 1
				boost.spa = 1
				boost.spd = 1
				boost.spe = 1
			}
		},
	},
	// Signature Ability Buffs
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp/2) return priority + 1;
		},
		shortDesc: "If Pokemon's HP is >= 50%, Flying moves have priority increased by 1.",
	},
	flowergift: {
		inherit: true,
		shortDesc: "If Sunny Day active, it and allies' Atk, SpA, Def, and SpDef are 1.5x",
		onAllyModifySpAPriority: 3,
		onAllyModifySpA(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifyDef(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	colorchange: {
		inherit: true,
		shortDesc: "Changes type to be perfect offensive and defensive type once per turn",
		onResidualOrder: 29,
		onResidual(pokemon) {
			this.effectState.colorChange = false;
		},
		onSwitchIn(pokemon) {
			delete this.effectState.colorChange;
		},
		onPrepareHit(source, target, move) {
			if (this.effectState.colorChange) return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.colorChange = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Color Change');
			}
		},
		onSourceBeforeMove(source, target, move) {
			if (this.effectState.colorChange) return;
			let type = move.type
			switch (type) {
			case 'Normal':
				type = 'Ghost';
				break;
			case 'Fighting':
				type = 'Ghost';
				break;
			case 'Flying':
				type = 'Rock';
				break;
			case 'Poison':
				type = 'Steel';
				break;
			case 'Ground':
				type = 'Flying';
				break;
			case 'Rock':
				type = 'Fighting';
				break;
			case 'Bug':
				type = 'Poison';
				break;
			case 'Ghost':
				type = 'Normal';
				break;
			case 'Steel':
				type = 'Electric';
				break;
			case 'Fire':
				type = 'Water';
				break;
			case 'Water':
				type = 'Grass';
				break;
			case 'Grass':
				type = 'Fire';
				break;
			case 'Electric':
				type = 'Ground';
				break;
			case 'Psychic':
				type = 'Dark';
				break;
			case 'Ice':
				type = 'Ice';
				break;
			case 'Dragon':
				type = 'Fairy';
				break;
			case 'Dark':
				type = 'Fighting';
				break;
			case 'Fairy':
				type = 'Poison';
				break;
			}
			target.setType(type)
			this.effectState.colorChange = true;
			this.add('-start', target, 'typechange', type, '[from] ability: Color Change');
		},
	},
	normalize: {
		inherit: true,
		shortDesc: "All moves are normal, but are 1.2x power and ignore immunities and resistances",
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				return this.chainModify(1/target.getMoveHitData(move).typeMod);
			}
		},
	},
	mimicry: {
		inherit: true,
		shortDesc: "Sets primary type to terrain, Sets terrain if use move of corresponding type",
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type == "Electric") this.field.setTerrain('electricterrain');
			if (type == "Grass") this.field.setTerrain('grassyterrain');
			if (type == "Psychic") this.field.setTerrain('psychicterrain');
			if (type == "Fairy") this.field.setTerrain('mistyterrain');
		},
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'electricterrain':
				types = ['Electric', 'Steel'];
				break;
			case 'grassyterrain':
				types = ['Grass', 'Steel'];
				break;
			case 'mistyterrain':
				types = ['Fairy', 'Steel'];
				break;
			case 'psychicterrain':
				types = ['Psychic', 'Steel'];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
	},
	longreach: {
		inherit: true,
		shortDesc: "Additionally Moves targetting this pokemon have -1 priority",
		onAnyModifyPriority(relayVar, source, target, move) {
			if (target.ability === "longreach" && move.priority > -5) {
				move.priority = move.priority - 1
			}
		},
	},
	punkrock: {
		inherit: true,
		shortDesc: "This Pokemon receives 1/2 damage from sound moves. Its own have 1.5x power.",
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock boost');
				return this.chainModify([3, 2]);
			}
		},
	},
	zenmode: {
		inherit: true,
		shortDesc: "Switches to Zen move if less than 75% health",
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp * 3 / 4 && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp * 3 / 4 && ['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
	},
	gulpmissile: {
		inherit: true,
		shortDesc: "When hit after Surf/Dive and start, attacker takes 33% and -1 Def or Para",
		onSwitchIn(pokemon) {
			if (
				pokemon.hasAbility('gulpmissile') && pokemon.species.name === 'Cramorant'
			) {
				const forme = pokemon.hp <= pokemon.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				pokemon.formeChange(forme);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 3, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			}
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
	grasspelt: {
		inherit: true,
		shortDesc: "If Grassy Terrain is up, Defense and Special Defense are multiplied by 1.5.",
		onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
	},
	// Ruin Nerf
	swordofruin: {
		inherit: true,
		shortDesc: "Active Pokemon without this ability have their Def multiplied by .8",
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Sword of Ruin')) return;
			if (!move.ruinedDef?.hasAbility('Sword of Ruin')) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Sword of Ruin Def drop');
			return this.chainModify(0.8);
		},
	},
	tabletsofruin: {
		inherit: true,
		shortDesc: "Active Pokemon without this ability have their Atk multiplied by .8",
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Tablets of Ruin')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Tablets of Ruin Atk drop');
			return this.chainModify(0.8);
		},
	},
	vesselofruin: {
		inherit: true,
		shortDesc: "Active Pokemon without this ability have their SpAtk multiplied by .8",
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Vessel of Ruin')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Vessel of Ruin SpA drop');
			return this.chainModify(0.8);
		},
	},
	beadsofruin: {
		inherit: true,
		shortDesc: "Active Pokemon without this ability have their SpDef multiplied by .8",
		onAnyModifySpD(spd, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Beads of Ruin')) return;
			if (!move.ruinedSpD?.hasAbility('Beads of Ruin')) move.ruinedSpD = abilityHolder;
			if (move.ruinedSpD !== abilityHolder) return;
			this.debug('Beads of Ruin SpD drop');
			return this.chainModify(0.8);
		},
	},
	// Weather Nerf
	swiftswim: {
		inherit: true,
		shortDesc: "1.5x speed in Rain",
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	chlorophyll: {
		inherit: true,
		shortDesc: "1.5x speed in Sun",
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	slushrush: {
		inherit: true,
		shortDesc: "1.5x speed in Hail/Snow",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow'])) {
				return this.chainModify(1.5);
			}
		},
	},
	sandrush: {
		inherit: true,
		shortDesc: "1.5x speed in Sand",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
	},
	// New Abilities
	triplethreat: {
		inherit: true,
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
	},
	mindsurfer: {
		inherit: true,
		isNonstandard: null,
		onModifySpe(spe) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
	},
	thunderstorm: {
		inherit: true,
		isNonstandard: null,
		onStart(source) {
			this.field.setWeather('raindance');
			this.field.setTerrain('electricterrain');
		},
		name: "Thunderstorm",
		shortDesc: "Sets Rain and Electric Terrain.",
		rating: 4,
		num: -7,
	},
	justthetip: {
		inherit: true,
		isNonstandard: null,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name.toLowerCase().includes("drill")) {
				return this.chainModify([3, 2]);
			}
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move.name === "Horn Drill") {
				return 45;
			}
			return accuracy;
		},
	},
	arcticrush: {
		inherit: true,
		isNonstandard: null,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather(['hail', 'snow', 'raindance', 'primordialsea'])) {
				return this.chainModify([3, 2]);
			}
		},
	},
	cloakchange: {
		inherit: true,
		isNonstandard: null,
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Wormadam' || attacker.transformed) return;
			if (move.category === 'Status') attacker.formeChange('Wormadam-Trash');
			if (move.category === 'Physical') attacker.formeChange('Wormadam-Sandy');
			if (move.category === 'Special') attacker.formeChange('Wormadam');
		},
		isPermanent: true,
	},
	bigballs: {
		inherit: true,
		isNonstandard: null,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Has BIG BALLS');
		},
		onModifyCritRatio(relayVar, source, target, move) {
			move.willCrit = true
		},
		onFoeModifyCritRatio(relayVar, source, target, move) {
			if (target.ability === 'bigballs') {
				move.willCrit = true
			}
		},
	},
	oddkeystone: {
		inherit: true,
		isNonstandard: null,
		isBreakable: true,
		onSwitchIn(pokemon) {
			this.effectState.oddKeystone = true;
		},
		onPrepareHit(source, target, move) {
			this.effectState.oddKeystone = false;
		},
		onTryHit(target, source, move) {
			if (target !== source && this.effectState.oddKeystone) {
				this.add('-immune', target, '[from] ability: Odd Keystone');
				return null
			}
		},
	}
};
