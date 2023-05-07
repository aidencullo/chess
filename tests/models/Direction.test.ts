/*
 * Unit test for Direction object
 *
 */

import { Direction } from '@models/Direction';
import { test, expect } from 'vitest';

test("test constructors with north or south string input", () => {
    expect(() => new Direction("north")).not.toThrowError();
    expect(() => new Direction("south")).not.toThrowError();
})

test("test color value after constructor", () => {
    const testNorth = new Direction("north");
    const testSouth = new Direction("south");
    expect(testSouth.isNorth()).toBe(false);
    expect(testSouth.isSouth()).toBe(true);
    expect(testNorth.isNorth()).toBe(true);
    expect(testNorth.isSouth()).toBe(false);
})

test("constructor should throw error with incorrect value passed", () => {
    expect(() => new Direction("")).toThrowError();
    expect(() => new Direction("green")).toThrowError();
    expect(() => new Direction("NORTH")).toThrowError();
})
