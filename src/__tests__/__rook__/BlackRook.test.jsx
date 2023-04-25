import { render, screen } from '@testing-library/react'

import Rook from 'components/Rook';

import { Color } from 'data';

test("Black Rook existence", () => {

    const square = {
	color: Color.Black,
	piece: null,
    };

    render(<Rook
	       state = { square }
	   />);

    // grab black rook
    const element = screen.getByAltText(/black rook chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
