/* 
 * Type of chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export class PieceType {    
    readonly _types: string[] = ["pawn", "knight", "bishop", "rook", "queen", "king"];
    private _type: string;
    
    constructor(type : string) {
	if (!this._types.includes(type)) {
	    throw new Error("Error on PieceType construction, type parameter not an acceptable type")
	}
	this._type = type;
    }

    promote(type: string) : void {
	if (!this._types.includes(type)) {
	    throw new Error("Error on PieceType promition, type parameter not an acceptable type")
	}
	this._type = type;
    }

    isPawn() {
	return this._type === "pawn";
    }

    isKnight() {
	return this._type === "knight";
    }

    isBishop() {
	return this._type === "bishop";
    }

    isRook() {
	return this._type === "rook";
    }

    isQueen() {
	return this._type === "queen";
    }

    isKing() {
	return this._type === "king";
    }
}
