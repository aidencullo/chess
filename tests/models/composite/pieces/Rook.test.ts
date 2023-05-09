/*
 * Integration test for Rook object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Rook } from '@models/composite/pieces/Rook';

test("test constructors with acceptable string input", () => {

    expect(() => new Rook("white", 0)).not.toThrowError();
    expect(() => new Rook("black", 1)).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const rook = new Rook("white", 0);
    
    expect(rook.isRook()).toBe(true);    
    expect(rook.isPawn()).toBe(false);    
    expect(rook.isKnight()).toBe(false);    
    expect(rook.isKing()).toBe(false);    
    expect(rook.isBishop()).toBe(false);    
    expect(rook.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Rook("green", 0)).toThrowError();
    expect(() => new Rook("", 1)).toThrowError();
    expect(() => new Rook("jlskadf", 1)).toThrowError();
    expect(() => new Rook("whit", 1)).toThrowError();
    expect(() => new Rook("white", 100)).toThrowError();
    expect(() => new Rook("white", -1)).toThrowError();
    
})
