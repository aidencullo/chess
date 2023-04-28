import { render, screen } from '@testing-library/react'

import Knight from 'components/Knight';

import { Color } from 'types/Color';

test("White Knight existence", () => {

    const square = {
	color: Color.White,
	piece: null,
    };

    render(<Knight
	       state = { square }
	   />);

    // grab white knight
    const element = screen.getByAltText(/white knight chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
