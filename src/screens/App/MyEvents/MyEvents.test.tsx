import {render} from '@testing-library/react-native';
import MyEvents from './MyEvents';
import {NavigationContainer} from '@react-navigation/native';

describe('MyEvents Component', () => {
  it('renders correctly loading', async () => {
    const {findByText} = render(
      <NavigationContainer>
        <MyEvents />
      </NavigationContainer>,
    );

    const res = await findByText(/Looking for your events/i);
    expect(res).toBeTruthy();
  });
});
