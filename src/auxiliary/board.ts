import { BOARD_SIZE } from '@/constants/board';

/* 
 * board helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function isOnBoard(index : number) {
    return index >= 0 && index < BOARD_SIZE;
}
