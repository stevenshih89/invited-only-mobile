import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import EventPhotoList from '../EventPhotosList';

describe('ProfilePhotosList', () => {
  const baseProps = {
    photosList: ['main.jpg', 'photo1.jpg', 'photo2.jpg'],
  };

  it('matches snapshot', () => {
    const tree = renderer.create(<EventPhotoList {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders AdditionalPhotosContainer if photos exist', () => {
    const {getByTestId} = render(<EventPhotoList {...baseProps} />);
    expect(getByTestId('additional-photos-container')).toBeTruthy();
  });

  it('renders correct number of AdditionalPhoto', () => {
    const {getAllByTestId} = render(<EventPhotoList {...baseProps} />);
    expect(getAllByTestId('additional-photo').length).toBe(2);
  });

  it('renders nothing if photosList is empty', () => {
    const {queryByTestId} = render(<EventPhotoList photosList={[]} />);
    expect(queryByTestId('additional-photos-container')).toBeNull();
  });
});
