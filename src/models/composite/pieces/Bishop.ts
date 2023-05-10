/* 
 * Bishop chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class Bishop extends Piece {        
    constructor(color : string) {
	super("bishop", color);
    }
}
