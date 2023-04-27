import { BOARD_WIDTH } from 'data';

/* 
 * Geometry helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

function distance(p1, p2) {
    const rd = Math.abs(this.row(p1) - this.row(p2));
    const cd = Math.abs(this.column(p1) - this.column(p2));
    return Math.sqrt(rd * rd + cd * cd);
}

function row(index) {
    return Math.floor(index / BOARD_WIDTH);
}

function column(index) {
    return index % BOARD_WIDTH;
}

export { row, column, distance };
