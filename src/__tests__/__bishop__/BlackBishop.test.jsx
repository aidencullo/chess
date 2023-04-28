import { render, screen } from '@testing-library/react'

import Bishop from 'components/Bishop';

import { Color } from 'types/Color';

test("Black Bishop existence", () => {

    const square = {
	color: Color.Black,
	piece: null,
    };

    render(<Bishop
	       state = { square }
	   />);

    // grab black bishop
    const element = screen.getByAltText(/black bishop chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
