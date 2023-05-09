/*
 * Integration test for Pawn object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Pawn } from '@models/composite/pieces/Pawn';

test("test constructors with acceptable string input", () => {

    expect(() => new Pawn("white", 0)).not.toThrowError();
    expect(() => new Pawn("black", 1)).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const pawn = new Pawn("white", 0);
    
    expect(pawn.isPawn()).toBe(true);    
    expect(pawn.isKing()).toBe(false);    
    expect(pawn.isBishop()).toBe(false);    
    expect(pawn.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Pawn("green", 0)).toThrowError();
    expect(() => new Pawn("", 1)).toThrowError();
    expect(() => new Pawn("jlskadf", 1)).toThrowError();
    expect(() => new Pawn("whit", 1)).toThrowError();
    expect(() => new Pawn("white", 100)).toThrowError();
    expect(() => new Pawn("white", -1)).toThrowError();
    
})
