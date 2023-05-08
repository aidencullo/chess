/* 
 * Chess piece
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { PieceType } from '@models/PieceType';
import { Color } from '@models/Color';

export class Piece {    
    private _color: Color;
    private _pieceType: PieceType;
    
    constructor(pieceType : string, color : string) {
	this._color = new Color(color);
	this._pieceType = new PieceType(pieceType);
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
