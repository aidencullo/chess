/* 
 * King chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

export class King extends Piece {    
    
    constructor(color : string, index : number) {
	super("king", color, index);
    }

}
