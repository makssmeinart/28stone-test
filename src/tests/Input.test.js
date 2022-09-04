import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Input } from 'src/main/components';

describe('Render input with values', () => {
    it('Should be able to enter anything', () => {
        render(<Input />);
        const input = screen.getByTestId("search-input")
        fireEvent.change(input, { target: { value: 'test123' } })
        waitFor(() => expect(input.value).toBe("test123"))
    });

    it('Should find and render the value', () => {
        render(<Input />);
        const input = screen.getByTestId("search-input")
        fireEvent.change(input, { target: { value: 'hello-world' } })
        const res = screen.findAllByText('hello-world')
        waitFor(() => expect(res).toBeInTheDocument())
    });

    it('Should render ERROR', () => {
        render(<Input />);
        const input = screen.getByTestId("search-input")
        fireEvent.change(input, { target: { value: 'test123' } })
        const res = screen.findAllByText("Sorry, couldn't find any matches...")
        waitFor(() => expect(res).toBeInTheDocument())
    });
})