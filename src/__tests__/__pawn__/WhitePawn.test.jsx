import { render, screen } from '@testing-library/react'

import Pawn from 'components/Pawn';

import { Color } from 'data';

test("White Pawn existence", () => {

    const square = {
	color: Color.White,
	piece: null,
    };

    render(<Pawn
	       state = { square }
	   />);

    // grab white pawn
    const element = screen.getByAltText(/white pawn chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
