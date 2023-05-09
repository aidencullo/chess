/*
 * Integration test for chessboard square object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/composite/Square';
import { Pawn } from '@models/composite/pieces/Pawn';
import { King } from '@models/composite/pieces/King';
import { Knight } from '@models/composite/pieces/Knight';

test("test constructors with acceptable input", () => {
    const pawnWhite = new Pawn("white", 0);
    const pawnBlack = new Pawn("black", 0);
    const king = new King("white", 0);
    
    expect(() => new Square(null)).not.toThrowError();
    expect(() => new Square(pawnWhite)).not.toThrowError();
    expect(() => new Square(pawnBlack)).not.toThrowError();
    expect(() => new Square(king)).not.toThrowError();
    
})

test("test value after constructor", () => {

    const pawn = new Pawn("black", 0);
    const knight = new Knight("black", 0);
    const pawnSquare = new Square(pawn);
    
    expect(pawnSquare.hasPiece()).toBe(true);
    expect(pawnSquare.getPiece()).toBe(pawn);
    expect(pawnSquare.getPiece()).not.toBe(knight);

    pawnSquare.setEmpty();

    expect(pawnSquare.getPiece()).toBe(null);
    expect(pawnSquare.hasPiece()).toBe(false);
    
    const nullSquare = new Square(null);

    expect(nullSquare.hasPiece()).toBe(false);
    expect(nullSquare.getPiece()).toBe(null);

    nullSquare.setEmpty();
    
    expect(nullSquare.hasPiece()).toBe(false);
    expect(nullSquare.getPiece()).toBe(null);

    nullSquare.setPiece(pawn);
    
    expect(nullSquare.hasPiece()).toBe(true);
    expect(nullSquare.getPiece()).toBe(pawn);
    expect(nullSquare.getPiece()).not.toBe(knight);
    
})
