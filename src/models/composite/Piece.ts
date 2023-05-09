/* 
 * Chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { PieceType } from '@models/modular/PieceType';
import { Color } from '@models/modular/Color';

export abstract class Piece {    
    protected _index: number;
    private _color: Color;
    private _pieceType: PieceType;
    
    constructor(pieceType : string, color : string, index : number) {
	this._color = new Color(color);
	this._pieceType = new PieceType(pieceType);
	if (index < 0 || index > 63) {
	    throw new Error("piece instantiated with invalid index");
	}
	this._index = index;
    }

    isWhite() {
	return this._color.isWhite();
    }

    isPawn() {
	return this._pieceType.isPawn();
    }

    isKnight() {
	return this._pieceType.isKnight();
    }

    isBishop() {
	return this._pieceType.isBishop();
    }

    isRook() {
	return this._pieceType.isRook();
    }

    isQueen() {
	return this._pieceType.isQueen();
    }

    isKing() {
	return this._pieceType.isKing();
    }

}
