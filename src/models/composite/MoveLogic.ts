/* 
 * Chess piece move logic
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/composite/Square';
import { Highlight } from '@models/modular/Highlight';

export class MoveLogic {
    private _squares : Square[];

    constructor(squares : Square[]) {
	this._squares = squares;
    }

    getMoves(index : number) {
	return new Array(64).fill({}).map(() => new Highlight("attack"));
    }
}
