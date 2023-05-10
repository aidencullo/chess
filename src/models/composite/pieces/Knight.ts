/* 
 * Knight chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class Knight extends Piece {    
    constructor(color : string) {
	super("knight", color);
    }
}
