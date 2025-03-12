import {fireEvent, render, waitFor, act} from '@testing-library/react-native';
import IO from './IO';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {useIO} from 'hooks/useIO';
import {Text, View} from 'react-native';

describe('IO Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly loading for guest', async () => {
    (useIO as jest.Mock).mockReturnValue({
      isHost: false,
      events: []
    });
  
    const {findByText} = render(<IO />);
    
    const loadingText = await findByText('Finding events near you ...');
    expect(loadingText).toBeTruthy();
  });
  
  it('renders correctly loading for host', async () => {
    (useIO as jest.Mock).mockReturnValue({
      isHost: true,
      events: []
    });
  
    const {findByText} = render(<IO />);
  
    const loadingText = await findByText('Finding guests near you ...');
    expect(loadingText).toBeTruthy();
  });

  it('renders correctly if account on review, guest side', async () => {
    (useIO as jest.Mock).mockReturnValue({
      isHost: false,
      events: [],
      userInfo: {
        accountReviewed: false,
        accountConfirmed: false
      }
    });
  
    const {findByText} = render(<IO />);
    const noEventsText = await findByText('Your account is under review. Thank you for your patience. You will be notified if your account is accepted');
    expect(noEventsText).toBeTruthy();
  });

  it('renders correctly if account on review, host side', async () => {
    (useIO as jest.Mock).mockReturnValue({
      isHost: true,
      events: [],
      userInfo: {
        accountReviewed: false,
        accountConfirmed: false
      }
    });
  
    const {findByText} = render(<IO />);
    const noEventsText = await findByText('Your account is under review. Thank you for your patience. You will be notified if your account is accepted');
    expect(noEventsText).toBeTruthy();
  });

  ////////////////////////////////////////////////////////////

  // it('renders correctly if events are empty and triggers getCardsListForGuest', async () => {
  //   const getCardsListForGuestMock = jest.fn();
  
  //   (useIO as jest.Mock).mockReturnValue({
  //     isHost: false,
  //     events: [],
  //     userInfo: {
  //       uid: 1,
  //       accountReviewed: true,
  //       accountConfirmed: true,
  //     },
  //     activeEventDate: '2025-03-12',
  //     lastVisibleRef: { current: false },
  //     endReachedRef: { current: false },
  //     getCardsListForGuest: getCardsListForGuestMock,
  //   });
  
  //   render(<IO />);
  
  //   await waitFor(() => expect(getCardsListForGuestMock).toHaveBeenCalled());
  // });
  
  // it('renders correctly if events is empty', async () => {
  //   (useIO as jest.Mock).mockReturnValue({
  //     isHost: false,
  //     events: [],
  //     isVisibleMatch: false,
  //     visibleModalSuperJoin: false,
  //     isVisibleSuperInvite: false,
  //     acceptModalVisible: false,
  //     isDemo: false,
  //     changeAccountTypeModalVisible: false,
  //     loadingCardsList: false,
  //     userInfo: {
  //       uid: 1,
  //       accountReviewed: true,
  //       accountConfirmed: true
  //     },
  //   });
  
  //   const {findByText} = render(<IO />);
  //   expect(findByText('Soon, Everything Changes.')).toBeTruthy;
  // });

  ////////////////////////////////////////////////////////////
  
  
  // it('handles tap user info', async () => {
  //   (useIO as jest.Mock).mockReturnValue({
  //     isHost: false,
  //     events: [],
  //   });
  
  //   const { findByTestId, queryByText, debug, findByText} = render(<IO />);
  //   await findByText('Finding events near you ...');

  
  //   await waitFor(() => {
  //     const element = queryByText('Finding events near you ...');
  //     expect(element).toBeNull();
  //   });
  
  //   debug();
  
  //   const button = await findByTestId('navigate-from-io-to-profile');
  
  //   fireEvent.press(button);
  
  //   await waitFor(() => {
  //     expect(mockedNavigateFunction).toHaveBeenCalledWith('/user-profile');
  //   });
  // }, 10000);
  


  // it('renders correctly cards if is host', async () => {
  //   (useIO as jest.Mock).mockReturnValue({
  //     isHost: true,
  //     events: [
  //       {
  //         component: (
  //           <View>
  //             <Text>User 1</Text>
  //           </View>
  //         ),
  //         info: {
  //           name: 'Mila',
  //           location: 'Dubai',
  //           bio: 'Keen on art & design',
  //         },
  //       },
  //     ],
  //   });
  //   const {getByText} = render(<IO />);
  //   expect(getByText('User 1')).toBeTruthy();
  //   expect(getByText('Super Invite')).toBeTruthy();
  //   expect(getByText('Invite')).toBeTruthy();
  //   expect(getByText('My basics')).toBeTruthy();
  //   expect(getByText('About me')).toBeTruthy();
  //   expect(getByText('My interests')).toBeTruthy();
  //   expect(getByText('Block and Report')).toBeTruthy();
  //   expect(getByText('Join Events')).toBeTruthy();
  //   expect(getByText('Guest')).toBeTruthy();
  //   expect(getByText('Guest List')).toBeTruthy();
  // });

  // it('renders correctly cards if is guest', async () => {
  //   (useIO as jest.Mock).mockReturnValue({
  //     isHost: false,
  //     userInfo: {
  //       accountReviewed: true,
  //       accountConfirmed: true
  //     },
  //     isFocusedScreen: true,
  //     loadingCardsList: false,
  //     events: [
  //       {
  //         component: (
  //           <View>
  //             <Text>Event 1</Text>
  //           </View>
  //         ),
  //         info: {
  //           address: 'Marina Beach',
  //           hostName: 'John',
  //           name: 'Party',
  //         },
  //       },
  //       {
  //         component: (
  //           <View>
  //             <Text>Event 2</Text>
  //           </View>
  //         ),
  //         info: {
  //           address: 'Marina Beach',
  //           hostName: 'John',
  //           name: 'Party 2',
  //         },
  //       },
  //       {
  //         component: (
  //           <View>
  //             <Text>Event 3</Text>
  //           </View>
  //         ),
  //         info: {
  //           address: 'Marina Beach',
  //           hostName: 'John',
  //           name: 'Party 3',
  //         },
  //       },
  //     ],
  //   });
  //   const {getByText} = render(<IO />);
  //   expect(getByText('Event 1')).toBeTruthy();
    // expect(getByText('Super Join')).toBeTruthy();
    // expect(getByText('Join')).toBeTruthy();
    // expect(getByText('Host')).toBeTruthy();
    // expect(getByText('Guest Invitation')).toBeTruthy();
    // expect(getByText('Event Details')).toBeTruthy();
    // expect(getByText('Name')).toBeTruthy();
    // expect(getByText('Date')).toBeTruthy();
    // expect(getByText('Time')).toBeTruthy();
    // expect(getByText('Location')).toBeTruthy();
    // expect(getByText('Invitations')).toBeTruthy();
    // expect(getByText('Place name')).toBeTruthy();
    // expect(getByText('Event name')).toBeTruthy();
    // expect(getByText('Event description')).toBeTruthy();
    // expect(getByText('Address')).toBeTruthy();
    // expect(getByText('Block and Report')).toBeTruthy();
  // });

  // it('render cross in card', async () => {
  //   const {getByTestId} = render(<IO />);
  //   expect(getByTestId('reject')).toBeTruthy();
  // });

  // const setup = (role: 'host' | 'guest' = 'host') => {
  //   const useIOMock = {
  //     host: {
  //       isHost: true,
  //       handleInvite: jest.fn(),
  //       handleReject: jest.fn(),
  //       events: [
  //         {id: '1', name: 'User 1'},
  //         {id: '2', name: 'User 2'},
  //       ],
  //     },
  //     guest: {
  //       isHost: false,
  //       handleJoin: jest.fn(),
  //       handleReject: jest.fn(),
  //       events: [
  //         {id: '1', name: 'Event 1'},
  //         {id: '2', name: 'Event 2'},
  //       ],
  //     },
  //   };

  //   const selectedMock = useIOMock[role];
  //   (useIO as jest.Mock).mockReturnValue(selectedMock);

  //   const utils = render(<IO />);
  //   return {...utils, ...selectedMock};
  // };

  // it.each([
  //   ['Invite', 'handleInvite'],
  //   ['Super Invite', 'handleInvite'],
  //   ['reject', 'handleReject', true],
  //   ['bottom-invite', 'handleInvite', true],
  //   ['bottom-super-invite', 'handleInvite', true],
  //   ['bottom-reject', 'handleReject', true],
  // ])('should handle %s button click and show new card', async (button, fnName, isTestId = false) => {
  //   const utils = setup('host');
  //   const mockFn = utils[fnName as keyof typeof utils];

  //   expect(utils.getByText('User 1')).toBeTruthy();

  //   if (isTestId) {
  //     fireEvent.press(utils.getByTestId(button));
  //   } else {
  //     fireEvent.press(utils.getByText(button));
  //   }

  //   await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));

  //   expect(utils.queryByText('User 1')).toBeFalsy();
  //   expect(utils.getByText('User 2')).toBeTruthy();
  // });

  // it.each([
  //   ['Join', 'handleJoin'],
  //   ['Super Join', 'handleJoin'],
  //   ['middle-join', 'handleJoin', true],
  //   ['reject', 'handleReject', true],
  //   ['bottom-join', 'handleJoin', true],
  //   ['bottom-super-join', 'handleJoin', true],
  //   ['bottom-guest-reject', 'handleReject', true],
  // ])('should handle %s button click and show new card', async (button, fnName, isTestId = false) => {
  //   const utils = setup('guest');
  //   const mockFn = utils[fnName as keyof typeof utils];

  //   expect(utils.getByText('Event 1')).toBeTruthy();

  //   if (isTestId) {
  //     fireEvent.press(utils.getByTestId(button));
  //   } else {
  //     fireEvent.press(utils.getByText(button));
  //   }

  //   await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));

  //   expect(utils.queryByText('Event 1')).toBeFalsy();
  //   expect(utils.getByText('Event 2')).toBeTruthy();
  // });

  // it('handle tap block and report', async () => {
  //   const {getByTestId, getByText, rerender} = render(<IO />);
  //   expect(getByText('Fake profile')).toBeFalsy();
  //   fireEvent.press(getByText('Block and Report'));

  //   (useIO as jest.Mock).mockReturnValue({
  //     modalReport: true,
  //     setModalReport: jest.fn(),
  //   });

  //   rerender(<IO />);
  //   await waitFor(() => {
  //     expect(getByTestId('Fake profile')).toBeTruthy();
  //   });
  // });
});
