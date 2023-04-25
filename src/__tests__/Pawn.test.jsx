import { render, screen } from '@testing-library/react'

import Pawn from 'components/Pawn';

test("Pawn existence", () => {

    const square = {
	color: null,
	piece: null,
    };

    render(<Pawn
	       state = { square }
	   />);

    // grab the element
    const element = screen.getByAltText(/chess piece/i);

    // contains document
    expect(element).toBeInTheDocument();
    
})
