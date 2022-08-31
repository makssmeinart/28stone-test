import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Input } from 'src/main/components';

describe('Render input', () => {
  it('Should render Input bar', () => {
    render(<Input />);
    const billInput = screen.getByTestId("search-input")
    expect(billInput).toBeInTheDocument()
  });
})