import { Color, Direction } from 'data';
import { BOARD_SIZE } from 'data';

/* 
 * Helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function isEqualMove(move1, move2) {
    if (Object.keys(move1).length !== Object.keys(move2).length) {
	return false;
    }
    for (const [key, value] of Object.entries(move1)) {
	if (typeof value === "object") {
	    if (move2[key] === null) {
		return false;
	    } else if (!isEqualMove(value, move2[key])) {
		return false;
	    }
	} else if (value !== move2[key]) {
	    return false;
	}
    }
    return true;
}

export function arrayRange(start, stop, step) {
    return Array.from(
	{ length: (stop - start) / step + 1 },
	(value, index) => start + index * step
    );
}

export function getDirection(color) {
    return color === Color.White ? Direction.North : Direction.South;
}

export function isOnBoard(index) {
    return index >= 0 && index < BOARD_SIZE;
}
