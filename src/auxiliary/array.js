/* 
 * Array helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function arrayRange(start, stop, step) {
    return Array.from(
	{ length: (stop - start) / step + 1 },
	(value, index) => start + index * step
    );
}
