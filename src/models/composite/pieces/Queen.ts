/* 
 * Queen chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class Queen extends Piece {    
    constructor(color : string) {
	super("queen", color);
    }
}
