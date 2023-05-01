/* 
 * Move helper functions
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
