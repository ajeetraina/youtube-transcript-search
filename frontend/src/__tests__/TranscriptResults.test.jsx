import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TranscriptResults from '../components/TranscriptResults';

describe('TranscriptResults', () => {
  const mockResults = [
    {
      videoId: 'test123',
      title: 'Test Video',
      content: [
        { start: 0, text: 'Hello' },
        { start: 5, text: 'World' }
      ]
    }
  ];

  it('should render video results', () => {
    render(<TranscriptResults results={mockResults} />);

    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('should format timestamps correctly', () => {
    render(<TranscriptResults results={mockResults} />);

    expect(screen.getByText('0:00')).toBeInTheDocument();
    expect(screen.getByText('0:05')).toBeInTheDocument();
  });
});