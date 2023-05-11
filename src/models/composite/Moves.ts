/* 
 * Chessboard
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';

export class Moves {
    private _squares : Square[];

    constructor(squares : Square[]) {
	this._squares = squares;
    }
    
    find(index : number) : Highlight[] {
	console.log(`find ${index} in moves`)
	console.log(`squares ${this._squares[0]} in moves`)
	return new Array(64).fill({}).map(() => new Highlight("open"))
    }
}
