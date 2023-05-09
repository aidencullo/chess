/*
 * Integration test for Queen object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Queen } from '@models/composite/pieces/Queen';

test("test constructors with acceptable string input", () => {

    expect(() => new Queen("white", 0)).not.toThrowError();
    expect(() => new Queen("black", 1)).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const queen = new Queen("white", 0);
    
    expect(queen.isQueen()).toBe(true);    
    expect(queen.isKing()).toBe(false);    
    expect(queen.isPawn()).toBe(false);    
    expect(queen.isKnight()).toBe(false);    
    expect(queen.isBishop()).toBe(false);    
    expect(queen.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Queen("green", 0)).toThrowError();
    expect(() => new Queen("", 1)).toThrowError();
    expect(() => new Queen("jlskadf", 1)).toThrowError();
    expect(() => new Queen("whit", 1)).toThrowError();
    expect(() => new Queen("white", 100)).toThrowError();
    expect(() => new Queen("white", -1)).toThrowError();
    
})
