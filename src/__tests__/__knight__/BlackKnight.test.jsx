import { render, screen } from '@testing-library/react'

import Knight from 'components/Knight';

import { Color } from 'types/Color';

test("Black Knight existence", () => {

    const square = {
	color: Color.Black,
	piece: null,
    };

    render(<Knight
	       state = { square }
	   />);

    // grab black knight
    const element = screen.getByAltText(/black knight chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
