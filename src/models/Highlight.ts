/* 
 * Direction of piece movement
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export class Highlight {    
    readonly _options: string[] = ["open", "attack", "closed", "enpassant"];
    private _value: string;

    constructor(value : string) {
	if (!this._options.includes(value)) {
	    throw new Error("Error on highlight construction, name parameter not an acceptable option")
	}
	this._value = value;
    }

    isOpen() {
	return this._value === "open";
    }
    
    isAttack() {
	return this._value === "attack";
    }
    
    isClosed() {
	return this._value === "closed";
    }
    
    isEnPassant() {
	return this._value === "enpassant";
    }
}

