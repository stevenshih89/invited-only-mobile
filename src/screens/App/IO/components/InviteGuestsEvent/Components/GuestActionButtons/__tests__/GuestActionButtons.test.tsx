import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import GuestActionButtons from '../GuestActionButtons';

jest.mock('src/assets/images/icons/close.svg', () => () => <svg data-testid="reject-icon" />);
jest.mock('src/assets/images/icons/lightning-fill.svg', () => () => <svg data-testid="super-invite-icon" />);
jest.mock('src/assets/images/icons/coupon-fill.svg', () => () => <svg data-testid="invite-icon" />);

describe('GuestActionButtons', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<GuestActionButtons onReject={jest.fn()} onSuperInvite={jest.fn()} onInvite={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onReject when reject button pressed', () => {
    const onReject = jest.fn();
    const {getByTestId} = render(<GuestActionButtons onReject={onReject} onSuperInvite={jest.fn()} onInvite={jest.fn()} />);
    fireEvent.press(getByTestId('reject-button'));
    expect(onReject).toHaveBeenCalled();
  });

  it('calls onSuperInvite when super invite button pressed', () => {
    const onSuperInvite = jest.fn();
    const {getByTestId} = render(<GuestActionButtons onReject={jest.fn()} onSuperInvite={onSuperInvite} onInvite={jest.fn()} />);
    fireEvent.press(getByTestId('super-invite-button'));
    expect(onSuperInvite).toHaveBeenCalled();
  });

  it('calls onInvite when invite button pressed', () => {
    const onInvite = jest.fn();
    const {getByTestId} = render(<GuestActionButtons onReject={jest.fn()} onSuperInvite={jest.fn()} onInvite={onInvite} />);
    fireEvent.press(getByTestId('invite-button'));
    expect(onInvite).toHaveBeenCalled();
  });
});
