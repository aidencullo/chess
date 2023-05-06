const user = {
    name: "aiden",
    age: 25,    
}

test("aiden is 25", () => {
    expect(user.name).toBe("aiden");
    expect(user.age).toBe(25);
})
