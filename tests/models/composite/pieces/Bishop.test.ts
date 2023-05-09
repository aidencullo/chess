/*
 * Integration test for Bishop object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Bishop } from '@models/composite/pieces/Bishop';

test("test constructors with acceptable string input", () => {

    expect(() => new Bishop("white", 0)).not.toThrowError();
    expect(() => new Bishop("black", 1)).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const bishop = new Bishop("white", 0);
    
    expect(bishop.isPawn()).toBe(false);    
    expect(bishop.isKnight()).toBe(false);    
    expect(bishop.isQueen()).toBe(false);    
    expect(bishop.isKing()).toBe(false);    
    expect(bishop.isBishop()).toBe(true);    
    expect(bishop.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Bishop("green", 0)).toThrowError();
    expect(() => new Bishop("", 1)).toThrowError();
    expect(() => new Bishop("jlskadf", 1)).toThrowError();
    expect(() => new Bishop("whit", 1)).toThrowError();
    expect(() => new Bishop("white", 100)).toThrowError();
    expect(() => new Bishop("white", -1)).toThrowError();
    
})
