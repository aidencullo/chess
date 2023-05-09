/*
 * Unit test for PieceType object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { PieceType } from '@models/modular/PieceType';

test("test constructors with acceptable string input", () => {
    
    expect(() => new PieceType("pawn")).not.toThrowError();
    expect(() => new PieceType("knight")).not.toThrowError();
    expect(() => new PieceType("bishop")).not.toThrowError();
    expect(() => new PieceType("rook")).not.toThrowError();
    expect(() => new PieceType("queen")).not.toThrowError();
    expect(() => new PieceType("king")).not.toThrowError();
    
})

test("test type value after constructor", () => {
    
    const testPawn = new PieceType("pawn");
    expect(testPawn.isPawn()).toBe(true);

    const testKnight = new PieceType("knight");
    expect(testKnight.isKnight()).toBe(true);

    const testBishop = new PieceType("bishop");
    expect(testBishop.isBishop()).toBe(true);

    const testRook = new PieceType("rook");
    expect(testRook.isRook()).toBe(true);

    const testQueen = new PieceType("queen");
    expect(testQueen.isQueen()).toBe(true);

    const testKing = new PieceType("king");
    expect(testKing.isKing()).toBe(true);
    expect(testKing.isPawn()).toBe(false);
    expect(testKing.isKnight()).toBe(false);
    expect(testKing.isBishop()).toBe(false);
    expect(testKing.isRook()).toBe(false);
    expect(testKing.isQueen()).toBe(false);
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new PieceType("")).toThrowError();
    expect(() => new PieceType("man")).toThrowError();
    expect(() => new PieceType("KING")).toThrowError();
    
})

test("testing promotion", () => {

    const pawn = new PieceType("pawn");
    
    expect(() => pawn.promote("pawn")).toThrowError();
    expect(() => pawn.promote("not a pawn")).toThrowError();
    expect(() => pawn.promote("bishop")).not.toThrowError();
    expect(() => pawn.promote("knight")).not.toThrowError();
    expect(() => pawn.promote("rook")).not.toThrowError();
    expect(() => pawn.promote("queen")).not.toThrowError();
    expect(() => pawn.promote("king")).not.toThrowError();

})
