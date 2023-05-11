/* 
 * Array of highlight objects
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Highlight } from '@models/modular/Highlight';

export class HighlightBoard {
    static createClosedBoard() {
	return new Array(64).fill(null).map(() => new Highlight("closed"));
    }    

    static createOpenBoard() {
	return new Array(64).fill(null).map(() => new Highlight("open"));
    }    

}
