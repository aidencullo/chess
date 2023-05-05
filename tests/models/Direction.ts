/* 
 * Direction of piece movement
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export class Direction {    
    _value: String;

    constructor(value : String) {
	this._value = value;
    }

    get value(): String {
	return this._value;
    }

    set value(value: String) {
	this._value = value;
    }
    
}

