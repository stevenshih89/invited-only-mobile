import { components } from '../../src/api/v1'; // Import types for the user schema

jest.mock('../../src/hooks/user/useUser', () => {
  const mockUserData: Partial<components['schemas']['User']> = {
    uid: 'mock-user-uid-123',
    name: 'John Doe (Mock)',
    birthday: '2000-01-01',
    accountType: 'host',
    photos: [{ image: 'https://image.jpg' }],
    gender: 'man',
    homeAddress: 'Mock City',
    work: { title: 'Mock Job' },
  };

  return jest.fn(() => ({
    user: mockUserData as components['schemas']['User'],
    isLoading: false,
    error: null,
  }));
});
