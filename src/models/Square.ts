import { Piece } from '@models/Piece';

export class Square {
    piece: Piece;

    constructor(piece : Piece | null) {
	this.piece = piece;
    }
}
