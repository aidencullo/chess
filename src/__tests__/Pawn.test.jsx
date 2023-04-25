import { render, screen } from '@testing-library/react'

import Pawn from 'components/Pawn';

test("Example 1 renders successfully", () => {
    render(<Pawn/>);

    const element = screen.getByText(/first test/i);

    expect(element).toBeInTheDocument();
})
