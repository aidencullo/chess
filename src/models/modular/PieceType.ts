/* 
 * Type of chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export class PieceType {    
    readonly _models: string[] = ["pawn", "knight", "bishop", "rook", "queen", "king"];
    private _type: string;
    
    constructor(type : string) {
	if (!this._models.includes(type)) {
	    throw new Error("Error on PieceType construction, type parameter not an acceptable type")
	}
	this._type = type;
    }

    promote(type: string) : void {
	if (type === "pawn") {
	    throw new Error("Error on PieceType promition, cannot promote to a pawn")
	}
	if (!this._models.includes(type)) {
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
