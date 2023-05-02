import { ColorI, isWhite } from '@/models/ColorI';
import { Direction } from '@/enums/Direction';

/* 
 * Array helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function getDirection(color : ColorI) {
    return isWhite(color) ? Direction.North : Direction.South;
}
