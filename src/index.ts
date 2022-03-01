import { Tile } from "./classes/tile";
import { SCALE, SIZE, TICK_SPEED } from "./constants";
import { init } from "./processor/init";
import { step } from "./processor/step";



function snapshot(field: Tile[][]){
  const scorebord = new Map<string,number>();
  for (const column of field) {
    for (const tile of column) {
      if(tile.creature) {
        const name = tile.creature.genome.join('|')
        if(!scorebord.get(name)){
          scorebord.set(name,1);
        }
        scorebord.set(name,scorebord.get(name)+1);
      }
    }
  }

  const scorebord_arr: any[] = [];
  scorebord.forEach((val,key)=> {
    scorebord_arr.push([val,key])
  })
  scorebord_arr.sort((a,b)=> b[0] - a[0])
  return scorebord_arr
}

const light = (x:number, y:number) =>  150


function CanvasComponent(){
  const element: HTMLCanvasElement = document.createElement('canvas');
  element.height = SIZE * SCALE;
  element.width = SIZE * SCALE;

  const ctx = element.getContext("2d");
  ctx.imageSmoothingEnabled = false

  const field = init(light);
  setInterval(()=>step(field,ctx), TICK_SPEED)
  setInterval(()=>console.log(snapshot(field)),10000)
  return element;
}

document.body.appendChild(CanvasComponent());
