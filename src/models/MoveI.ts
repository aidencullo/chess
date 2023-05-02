import { PieceI } from '@/models/PieceI';

export interface MoveI {
    start: number;
    end: number;
    piece: PieceI;
}

export function isEqualMove(m1 : MoveI, m2 : MoveI) {
    return JSON.stringify(m1) === JSON.stringify(m2);
}
