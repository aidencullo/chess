/*
 * Integration test for Piece object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Board } from '@models/composite/Board';
import { Square } from '@models/composite/Square';
import { Rook } from '@models/composite/pieces/Rook';
import { Knight } from '@models/composite/pieces/Knight';
import { Bishop } from '@models/composite/pieces/Bishop';
import { Queen } from '@models/composite/pieces/Queen';
import { King } from '@models/composite/pieces/King';
import { Pawn } from '@models/composite/pieces/Pawn';

test("test constructors with acceptable string input", () => {

    expect(() => new Board("empty")).not.toThrowError();
    expect(() => new Board("standard")).not.toThrowError();
    
})

test("test type value after constructor", () => {
    
    const board = new Board("empty");

    expect(board.getSquares()).toStrictEqual(new Array(64).fill(new Square(null)));

    const standardBoard = new Board("standard");

    expect(standardBoard.getPiece(0)).toStrictEqual(new Rook("black", 0));
    expect(standardBoard.getPiece(1)).toStrictEqual(new Knight("black", 1));
    expect(standardBoard.getPiece(2)).toStrictEqual(new Bishop("black", 2));
    expect(standardBoard.getPiece(3)).toStrictEqual(new Queen("black", 3));
    expect(standardBoard.getPiece(4)).toStrictEqual(new King("black", 4));
    expect(standardBoard.getPiece(5)).toStrictEqual(new Bishop("black", 5));
    expect(standardBoard.getPiece(8)).toStrictEqual(new Pawn("black", 8));

})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Board("")).toThrowError();
    expect(() => new Board("other")).toThrowError();
    expect(() => new Board("custom")).toThrowError();
    expect(() => new Board("     ")).toThrowError();
    
})
