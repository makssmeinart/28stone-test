import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Currencies } from 'src/main/components';

describe('Render Currency', () => {
  it('Should render multiple currency inside of the currencies', () => {
    render(<Currencies />);
    const currency = screen.getByTestId("currency")
    expect(currency).toBeInTheDocument()
  });
})