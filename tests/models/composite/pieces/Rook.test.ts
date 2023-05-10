/*
 * Integration test for Rook object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Rook } from '@models/composite/pieces/Rook';

test("test constructors with acceptable string input", () => {

    expect(() => new Rook("white")).not.toThrowError();
    expect(() => new Rook("black")).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const rook = new Rook("white");
    
    expect(rook.isRook()).toBe(true);    
    expect(rook.isPawn()).toBe(false);    
    expect(rook.isKnight()).toBe(false);    
    expect(rook.isKing()).toBe(false);    
    expect(rook.isBishop()).toBe(false);    
    expect(rook.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Rook("green")).toThrowError();
    expect(() => new Rook("")).toThrowError();
    
})
