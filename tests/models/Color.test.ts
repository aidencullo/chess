/*
 * Unit test for Color object
 *
 */

import { Color } from '@models/Color';
import { test, expect } from 'vitest';

test("test constructors with black or white string input", () => {
    expect(() => new Color("white")).not.toThrowError();
    expect(() => new Color("black")).not.toThrowError();
})

test("test color value after constructor", () => {
    const testWhite = new Color("white");
    const testBlack = new Color("black");
    expect(testBlack.isWhite()).toBe(false);
    expect(testBlack.isBlack()).toBe(true);
    expect(testWhite.isWhite()).toBe(true);
    expect(testWhite.isBlack()).toBe(false);
})

test("constructor should throw error with incorrect value passed", () => {
    expect(() => new Color("")).toThrowError();
    expect(() => new Color("green")).toThrowError();
    expect(() => new Color("WHITE")).toThrowError();
})
