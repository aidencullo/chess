import { PieceType } from '@models/PieceType';
import { Color } from '@models/Color';

export class Piece {    
    _color: Color;
    _pieceType: PieceType;
    
    constructor(color : Color, pieceType : PieceType) {
	if (color === undefined || pieceType === undefined) {
	    throw new Error("Error on piece construction, color or pieceType object is undefined")
	}
	this._color = color;
	this._pieceType = pieceType;
    }

    get pieceType(): PieceType {
	return this._pieceType;
    }

    set pieceType(pieceType: PieceType) {
	this._pieceType = pieceType;
    }

    get color(): Color {
	return this._color;
    }

    set color(color: Color) {
	this._color = color;
    }

    isWhite() {
	return this._color.isWhite();
    }
}
