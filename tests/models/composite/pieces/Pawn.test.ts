/*
 * Integration test for Pawn object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Pawn } from '@models/composite/pieces/Pawn';

test("test constructors with acceptable string input", () => {

    expect(() => new Pawn("white")).not.toThrowError();
    expect(() => new Pawn("black")).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const pawn = new Pawn("white");
    
    expect(pawn.isPawn()).toBe(true);    
    expect(pawn.isKing()).toBe(false);    
    expect(pawn.isBishop()).toBe(false);    
    expect(pawn.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Pawn("green")).toThrowError();
    expect(() => new Pawn("")).toThrowError();
    
})
