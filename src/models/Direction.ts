/* 
 * Direction of piece movement
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export class Direction {    
    readonly _directions: string[] = ["north", "south"];
    readonly _value: string;

    constructor(value : string) {
	if (!this._directions.includes(value)) {
	    throw new Error("Error on direction construction, value parameter not an acceptable direction")
	}	
	this._value = value;
    }

    isNorth() : boolean {
	return this._value === "north";
    }

    isSouth() : boolean {
	return this._value === "south";
    }
}
