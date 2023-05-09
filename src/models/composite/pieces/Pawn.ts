/* 
 * Chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class Pawn extends Piece {    
    
    constructor(color : string) {
	super("pawn", color)
    }
    
}
