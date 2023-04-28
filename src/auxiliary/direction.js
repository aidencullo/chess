import { Color } from 'types/Color';
import { Direction } from 'types/Direction';

/* 
 * Array helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function getDirection(color) {
    return color === Color.White ? Direction.North : Direction.South;
}
