export class Highlight {    
    _options: string[] = ["open", "attack", "unavailable", "enpassant"];
    _state: string;

    constructor(state : string) {
	if (!this._options.includes(state)) {
	    throw new Error("Error on highlight construction, name parameter not an acceptable option")
	}
	this._state = state;
    }

    isOpen() {
	return this._state === "open";
    }
    
    isAttack() {
	return this._state === "attack";
    }
    
    isUnavailable() {
	return this._state === "unavailable";
    }
    
    isEnPassant() {
	return this._state === "unavailable";
    }


}

