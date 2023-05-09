/*
 * Unit test for Color object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Color } from '@models/modular/Color';

test("test constructors with black or white string input", () => {
    expect(() => new Color("white")).not.toThrowError();
    expect(() => new Color("black")).not.toThrowError();
})

test("test color value after constructor", () => {
    const testWhite = new Color("white");
    const testBlack = new Color("black");
    expect(testBlack.isWhite()).toBe(false);
    expect(testWhite.isWhite()).toBe(true);
})

test("constructor should throw error with incorrect value passed", () => {
    expect(() => new Color("")).toThrowError();
    expect(() => new Color("green")).toThrowError();
    expect(() => new Color("WHITE")).toThrowError();
})
