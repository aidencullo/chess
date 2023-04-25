import { BOARD_WIDTH } from 'data';

function distance(p1, p2) {
    const rd = Math.abs(this.row(p1) - this.row(p2));
    const cd = Math.abs(this.column(p1) - this.column(p2));
    return Math.sqrt(rd * rd + cd * cd);
}

function isEqualObject(object1, object2) {
    if (Object.keys(object1).length !== Object.keys(object2).length) {
	return false;
    }
    for (const [key, value] of Object.entries(object1)) {
	if (typeof value === "object") {
	    if (object2[key] === null) {
		return false;
	    } else if (!this.isEqualObject(value, object2[key])) {
		return false;
	    }
	} else if (value !== object2[key]) {
	    return false;
	}
    }
    return true;
}

function row(index) {
    return Math.floor(index / BOARD_WIDTH);
}

function column(index) {
    return index % BOARD_WIDTH;
}

function arrayRange(start, stop, step) {
    return Array.from(
	{ length: (stop - start) / step + 1 },
	(value, index) => start + index * step
    );
}

export { row, column, distance, arrayRange, isEqualObject };
