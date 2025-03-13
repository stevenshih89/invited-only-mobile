import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import MyInterests from './MyInterests';

const mockSetListOfInterests = jest.fn();

const mockInterests = [
  {id: 1, title: 'Music', isSelected: true},
  {id: 2, title: 'Sports', isSelected: false},
  {id: 3, title: 'Art', isSelected: true},
];

describe('MyInterests Component', () => {
  it('renders correctly with title and interests', () => {
    const {getByText} = render(<MyInterests listOfInterests={mockInterests} setListOfInterests={mockSetListOfInterests} loading={false} />);
    expect(getByText('My interests')).toBeTruthy();
    expect(getByText('Music')).toBeTruthy();
    expect(getByText('Art')).toBeTruthy();
    expect(getByText('Sports')).toBeTruthy();
  });

  it('displays loading indicator when loading is true', () => {
    const {getByTestId} = render(
      <MyInterests listOfInterests={mockInterests} setListOfInterests={mockSetListOfInterests} loading={true} />,
    );
    expect(getByTestId('my-interests-loading-indicator')).toBeTruthy();
  });

  it('toggles interest selection correctly', () => {
    const {getByText} = render(<MyInterests listOfInterests={mockInterests} setListOfInterests={mockSetListOfInterests} loading={false} />);
    const sportsButton = getByText('Sports');

    fireEvent.press(sportsButton);

    expect(mockSetListOfInterests).toHaveBeenCalledWith([
      {id: 1, title: 'Music', isSelected: true},
      {id: 2, title: 'Sports', isSelected: true},
      {id: 3, title: 'Art', isSelected: true},
    ]);
  });

  it('renders Add more interests button', () => {
    const {getByText} = render(<MyInterests listOfInterests={mockInterests} setListOfInterests={mockSetListOfInterests} loading={false} />);
    expect(getByText('Add more interests')).toBeTruthy();
  });
});
