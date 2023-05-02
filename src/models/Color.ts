export class Color {    
    readonly name: String;

    constructor(name : String) {
	this.name = name;
    }

    isWhite() : boolean {
	return this.name === "white";
    }
}

