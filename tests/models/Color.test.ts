import { Color } from '@models/Color';

const testWhite = new Color("white");
const testBlack = new Color("black");

test("test constructors with black or white string input", () => {
    const testWhite = new Color("white");
    const testBlack = new Color("black");
})

test("test color value after constructor", () => {
    expect(testWhite.getName()).toBe("white");
    expect(testBlack.getName()).toBe("black");
    expect(testBlack.isWhite()).not.toBe(true);
    expect(testWhite.isWhite()).toBe(true);
})

test("constructor should throw error with novalue passed", () => {
    expect(() => new Color()).toThrowError();
})

test("constructor should throw error with incorrect value passed", () => {
    expect(() => new Color("")).toThrowError();
    expect(() => new Color("green")).toThrowError();
    expect(() => new Color(true)).toThrowError();
    expect(() => new Color(false)).toThrowError();
    expect(() => new Color(1)).toThrowError();
    expect(() => new Color(0)).toThrowError();
    expect(() => new Color(NaN)).toThrowError();
    expect(() => new Color("WHITE")).toThrowError();
})
