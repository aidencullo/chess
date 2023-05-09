/* 
 * Direction of piece movement
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export class Highlight {    
    readonly _options: string[] = ["open", "attack", "closed", "enpassant"];
    private _value: string;

    constructor(value : string) {
	if (!this._options.includes(value)) {
	    throw new Error("Error on highlight construction, name parameter not an acceptable option")
	}
	this._value = value;
    }

    isOpen() : boolean {
	return this._value === "open";
    }
    
    isAttack() : boolean {
	return this._value === "attack";
    }
    
    isClosed() : boolean {
	return this._value === "closed";
    }
    
    isEnPassant() : boolean {
	return this._value === "enpassant";
    }

    setOpen() : void {
	this._value = "open";
    }    
        
    setAttack() : void {
	this._value = "attack";
    }
    
    setClosed() : void {
	this._value = "closed";
    }
    
    setEnPassant() : void {
	this._value = "enpassant";
    }
}

