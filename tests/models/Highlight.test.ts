/*
 * Unit test for Highlight object
 *
 */

import { Highlight } from '@models/Highlight';
import { test, expect } from 'vitest';

test("test constructors with north or south string input", () => {
    expect(() => new Highlight("open")).not.toThrowError();
    expect(() => new Highlight("attack")).not.toThrowError();
    expect(() => new Highlight("closed")).not.toThrowError();
    expect(() => new Highlight("enpassant")).not.toThrowError();
})

test("test color value after constructor", () => {
    const testOpen = new Highlight("open");
    expect(testOpen.isOpen()).toBe(true);

    const testClosed = new Highlight("closed");
    expect(testClosed.isClosed()).toBe(true);

    const testAttack = new Highlight("attack");
    expect(testAttack.isAttack()).toBe(true);

    const testEnPassant = new Highlight("enpassant");
    expect(testEnPassant.isEnPassant()).toBe(true);
    expect(testEnPassant.isOpen()).toBe(false);
    expect(testEnPassant.isClosed()).toBe(false);
    expect(testEnPassant.isAttack()).toBe(false);
})

test("constructor should throw error with incorrect value passed", () => {
    expect(() => new Highlight("")).toThrowError();
    expect(() => new Highlight("green")).toThrowError();
    expect(() => new Highlight("NORTH")).toThrowError();
})
