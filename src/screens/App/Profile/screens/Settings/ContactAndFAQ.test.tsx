import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ContactAndFAQ from './ContactAndFAQ';

jest.mock('helpers/getFaqList', () => ({
  faqList: [
    {id: 1, title: 'FAQ 1', description: 'Description 1'},
    {id: 2, title: 'FAQ 2', description: 'Description 2'},
  ],
}));

describe('ContactAndFAQ Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with contact information', () => {
    const {getByText} = render(<ContactAndFAQ />);
    expect(getByText('Contact')).toBeTruthy();
    expect(getByText('support@invitedonly.app')).toBeTruthy();
  });

  it('renders FAQ list correctly', () => {
    const {getByText} = render(<ContactAndFAQ />);
    expect(getByText('FAQ 1')).toBeTruthy();
    expect(getByText('FAQ 2')).toBeTruthy();
  });

  it('toggles FAQ item on press', () => {
    const {getByText, queryByText} = render(<ContactAndFAQ />);
    const faqItem = getByText('FAQ 1');

    expect(queryByText('Description 1')).toBeNull();

    fireEvent.press(faqItem);
    expect(getByText('Description 1')).toBeTruthy();

    fireEvent.press(faqItem);
    expect(queryByText('Description 1')).toBeNull();
  });
});
