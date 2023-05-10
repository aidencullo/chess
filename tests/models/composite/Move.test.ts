/*
 * Integration test for Move object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Move, isEqualMove } from '@models/composite/Move';
import { Pawn } from '@models/composite/pieces/Pawn';
import { Knight } from '@models/composite/pieces/Knight';

test("test constructors with acceptable string input", () => {

    const pawn = new Pawn("white")
    const knight = new Knight("black")
    
    expect(() => new Move(0, 1, pawn)).not.toThrowError();
    expect(() => new Move(0, 4, pawn)).not.toThrowError();
    expect(() => new Move(0, 10, pawn)).not.toThrowError();
    expect(() => new Move(5, 7, pawn)).not.toThrowError();
    expect(() => new Move(5, 7, knight)).not.toThrowError();
    expect(() => new Move(1, 7, knight)).not.toThrowError();
    expect(() => new Move(15, 7, knight)).not.toThrowError();
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    const pawn = new Pawn("white")

    expect(() => new Move(1, -1, pawn)).toThrowError();
    expect(() => new Move(-1, 0, pawn)).toThrowError();
    expect(() => new Move(1, 64, pawn)).toThrowError();
    expect(() => new Move(-1, 63, pawn)).toThrowError();
    expect(() => new Move(0, 0, pawn)).toThrowError();
    expect(() => new Move(4, 4, pawn)).toThrowError();
    expect(() => new Move(4, 4, null)).toThrowError();
    expect(() => new Move(1, 4, null)).toThrowError();
    
})

test("equality of moves", () => {
    
    const pawn = new Pawn("white");
    const knight = new Knight("white");

    expect(isEqualMove(new Move(0, 1, pawn), new Move(0, 1, pawn))).toBe(true);
    expect(isEqualMove(new Move(0, 2, pawn), new Move(0, 1, pawn))).toBe(false);
    expect(isEqualMove(new Move(0, 1, pawn), new Move(0, 63, pawn))).toBe(false);
    expect(isEqualMove(new Move(0, 1, knight), new Move(0, 1, pawn))).toBe(false);
    expect(isEqualMove(new Move(0, 1, knight), new Move(0, 2, pawn))).toBe(false);
    expect(isEqualMove(new Move(0, 1, knight), new Move(0, 1, knight))).toBe(true);
    
})
