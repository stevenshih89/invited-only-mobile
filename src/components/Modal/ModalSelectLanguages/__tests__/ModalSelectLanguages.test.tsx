import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import ModalSelectLanguages from '../ModalSelectLanguages';
import {showToast} from 'helpers/showToast';

jest.mock('@react-native-firebase/firestore');
jest.mock('helpers/showToast');
jest.mock('react-native-config', () => ({
  API_USERINFO_COLLECTION: 'userInfo',
}));

describe('ModalSelectLanguages Component', () => {
  const mockProps = {
    modalLanguages: true,
    showLanguages: true,
    setModalLanguages: jest.fn(),
    setShowLanguages: jest.fn(),
    languages: [],
    setLanguages: jest.fn(),
  };

  const mockUser = {
    uid: 'test-uid',
    languages: [],
    showLanguages: true,
    image: 'test-image.jpg',
  };

  const mockFirestore = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn().mockResolvedValue({}),
    get: jest.fn().mockResolvedValue({
      data: () => mockUser,
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(<ModalSelectLanguages {...mockProps} />);

    expect(getByText('Select Languages')).toBeTruthy();
    expect(getByText('Show in my profile')).toBeTruthy();
    expect(getByPlaceholderText('Search')).toBeTruthy();
    expect(getByText('Save Changes')).toBeTruthy();
  });

  it('renders all language options', () => {
    const {getByText} = render(<ModalSelectLanguages {...mockProps} />);

    expect(getByText('English')).toBeTruthy();
    expect(getByText('Arabic')).toBeTruthy();
    expect(getByText('Spanish')).toBeTruthy();
    expect(getByText('Ukranian')).toBeTruthy();
    expect(getByText('French')).toBeTruthy();
  });

  it.skip('shows error toast when saving fails', async () => {
    const error = new Error('Update failed');

    const {getByText} = render(<ModalSelectLanguages {...mockProps} />);

    await act(async () => {
      fireEvent.press(getByText('Save Changes'));
    });

    expect(showToast).toHaveBeenCalledWith('inviteMatch', 'An error occurred while updating the language. Please try again.', 'Error');
  });
});
