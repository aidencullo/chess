import { Color } from '@/models/Color';
import { Direction } from '@/enums/Direction';

/* 
 * Array helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function getDirection(color : Color) {
    return color.isWhite() ? Direction.North : Direction.South;
}
