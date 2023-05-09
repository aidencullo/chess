/*
 * Integration test for Pawn object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Pawn } from '@models/composite/pieces/Pawn';

test("test constructors with acceptable string input", () => {

    expect(() => new Pawn("pawn", "white")).not.toThrowError();
    expect(() => new Pawn("pawn", "black")).not.toThrowError();
    expect(() => new Pawn("knight", "white")).not.toThrowError();
    expect(() => new Pawn("bishop", "white")).not.toThrowError();
    expect(() => new Pawn("rook", "white")).not.toThrowError();
    expect(() => new Pawn("queen", "white")).not.toThrowError();
    expect(() => new Pawn("king", "white")).not.toThrowError();
    
})

test("test type value after constructor", () => {
    
    const testWhitePawn = new Pawn("pawn", "white");
    expect(testWhitePawn.isWhite()).toBe(true);
    expect(testWhitePawn.isPawn()).toBe(true);
    expect(testWhitePawn.isBishop()).toBe(false);
    expect(testWhitePawn.isKnight()).toBe(false);
    expect(testWhitePawn.isRook()).toBe(false);
    expect(testWhitePawn.isQueen()).toBe(false);
    expect(testWhitePawn.isKing()).toBe(false);
    
    const testBlackPawn = new Pawn("pawn", "black");
    expect(testBlackPawn.isWhite()).toBe(false);
    expect(testBlackPawn.isPawn()).toBe(true);
    expect(testBlackPawn.isKing()).toBe(false);
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Pawn("","")).toThrowError();
    expect(() => new Pawn("pawn","")).toThrowError();
    expect(() => new Pawn("pawn","red")).toThrowError();
    expect(() => new Pawn("knight","red")).toThrowError();
    expect(() => new Pawn("king","WHITE")).toThrowError();
    expect(() => new Pawn("person","white")).toThrowError();
    expect(() => new Pawn("white","WHITE")).toThrowError();
    expect(() => new Pawn("pawn","w")).toThrowError();
    expect(() => new Pawn("bishop","")).toThrowError();
    expect(() => new Pawn("rook","    ")).toThrowError();
    
})
