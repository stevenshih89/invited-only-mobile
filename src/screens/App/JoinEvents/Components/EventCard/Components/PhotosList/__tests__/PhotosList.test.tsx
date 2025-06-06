import React from 'react';
import {render} from '@testing-library/react-native';
import {components} from '@invited-only/invited-only-api';
import PhotosList from '../PhotosList';

describe('PhotosList', () => {
  const mockPhotos: components['schemas']['EventData']['photos'] = [
    {id: 1, image: 'https://example.com/photo1.jpg'},
    {id: 2, image: 'https://example.com/photo2.jpg'},
    {id: 3, image: 'https://example.com/photo3.jpg'},
  ];

  const Component = () => <PhotosList photosList={mockPhotos} />;

  it('renders additional photos correctly', () => {
    const {getAllByTestId} = render(<Component />);
    const photos = getAllByTestId('additional-photo');

    expect(photos).toHaveLength(2);
    expect(photos[0].props.source.uri).toBe('https://example.com/photo2.jpg');
    expect(photos[1].props.source.uri).toBe('https://example.com/photo3.jpg');
  });

  it('does not render when photosList is empty', () => {
    const {queryByTestId} = render(<PhotosList photosList={[]} />);
    expect(queryByTestId('additional-photos-container')).toBeNull();
  });

  it('does not render when photosList is undefined', () => {
    const {queryByTestId} = render(<PhotosList photosList={undefined} />);
    expect(queryByTestId('additional-photos-container')).toBeNull();
  });
});
