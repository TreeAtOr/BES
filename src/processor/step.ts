import { constant } from "lodash";
import { Tile } from "../classes/tile";
import { DAY_LENGTH, MORNING_LIGHT_VALUE, NIGHT_LIGHT_VALUE, SCALE, SIZE } from "../constants";
import { DESTROY, GEN } from "../genes";
import { backDir, leftDir, rightDir, roundCords } from "../utils";
import { absorb, changeAgro, changeDurability, changeProtection, goto, ifEqu, ifLess, ifMore, ifNot, ifTrue, look, moveCreature, rotateLeft, rotateRight, shareEnergy, splitCreatue } from "./actions";


export function getByDir(field: any[][], dir: [number, number], x: number, y: number) {
  return field[roundCords(x + dir[0])][roundCords(y + dir[1])]
}
export function process(tile: Tile, field: Array<Array<Tile>>, x: number, y: number): number | boolean | void {

  const action = tile.tick();
  const d = tile.creature.direction
  if (!action) return;

  if (tile.creature && tile.creature.enegry > 50) splitCreatue(tile, field, x, y)

  switch (action) {
    case DESTROY: return delete tile.creature;

    case GEN.ABSORB: return absorb(tile);

    case GEN.MOVE_F: return moveCreature(tile, getByDir(field, d, x, y));
    case GEN.MOVE_B: return moveCreature(tile, getByDir(field, backDir(d), x, y), true);
    case GEN.MOVE_L: return moveCreature(tile, getByDir(field, leftDir(d), x, y));
    case GEN.MOVE_R: return moveCreature(tile, getByDir(field, rightDir(d), x, y), true);

    case GEN.INC_AG: return changeAgro(tile, 10);
    case GEN.INC_PR: return changeProtection(tile, 1);
    case GEN.INC_DU: return changeDurability(tile, 5);

    case GEN.SHARE: return shareEnergy(tile, field, x, y);

    case GEN.IF_TRUE  : ifTrue(tile);
      return process(tile, field, x, y);
    case GEN.IF_NOT   : ifNot(tile);
      return process(tile, field, x, y);
    case GEN.IF_MORE  : ifMore(tile);
    return process(tile, field, x, y);
    case GEN.IF_LESS  : ifLess(tile);
    return process(tile, field, x, y);
    case GEN.IF_EQU   : ifEqu(tile);
    return process(tile, field, x, y);

    case GEN.WHILE    : return 0;

    case GEN.GO_TO    : goto(tile);
    return process(tile, field, x, y);

    case GEN.LOOK_F   :  return look(tile, getByDir(field, d,x,y))
    case GEN.LOOK_B   :  return look(tile, getByDir(field, backDir(d),x,y));
    case GEN.LOOK_L   :  return look(tile, getByDir(field, leftDir(d),x,y));
    case GEN.LOOK_R   :  return look(tile, getByDir(field, rightDir(d),x,y));

    case GEN.ROT_L    : return rotateLeft(tile);
    case GEN.ROT_R    : return rotateRight(tile);

    case GEN.GT_LIGHT : return;
    case GEN.SHARE_F  : return;
    case GEN.SHARE_B  : return;
    case GEN.SHARE_L  : return;
    case GEN.SHARE_R  : return;
    case GEN.ATT_F    : return;
    case GEN.ATT_B    : return;
    case GEN.ATT_L    : return;
    case GEN.ATT_R    : return;
    default: return console.error("Unknown action was found");
  }

}

let _step = 0
export function step(field: Array<Array<Tile>>, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#f00'
  ctx.fillRect(0, 0, SIZE * SCALE, SIZE * SCALE)
  _step++
  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      const tile = field[x][y];
      tile.lightLevel = (1 + Math.sin(Math.PI / 2 + _step / (DAY_LENGTH * Math.PI) ) ) * ( MORNING_LIGHT_VALUE - NIGHT_LIGHT_VALUE) + NIGHT_LIGHT_VALUE
      if (tile.creature) tile.creature.result_value = Number(process(tile, field, x, y));
      ctx.fillStyle = tile.color;
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }
  }
}