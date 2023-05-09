/*
 * Integration test for Knight object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Knight } from '@models/composite/pieces/Knight';

test("test constructors with acceptable string input", () => {

    expect(() => new Knight("white", 0)).not.toThrowError();
    expect(() => new Knight("black", 1)).not.toThrowError();
    
})

test("test type value after constructor", () => {

    const knight = new Knight("white", 0);
    
    expect(knight.isPawn()).toBe(false);    
    expect(knight.isKnight()).toBe(true);    
    expect(knight.isKing()).toBe(false);    
    expect(knight.isBishop()).toBe(false);    
    expect(knight.isWhite()).toBe(true);    
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Knight("green", 0)).toThrowError();
    expect(() => new Knight("", 1)).toThrowError();
    expect(() => new Knight("jlskadf", 1)).toThrowError();
    expect(() => new Knight("whit", 1)).toThrowError();
    expect(() => new Knight("white", 100)).toThrowError();
    expect(() => new Knight("white", -1)).toThrowError();
    
})
