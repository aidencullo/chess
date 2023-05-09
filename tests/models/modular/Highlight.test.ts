/*
 * Unit test for Highlight object
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Highlight } from '@models/modular/Highlight';

test("test constructors with proper input", () => {

    expect(() => new Highlight("open")).not.toThrowError();
    expect(() => new Highlight("attack")).not.toThrowError();
    expect(() => new Highlight("closed")).not.toThrowError();
    expect(() => new Highlight("enpassant")).not.toThrowError();
    
})
 
test("test value after constructor", () => {

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
 
test("test setting value after constructor", () => {

    const open = new Highlight("open");

    expect(open.isClosed()).toBe(false);
    expect(open.isOpen()).toBe(true);

    open.setOpen();
    
    expect(open.isClosed()).toBe(false);
    expect(open.isOpen()).toBe(true);
  
    open.setClosed();  
    
    expect(open.isClosed()).toBe(true);
    expect(open.isOpen()).toBe(false);
    expect(open.isAttack()).toBe(false);
    expect(open.isEnPassant()).toBe(false);

    open.setEnPassant();  

    expect(open.isEnPassant()).toBe(true);
    
    open.setAttack();  

    expect(open.isAttack()).toBe(true);
    
})

test("constructor should throw error with incorrect value passed", () => {
    
    expect(() => new Highlight("")).toThrowError();
    expect(() => new Highlight("green")).toThrowError();
    expect(() => new Highlight("NORTH")).toThrowError();
 
})
