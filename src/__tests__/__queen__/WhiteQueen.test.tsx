import { render, screen } from '@testing-library/react'

import Queen from 'components/Queen';

import { Color } from 'types/Color';

test("White Queen existence", () => {

    const square = {
	color: Color.White,
	piece: null,
    };

    render(<Queen
	       state = { square }
	   />);

    // grab white queen
    const element = screen.getByAltText(/white queen chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
