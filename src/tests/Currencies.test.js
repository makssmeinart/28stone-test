import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Holder } from 'src/main/components';

describe('Render Currencies', () => {
  it('Should render currencies inside of the holder', () => {
    render(<Holder />);
    const currencies = screen.getByTestId("currencies")
    expect(currencies).toBeInTheDocument()
  });
})