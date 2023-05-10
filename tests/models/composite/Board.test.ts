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
import { Highlight } from '@models/modular/Highlight';

test("test constructors with acceptable string input", () => {

    expect(() => new Board("empty")).not.toThrowError();
    expect(() => new Board("standard")).not.toThrowError();
    
})

test("empty board constructor", () => {
    
    const board = new Board("empty");
    const squares = new Array(64).fill(null).map(() => new Square(null));

    expect(board.getSquares()).toStrictEqual(squares);

    board.getSquares()[0].setPiece(new Pawn("black"));
    squares[0].setPiece(new Pawn("black"))

    expect(board.getSquares()).toStrictEqual(squares);

})

test("standard board constructor", () => {
    
    const standardBoard = new Board("standard");

    expect(standardBoard.getPiece(0)).toStrictEqual(new Rook("black"));
    expect(standardBoard.getPiece(1)).toStrictEqual(new Knight("black"));
    expect(standardBoard.getPiece(2)).toStrictEqual(new Bishop("black"));
    expect(standardBoard.getPiece(3)).toStrictEqual(new Queen("black"));
    expect(standardBoard.getPiece(4)).toStrictEqual(new King("black"));
    expect(standardBoard.getPiece(5)).toStrictEqual(new Bishop("black"));
    expect(standardBoard.getPiece(8)).toStrictEqual(new Pawn("black"));
    expect(() => standardBoard.getPiece(66)).toThrowError();

})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Board("")).toThrowError();
    expect(() => new Board("other")).toThrowError();
    expect(() => new Board("custom")).toThrowError();
    expect(() => new Board("     ")).toThrowError();
    
})

test("testing highlighting", () => {
    
    const board = new Board("standard");
    board.getHighlight(0).setOpen();

    const highlights = new Array(64).fill(null).map(() => new Highlight("closed"));
    highlights[0].setOpen();

    expect(board.getHighlights()).toStrictEqual(highlights);
    
})
