/*
 * Integration test for Piece object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Piece } from '@models/composite/Piece';

test("test constructors with acceptable string input", () => {

    expect(() => new Piece("pawn", "white")).not.toThrowError();
    expect(() => new Piece("pawn", "black")).not.toThrowError();
    expect(() => new Piece("knight", "white")).not.toThrowError();
    expect(() => new Piece("bishop", "white")).not.toThrowError();
    expect(() => new Piece("rook", "white")).not.toThrowError();
    expect(() => new Piece("queen", "white")).not.toThrowError();
    expect(() => new Piece("king", "white")).not.toThrowError();
    
})

test("test type value after constructor", () => {
    
    const testWhitePawn = new Piece("pawn", "white");
    expect(testWhitePawn.isWhite()).toBe(true);
    expect(testWhitePawn.isPawn()).toBe(true);
    expect(testWhitePawn.isBishop()).toBe(false);
    expect(testWhitePawn.isKnight()).toBe(false);
    expect(testWhitePawn.isRook()).toBe(false);
    expect(testWhitePawn.isQueen()).toBe(false);
    expect(testWhitePawn.isKing()).toBe(false);
    
    const testBlackPawn = new Piece("pawn", "black");
    expect(testBlackPawn.isWhite()).toBe(false);
    expect(testBlackPawn.isPawn()).toBe(true);
    expect(testBlackPawn.isKing()).toBe(false);
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Piece("","")).toThrowError();
    expect(() => new Piece("pawn","")).toThrowError();
    expect(() => new Piece("pawn","red")).toThrowError();
    expect(() => new Piece("knight","red")).toThrowError();
    expect(() => new Piece("king","WHITE")).toThrowError();
    expect(() => new Piece("person","white")).toThrowError();
    expect(() => new Piece("white","WHITE")).toThrowError();
    expect(() => new Piece("pawn","w")).toThrowError();
    expect(() => new Piece("bishop","")).toThrowError();
    expect(() => new Piece("rook","    ")).toThrowError();
    
})
