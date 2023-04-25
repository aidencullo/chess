import { render, screen } from '@testing-library/react'

import Queen from 'components/Queen';

import { Color } from 'data';

test("Black Queen existence", () => {

    const square = {
	color: Color.Black,
	piece: null,
    };

    render(<Queen
	       state = { square }
	   />);

    // grab black queen
    const element = screen.getByAltText(/black queen chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
