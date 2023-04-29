import { render, screen } from '@testing-library/react'

import King from '@/components/King';

import { Color } from '@/types/Color';

test("White King existence", () => {

    const square = {
	color: Color.White,
	piece: null,
    };

    render(<King
	       state = { square }
	   />);

    // grab white king
    const element = screen.getByAltText(/white king chess piece/i);

    // check if in document
    expect(element).toBeInTheDocument();
    
})
