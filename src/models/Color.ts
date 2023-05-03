export class Color {    
    _colors: string[] = ["white", "black"];
    _name: String;

    constructor(name : String) {
	if (name === undefined) {
	    throw new Error("Error on color construction, name parameter (string) undefined")
	}
	if (!this._colors.includes(name)) {
	    throw new Error("Error on color construction, name parameter not an acceptable color")
	}	
	this._name = name;
    }

    isWhite() : boolean {
	return this._name === "white";
    }
}

