export class Highlight {    
    _options: string[] = ["open", "attack"];
    _state: String;

    constructor(name : String) {
	console.log("highlight constructor")
	if (name && !this._colors.includes(name)) {
	    throw new Error("Error on color construction, name parameter not an acceptable color")
	}
	this._state = name;
    }
}

