import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('should call onSearch with input value when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search transcripts...');
    const searchText = 'test query';

    fireEvent.change(input, { target: { value: searchText } });
    fireEvent.submit(screen.getByRole('form'));

    expect(mockOnSearch).toHaveBeenCalledWith(searchText);
  });

  it('should clear input after form submission', () => {
    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText('Search transcripts...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(input.value).toBe('');
  });
});