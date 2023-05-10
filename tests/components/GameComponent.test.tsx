/*
 * Integration test for Game React component
 *
 * @author Aiden Cullo [https://github.com/aidencullo]
 */

import GameComponent from '@components/GameComponent';
import { cleanup, render, fireEvent, screen } from '@testing-library/react';

beforeEach(() => {
    // render(<GameComponent />);
});

afterEach(() => {
    cleanup();
});

describe("Basic test", () => {
    test("", () => {
	const result = render(<GameComponent />);

	// const title = screen.getByRole('square');
	    const title  = screen.getAllByRole('button')[0];

	fireEvent.click(title)

	
    })
})
