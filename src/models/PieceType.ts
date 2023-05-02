export class PieceType {    
    _name: String;
    
    constructor(name : String) {
	this._name = name;
    }
    
    get name(): String {
	return this._name;
    }

    set name(name: String) {
	this._name = name;
    }

}

