/*
 * Integration test for Bishop object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Bishop } from '@models/composite/pieces/Bishop';

test("test constructors with acceptable string input", () => {

    expect(() => new Bishop("white")).not.toThrowError();
    expect(() => new Bishop("black")).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const bishop = new Bishop("white");
    
    expect(bishop.isPawn()).toBe(false);    
    expect(bishop.isKnight()).toBe(false);    
    expect(bishop.isQueen()).toBe(false);    
    expect(bishop.isKing()).toBe(false);    
    expect(bishop.isBishop()).toBe(true);    
    expect(bishop.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Bishop("green")).toThrowError();
    expect(() => new Bishop("")).toThrowError();
    
})
