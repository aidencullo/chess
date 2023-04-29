import { render, screen } from '@testing-library/react'

import Rook from 'components/Rook';

import { Color } from 'types/Color';

test("White Rook existence", () => {

    const square = {
	color: Color.White,
	piece: null,
    };

    render(<Rook
	       state = { square }
	   />);

    // grab white rook
    const element = screen.getByAltText(/white rook chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
