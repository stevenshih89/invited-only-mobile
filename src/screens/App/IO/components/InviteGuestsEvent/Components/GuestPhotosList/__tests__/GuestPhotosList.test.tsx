import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import GuestPhotosList from '../GuestPhotosList';

describe('GuestPhotosList', () => {
  const baseProps = {
    photosList: [{image: 'main.jpg'}, {image: 'photo1.jpg'}, {image: 'photo2.jpg'}],
  };

  it('matches snapshot', () => {
    const tree = renderer.create(<GuestPhotosList {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders AdditionalPhotosContainer if photos exist', () => {
    const {getByTestId} = render(<GuestPhotosList {...baseProps} />);
    expect(getByTestId('AdditionalPhotosContainer')).toBeTruthy();
  });

  it('renders correct number of AdditionalPhoto', () => {
    const {getAllByTestId} = render(<GuestPhotosList {...baseProps} />);

    expect(getAllByTestId('AdditionalPhoto').length).toBe(2);
  });

  it('renders nothing if photosList is empty', () => {
    const {queryByTestId} = render(<GuestPhotosList photosList={[]} />);
    expect(queryByTestId('AdditionalPhotosContainer')).toBeNull();
  });
});
