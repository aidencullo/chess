import { BOARD_WIDTH } from '@/enums/constants';

/* 
 * Geometry helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function distance(p1 : number, p2 : number) {
    const rd = Math.abs(row(p1) - row(p2));
    const cd = Math.abs(column(p1) - column(p2));
    return Math.sqrt(rd * rd + cd * cd);
}

export function row(index : number) {
    return Math.floor(index / BOARD_WIDTH);
}

export function column(index : number) {
    return index % BOARD_WIDTH;
}
