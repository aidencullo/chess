/*
 * Integration test for Pawn React component
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import { Pawn } from '@models/composite/pieces/Pawn';
import PawnComponent from '@components/PawnComponent';
import { cleanup } from '@testing-library/react';
import { render } from '@testing-library/react';

// beforeEach(() => {
//     render(<PawnComponent piece={null} />);
// });

afterEach(() => {
    cleanup();
});

describe("Basic test", () => {
    test("", () => {
	const pawn = new Pawn("white");
	
	render(<PawnComponent piece={pawn}/>);

        // expect(screen.getByText(/Testing/i)).toBeDefined()
    })
})
