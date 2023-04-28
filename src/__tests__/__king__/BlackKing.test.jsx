import { render, screen } from '@testing-library/react'

import King from 'components/King';

import { Color } from 'types/Color';

test("Black King existence", () => {

    const square = {
	color: Color.Black,
	piece: null,
    };

    render(<King
	       state = { square }
	   />);

    // grab black king
    const element = screen.getByAltText(/black king chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
