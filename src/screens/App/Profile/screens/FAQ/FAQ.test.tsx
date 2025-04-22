import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FAQ from './FAQ';

jest.mock('helpers/getFaqList', () => ({
  faqList: [
    {
      id: 1,
      title: 'Test Question 1',
      description: 'Test Answer 1',
    },
    {
      id: 2,
      title: 'Test Question 2',
      description: 'Test Answer 2',
    },
  ],
}));

describe('FAQ Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<FAQ />);

    // Check if all questions are rendered
    expect(getByText('Test Question 1')).toBeTruthy();
    expect(getByText('Test Question 2')).toBeTruthy();
  });

  it('toggles FAQ item when pressed', () => {
    const {getByText, queryByText} = render(<FAQ />);

    // Initially description should not be visible
    expect(queryByText('Test Answer 1')).toBeNull();

    // Press the FAQ item
    fireEvent.press(getByText('Test Question 1'));

    // Description should be visible after press
    expect(getByText('Test Answer 1')).toBeTruthy();

    // Press again to close
    fireEvent.press(getByText('Test Question 1'));

    // Description should be hidden again
    expect(queryByText('Test Answer 1')).toBeNull();
  });

  it('can open multiple FAQ items at once', () => {
    const {getByText} = render(<FAQ />);

    // Open first item
    fireEvent.press(getByText('Test Question 1'));

    // Open second item
    fireEvent.press(getByText('Test Question 2'));

    // Both descriptions should be visible
    expect(getByText('Test Answer 1')).toBeTruthy();
    expect(getByText('Test Answer 2')).toBeTruthy();
  });

  it('renders support text', () => {
    const {getByText} = render(<FAQ />);

    expect(getByText(/For any other inquiries/i)).toBeTruthy();
    expect(getByText(/contact our support team/i)).toBeTruthy();
  });
});
