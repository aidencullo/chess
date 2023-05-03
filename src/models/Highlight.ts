export class Highlight {    
    _options: string[] = ["open", "attack", "unavailable"];
    _state: string;

    constructor(state : string) {
	if (!this._options.includes(state)) {
	    throw new Error("Error on highlight construction, name parameter not an acceptable option")
	}
	this._state = state;
    }
}

