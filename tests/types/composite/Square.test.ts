/*
 * Integration test for chessboard square object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Square } from '@models/Square';
import { Piece } from '@models/Piece';

test("test constructors with acceptable input", () => {

    const pawnWhite = new Piece("pawn", "white");
    const pawnBlack = new Piece("pawn", "black");
    const king = new Piece("king", "white");
    
    expect(() => new Square(null)).not.toThrowError();
    expect(() => new Square(pawnWhite)).not.toThrowError();
    expect(() => new Square(pawnBlack)).not.toThrowError();
    expect(() => new Square(king)).not.toThrowError();
    
})

test("test value after constructor", () => {

    const pawn = new Piece("pawn", "black");
    const knight = new Piece("pawn", "black");
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
