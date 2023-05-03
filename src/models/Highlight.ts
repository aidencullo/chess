export class Highlight {    
    _options: string[] = ["open", "attack"];
    _state: string;

    constructor(name : string) {
	console.log("highlight constructor")
	if (name && !this._options.includes(name)) {
	    throw new Error("Error on color construction, name parameter not an acceptable color")
	}
	this._state = name;
    }
}

