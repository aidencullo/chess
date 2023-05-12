import { BOARD_WIDTH } from '@/constants/board';

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

export function down(index : number, step : number) {
    return index + (BOARD_WIDTH * step);
}

export function up(index : number, step : number) {
    return index - (BOARD_WIDTH * step);
}

export function onBoard(index : number) {
    return index > 0 && index < 64;
}

export function isWestEdge(index : number) {
    return column(index) === 0;
}

export function isEastEdge(index : number) {
    return column(index) === 7;
}

