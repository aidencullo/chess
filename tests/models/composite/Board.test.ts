/*
 * Integration test for Piece object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Board } from '@models/composite/Board';
import { Square } from '@models/composite/Square';

test("test constructors with acceptable string input", () => {

    expect(() => new Board("empty")).not.toThrowError();
    expect(() => new Board("standard")).not.toThrowError();
    
})

test("test type value after constructor", () => {
    
    const board = new Board("empty");

    expect(board.getSquares()).toStrictEqual(new Array(64).fill(new Square(null)));
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Board("")).toThrowError();
    expect(() => new Board("other")).toThrowError();
    expect(() => new Board("custom")).toThrowError();
    expect(() => new Board("     ")).toThrowError();
    
})
