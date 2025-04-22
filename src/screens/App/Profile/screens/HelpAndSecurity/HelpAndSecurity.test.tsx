import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Linking} from 'react-native';
import HelpAndSecurity from './HelpAndSecurity';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

describe('HelpAndSecurity Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<HelpAndSecurity />);

    expect(getByText('Need Help?')).toBeTruthy();
    expect(getByText('Support@invitedonly.com')).toBeTruthy();
    expect(getByText('IO Values and Guidlines')).toBeTruthy();
    expect(getByText('Security')).toBeTruthy();
  });

  it('opens email client when support section is pressed', () => {
    const {getByText} = render(<HelpAndSecurity />);

    fireEvent.press(getByText('Support@invitedonly.com'));

    expect(Linking.openURL).toHaveBeenCalledWith('mailto:Support@invitedonly.com');
  });

  it('displays guidelines description', () => {
    const {getByText} = render(<HelpAndSecurity />);

    expect(getByText('See what IO stands for and what we ask of community')).toBeTruthy();
  });

  it('displays security description', () => {
    const {getByText} = render(<HelpAndSecurity />);

    const securityText =
      'Your security and privacy are our utmost concern. Our mobile app is designed with advanced measures to ensure the protection of your personal information. Rest easy knowing that your data is handled with the highest level of security and confidentiality, providing you with a safe and private experience';
    expect(getByText(securityText)).toBeTruthy();
  });

  it('renders all sections', () => {
    const {getByTestId} = render(<HelpAndSecurity />);

    expect(getByTestId('support-section')).toBeTruthy();
    expect(getByTestId('guidelines-section')).toBeTruthy();
    expect(getByTestId('security-section')).toBeTruthy();
  });
});
