export interface ColorI {
    name: String;
}

export const isWhite = (color : ColorI) => {
    return color.name === "white";
}
