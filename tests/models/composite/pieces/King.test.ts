/*
 * Integration test for King object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { King } from '@models/composite/pieces/King';

test("test constructors with acceptable string input", () => {

    expect(() => new King("white", 0)).not.toThrowError();
    expect(() => new King("black", 1)).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const king = new King("white", 0);
    
    expect(king.isKing()).toBe(true);    
    expect(king.isPawn()).toBe(false);    
    expect(king.isBishop()).toBe(false);    
    expect(king.isKnight()).toBe(false);    
    expect(king.isQueen()).toBe(false);    
    expect(king.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new King("green", 0)).toThrowError();
    expect(() => new King("", 1)).toThrowError();
    expect(() => new King("jlskadf", 1)).toThrowError();
    expect(() => new King("whit", 1)).toThrowError();
    expect(() => new King("white", 100)).toThrowError();
    expect(() => new King("white", -1)).toThrowError();
    
})
