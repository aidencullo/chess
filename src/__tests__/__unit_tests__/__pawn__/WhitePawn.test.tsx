import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react'

import Pawn from '@/components/Pawn';
import { Color } from '@/types/Color';

describe("Pawn test", () => {
    test("Black Pawn existence", () => {

    const square = {
	color: Color.White,
	piece: null,
    };

    render(<Pawn
	       state = { square }
	   />);

    // grab black pawn
    const element = screen.getByAltText(/white pawn chess piece/i);

    // check if in document
    expect(element).toBeDefined();
	
    })
})