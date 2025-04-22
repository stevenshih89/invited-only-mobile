import React from 'react';
import {render} from '@testing-library/react-native';
import HeaderRightProfileEditing from '../HeaderRightProfileEditing';

describe('HeaderRightProfileEditing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByTestId, getByText} = render(<HeaderRightProfileEditing />);

    expect(getByTestId('preview-button')).toBeTruthy();
    expect(getByText('Preview')).toBeTruthy();
  });
});
