import { BOARD_SIZE } from '@/types/constants';

/* 
 * board helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function isOnBoard(index) {
    return index >= 0 && index < BOARD_SIZE;
}
