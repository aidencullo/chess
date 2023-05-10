/* 
 * Rook chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class Rook extends Piece {    
    constructor(color : string) {
	super("rook", color);
    }
}
