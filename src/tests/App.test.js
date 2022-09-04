import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Input } from 'src/main/components';

describe('Render input', () => {
  it('Should render Input', () => {
    render(<Input />);
    const input = screen.getByTestId("search-input")
    expect(input).toBeInTheDocument()
  });

  it('Input should be focused on loading', () => {
    render(<Input />);
    const input = screen.getByTestId("search-input")
    expect(document.activeElement).toEqual(input)
  });
})