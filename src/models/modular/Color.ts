/* 
 * Color of piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export class Color {    
    readonly _colors: string[] = ["white", "black"];
    readonly _value: string;

    constructor(value : string) {
	if (!this._colors.includes(value)) {
	    throw new Error("Error on color construction, value parameter not an acceptable color")
	}	
	this._value = value;
    }

    isWhite() : boolean {
	return this._value === "white";
    }

    getColor() : string {
	return this._value;
    }
}



