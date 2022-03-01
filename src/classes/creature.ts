import { DESTROY, GEN } from "../genes";
import { colorForGenes, randGene } from "../utils";

export class Creature {
    genome: GEN[];
    genome_step: number = 0;
    result_value: number = 0;

    lock: boolean = false;
    direction: [number,number] = [1,0];

    alive: boolean = true;
    immortal: boolean = false;
    _durablity: number = 0;
    _agro: number = 0;

    _color: number[]

    set durablity(value: number) {
        if (value < 0) this._durablity = 0; else
            this._durablity = value < 255 ? value : 255;
    }
    get durablity() {
        return this._durablity;
    }

    get agro() {
        return this._agro
    }

    set agro(value: number) {
        this._agro = value < 255 ? value : 255
    }
    protection: number = 1;

    enegry: number = 50;
    age: number = 0;


    get color() {
        if (!this.alive) return [0, 0, 0]
        return this._color
    }

    constructor(parent: Creature | GEN[], mutrate: number) {
        if (parent instanceof Array) this.genome = parent;
        else {
            this.genome = parent.genome.map(gen => Math.random() < mutrate?randGene():gen)
            if (Math.random() < mutrate) this.genome.push(randGene())
            else if (Math.random() > 1 - mutrate) delete this.genome[this.genome.length - 1]
        }
        this._color = colorForGenes(this.genome);
    }

    step(): GEN | -1 {
        if (this.lock) {
            this.lock = false;
            return GEN.PASS
        }
        if (this.agro > 0) this.agro -= 1;
        if (this.agro < 0) this.agro = 0;
        this.enegry -= 5;
        if (this.enegry < 0) this.alive = false;
        if (!this.alive && !this.immortal) {
            this.durablity -= 2;
            if (this.durablity <= 0) return DESTROY
            return GEN.PASS
        }

        this.age++;
        this.genome_step = this.genome_step % this.genome.length
        return this.genome[this.genome_step++]
    }




}