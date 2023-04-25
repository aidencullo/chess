import { render, screen } from '@testing-library/react'

import Pawn from 'components/Pawn';

test("Example 1 renders successfully", () => {

    const squares = new Array(64).fill({
	color: null,
	piece: null,
    });

    render(<Pawn
	       state = { squares }
	   />);

//    const element = screen.getByText(/first test/i);

//    expect(element).toBeInTheDocument();
})
