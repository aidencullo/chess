import { render, screen } from '@testing-library/react'

import Bishop from 'components/Bishop';

import { Color } from 'data';

test("White Bishop existence", () => {

    const square = {
	color: Color.White,
	piece: null,
    };

    render(<Bishop
	       state = { square }
	   />);

    // grab white bishop
    const element = screen.getByAltText(/white bishop chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
