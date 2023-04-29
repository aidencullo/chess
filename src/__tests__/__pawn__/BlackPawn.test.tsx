import { render, screen } from '@testing-library/react'

import Pawn from '@/components/Pawn';

import { Color } from '@/types/Color';

test("Black Pawn existence", () => {

    const square = {
	color: Color.Black,
	piece: null,
    };

    render(<Pawn
	       state = { square }
	   />);

    // grab black pawn
    const element = screen.getByAltText(/black pawn chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
