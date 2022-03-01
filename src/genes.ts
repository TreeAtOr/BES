export const DESTROY = -1;
export const GENES_NUMBER = 23;
export enum GEN {
    PASS    = 0,
    MOVE_F  = 1,
    MOVE_B  = 2,
    MOVE_L  = 3,
    MOVE_R  = 4,
    ABSORB  = 5,
    INC_PR  = 6,
    INC_DU  = 7,
    INC_AG  = 8,
    SHARE   = 9,

    IF_TRUE = 10,
    IF_NOT  = 11,
    IF_MORE = 12,
    IF_LESS = 13,
    IF_EQU  = 14,

    WHILE   = 15,
    GO_TO   = 16,

    LOOK_F  = 17,
    LOOK_B  = 18,
    LOOK_L  = 19,
    LOOK_R  = 20,

    ROT_L   = 21,
    ROT_R   = 22,

    GT_LIGHT= 23,

    SHARE_F = 24,
    SHARE_B = 25,
    SHARE_L = 26,
    SHARE_R = 27,

    ATT_F = 28,
    ATT_B = 29,
    ATT_L = 30,
    ATT_R = 31
}