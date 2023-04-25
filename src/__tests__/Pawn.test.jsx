import { render, screen } from '@testing-library/react'

import Pawn from 'components/Pawn';

test("Pawn unit test successful", () => {

    const square = {
	color: null,
	piece: null,
    };

    render(<Pawn
	       state = { square }
	   />);

    const element = screen.getByAltText(/pawn chess piece/i);

    expect(element).toBeInTheDocument();
})
