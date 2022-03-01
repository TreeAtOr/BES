import { Creature } from "../classes/creature";
import { Tile } from "../classes/tile";
import { CREATURES, GENOME_SIZE, SIZE } from "../constants";
import { GEN } from "../genes";
import { randGene } from "../utils";


export function createCreature() {
    const genome = new Array<GEN>(GENOME_SIZE);
    for (let g = 0; g < genome.length; g++) {
        genome[g] = randGene();
    }
    return new Creature(genome, 0);

}

export function createObsticle(protection: number = 1000) {
    const genome = [0]
    const creature = new Creature(genome, 0);
    creature.alive = false;
    creature.immortal = true;
    return creature;
}

export function init(light: (x:number,y:number) => number){
    let field = new Array<Array<Tile>>(SIZE);
    for(let x = 0; x < field.length; x++) {
        field[x] = new Array<Tile>(SIZE)
        for(let y = 0; y < field[x].length; y++) {
          if(
             y == 0 || y == SIZE - 1
          || x == 0 || x == SIZE - 1 
          ){
            field[x][y] = new Tile(light(x,y),createObsticle())
          } else
          if(Math.random() < CREATURES) 
            field[x][y] = new Tile(light(x,y),createCreature())
          else field[x][y] = new Tile(light(x,y))
        }
    }
    return field
}