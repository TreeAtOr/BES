import { Creature } from "../classes/creature"
import { Tile } from "../classes/tile"
import { ABSORBTION_KOEF, AGRO_COST, AGRO_DAMAGE, DURABILITY_COST, ENERGY_FOR_DURABILITY, ENERGY_FOR_ENERGY, ENERGY_SHARE_AMOUNT, INITAL_ENERGY, MOVEMENT_DURABILITY_LOSS, MUTATION_RATE, PROTECTION_COST } from "../constants"
import { leftDir, rightDir, roundCords } from "../utils"

export function splitCreatue(tile: Tile, field: Tile[][], x: number, y: number) {
    if (!field[x][roundCords(y - 1)].creature) {
        field[x][roundCords(y - 1)].creature = new Creature(tile.creature, MUTATION_RATE)
        tile.creature.enegry -= INITAL_ENERGY
    }
    else if (!field[x][roundCords(y + 1)].creature) {
        field[x][roundCords(y + 1)].creature = new Creature(tile.creature, MUTATION_RATE)
        tile.creature.enegry -= INITAL_ENERGY
    }
    else if (!field[roundCords(x - 1)][y].creature) {
        field[roundCords(x - 1)][y].creature = new Creature(tile.creature, MUTATION_RATE)
        tile.creature.enegry -= INITAL_ENERGY
    }
    else if (!field[roundCords(x + 1)][y].creature) {
        field[roundCords(x + 1)][y].creature = new Creature(tile.creature, MUTATION_RATE)
        tile.creature.enegry -= INITAL_ENERGY
    }
}

export function shareEnergy(tile: Tile, field: Tile[][], x: number, y: number) {
    let total_share = 0;
    if (field[x][roundCords(y - 1)].creature) {
        field[x][roundCords(y - 1)].creature.enegry += ENERGY_SHARE_AMOUNT
        tile.creature.enegry -= ENERGY_SHARE_AMOUNT
        total_share += ENERGY_SHARE_AMOUNT
    }
    if (field[x][roundCords(y + 1)].creature) {
        field[x][roundCords(y + 1)].creature.enegry += ENERGY_SHARE_AMOUNT
        tile.creature.enegry -= ENERGY_SHARE_AMOUNT
        total_share += ENERGY_SHARE_AMOUNT
    }
    if (field[roundCords(x - 1)][y].creature) {
        field[roundCords(x - 1)][y].creature.enegry += ENERGY_SHARE_AMOUNT
        tile.creature.enegry -= ENERGY_SHARE_AMOUNT
        total_share += ENERGY_SHARE_AMOUNT
    }
    if (field[roundCords(x + 1)][y].creature) {
        field[roundCords(x + 1)][y].creature.enegry += ENERGY_SHARE_AMOUNT
        tile.creature.enegry -= ENERGY_SHARE_AMOUNT
        total_share += ENERGY_SHARE_AMOUNT
    }
    return total_share
}

export function changeProtection(tile: Tile, value: number) {
    if (tile.creature.enegry > PROTECTION_COST * value) {
        tile.creature.enegry -= PROTECTION_COST * value;
        tile.creature.protection += value
        return value
    }
    return 0
}

export function changeDurability(tile: Tile, value: number) {
    if (tile.creature.enegry > DURABILITY_COST * value) {
        tile.creature.enegry -= DURABILITY_COST * value;
        tile.creature.durablity += value
        return value
    }
    return 0
}


export function changeAgro(tile: Tile, value: number) {
    if (tile.creature.enegry > AGRO_COST * value) {
        tile.creature.enegry -= AGRO_COST * value;
        tile.creature.agro += value
        return value
    }
    return 0
}

export function absorb(tile: Tile) {
    tile.creature.enegry += tile.lightLevel * ABSORBTION_KOEF;
    return tile.lightLevel * ABSORBTION_KOEF
}

export function moveCreature(tile: Tile, next: Tile | undefined,lock:boolean = false) : number {
    if (typeof next == "undefined") return 0;
    if (tile.creature.lock) return Number(tile.creature.lock = false);
    tile.creature.lock = lock;
    
    tile.creature.durablity -= MOVEMENT_DURABILITY_LOSS;

    if(!next.creature){
        next.creature = tile.creature;
        tile.creature = null;
        return 1
    }

    if (next.creature.immortal) return 0;
    if (tile.creature.agro <= next.creature.durablity) {
        next.creature.durablity -= tile.creature.agro * AGRO_DAMAGE / next.creature.protection;
        tile.creature.enegry += (tile.creature.agro * AGRO_DAMAGE / next.creature.protection) * ENERGY_FOR_DURABILITY;
        return 1;
    }

    if (next.creature.alive) tile.creature.enegry += next.creature.enegry * ENERGY_FOR_ENERGY;
    tile.creature.enegry += next.creature.durablity * ENERGY_FOR_DURABILITY;
    delete next.creature;
    next.creature = tile.creature;
    tile.creature = null;
    return 1
}

export function ifTrue(tile: Tile){
    if(tile.creature.result_value) tile.creature.genome_step += 1;
    return tile.creature.result_value;
}

export function ifNot(tile: Tile){
    if(!tile.creature.result_value) tile.creature.genome_step += 1;
    return tile.creature.result_value;
}

export function ifMore(tile: Tile){
    if(tile.creature.result_value > tile.creature.genome[++tile.creature.genome_step]) tile.creature.genome_step += 1;
    return tile.creature.result_value;
}

export function ifLess(tile: Tile){
    if(tile.creature.result_value < tile.creature.genome[++tile.creature.genome_step]) tile.creature.genome_step += 1;
    return tile.creature.result_value;
}

export function ifEqu(tile: Tile){
    if(tile.creature.result_value < tile.creature.genome[++tile.creature.genome_step]) tile.creature.genome_step += 1;
    return tile.creature.result_value;
}

export function goto(tile: Tile){
    tile.creature.genome_step = tile.creature.genome[tile.creature.genome_step + 1] % tile.creature.genome.length;
    return tile.creature.genome.length;
}

export function look(tile: Tile, next: Tile){
    if(!next.creature)  return 0;
    
    let ret = 1;
    for(let i = 0; i < next.creature.genome.length;i++){
        ret += Math.abs(next.creature.genome[i] - tile.creature.genome[i])
    }
}   

export function rotateLeft(tile: Tile){
    tile.creature.direction = leftDir(tile.creature.direction);
    return 1;
}

export function rotateRight(tile: Tile){
    tile.creature.direction = rightDir(tile.creature.direction);
    return 1;
}