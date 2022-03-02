# Bytecode-based evolution simulation prototype 

## The concept 

**Creature** - the base block of the simulation with its behavior stored in the *genome* - set of internal instructions. To continue genome execution creature uses energy - that can be absorbed from light or by eating other creatures. During lifespan creatures can increase the *durability* - a value of damage that must be dealt to destroy them, and *aggression* - a value of damage dealt by the creature. *Protection* - another way to defend yourself by blocking incoming damage. When the energy of the creature becomes high enough it split and copies itself with possible mutations thas case randomization of some genes. When energy falls to zero creature dies. It starts the process of decay - it means the creature's "body" stays on the field consuming durability.

**Tile** - the base block of envarement that in this prototype only contains the value of *light level*. Creatures can only be on one tile. The light level is not const - it can be change in time.

## The Implementation

This prototype written on TypeScript using canvas and on the current sage of development have only number sequence instead of "bypecode". After concept experementation here a will re-implement it on low-level programming language, like C++, C or Rust. 