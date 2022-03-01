import { SIZE } from "./constants";
import { GEN, GENES_NUMBER } from "./genes";

export function roundCords(cord: number, size: number = SIZE) {
    return Math.abs(cord) % size;
}

export function randGene(size = GENES_NUMBER): GEN {
    return Math.trunc(Math.random() * size)
}

export function backDir(direction: [number, number]): [number, number] {
    return [-direction[0], -direction[1]]
}

export function rightDir(direction: [number, number]): [number, number] {
    return [+!direction[0], +!direction[1]]
}

export function leftDir(direction: [number, number]): [number, number] {
    return [+!-direction[0], +!-direction[1]]
}


export function colorForGenes(genome: GEN[]) {
    const color = [127, 127, 127];
    for (let x = 0; x < genome.length; x++) {
        switch (genome[x]) {
            case GEN.PASS: break;
            case GEN.MOVE_F: color[0] += 150; break;
            case GEN.MOVE_B: color[0] += 150; break;
            case GEN.MOVE_L: color[0] += 150; break;
            case GEN.MOVE_R: color[0] += 150; break;

            case GEN.ABSORB: color[1] += 255; break;

            case GEN.INC_PR: color[2] += 255; break;
            case GEN.INC_DU: color[1] += 180; color[2] += 180; break;
            case GEN.INC_AG: color[0] += 255; break;

            case GEN.SHARE: color[0] += 180; color[1] += 180; break;
            case GEN.IF_TRUE: color.forEach((v, i) => color[i] += 255);
        }
    }
    color[0] = Math.trunc(color[0] / genome.length)
    color[1] = Math.trunc(color[1] / genome.length)
    color[2] = Math.trunc(color[2] / genome.length)

    return color
}