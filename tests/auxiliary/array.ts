/* 
 * Array helper functions
 * 
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

export function arrayRange(start : number, stop : number, step : number) {
    return Array.from({
	length: (stop - start) / step + 1
    }, (_, index) => start + index * step);
}
