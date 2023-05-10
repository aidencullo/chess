/*
 * Integration test for King object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { King } from '@models/composite/pieces/King';

test("test constructors with acceptable string input", () => {

    expect(() => new King("white")).not.toThrowError();
    expect(() => new King("black")).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const king = new King("white");
    
    expect(king.isKing()).toBe(true);    
    expect(king.isPawn()).toBe(false);    
    expect(king.isBishop()).toBe(false);    
    expect(king.isKnight()).toBe(false);    
    expect(king.isQueen()).toBe(false);    
    expect(king.isWhite()).toBe(true);    
    
})

test("constructor with incorrect value passed", () => {
    
    expect(() => new King("green")).toThrowError();
    expect(() => new King("")).toThrowError();
    
})
