import { Creature } from "./creature";

export class Tile {
    creature: Creature | null;
    
    lightLevel: number;
  
    constructor(light:number, creature?:Creature){
      this.creature = creature;
      this.lightLevel = light;
    }
    tick() {
      if(!this.creature) return undefined;
  
      return this.creature.step();
    }
    get color(){
      const lvl = this.lightLevel;
      if(!this.creature) return `rgba(${lvl}, ${lvl}, ${lvl}, 1)`;
      return "rgba(" + this.creature.color.join(", ") + ", 1)";
    }
  }