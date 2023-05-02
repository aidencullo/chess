import { PieceType } from '@/models/PieceType';
import { Color } from '@/models/Color';

export class Piece {    
    readonly color: Color;
    _pieceType: PieceType;
    
    constructor(color : Color, pieceType : PieceType) {
	this.color = color;
	this._pieceType = pieceType;
    }
    
    get pieceType(): PieceType {
	return this._pieceType;
    }

    set pieceType(pieceType: PieceType) {
	this._pieceType = pieceType;
    }

    isNoPiece() : boolean {
	return this._pieceType as unknown as boolean;
    }
}
