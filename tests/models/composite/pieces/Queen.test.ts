/*
 * Integration test for Queen object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Queen } from '@models/composite/pieces/Queen';

test("test constructors with acceptable string input", () => {

    expect(() => new Queen("white")).not.toThrowError();
    expect(() => new Queen("black")).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const queen = new Queen("white");
    
    expect(queen.isQueen()).toBe(true);    
    expect(queen.isKing()).toBe(false);    
    expect(queen.isPawn()).toBe(false);    
    expect(queen.isKnight()).toBe(false);    
    expect(queen.isBishop()).toBe(false);    
    expect(queen.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Queen("green")).toThrowError();
    expect(() => new Queen("")).toThrowError();
    
})
