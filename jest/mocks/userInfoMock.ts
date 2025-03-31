/**
 * Mock user data for testing
 */

export const mockUserInfo = {
  uid: 'test-user-123',
  name: 'John Doe',
  accountConfirmed: true,
  accountPremium: false,
  accountReviewed: true,
  accountType: 'host',
  photos: [
    {
      id: '1',
      url: 'https://example.com/photo1.jpg',
    },
    {
      id: '2',
      url: 'https://example.com/photo2.jpg',
    },
    {
      id: '3',
      url: 'https://example.com/photo3.jpg',
    },
  ],
  online: true,
  date: '1990-01-01',
  gender: 'man',
  bio: 'This is a test bio for the mock user',
  height: '180',
  location: {
    city: 'New York',
    country: 'USA',
    latitude: 40.7128,
    longitude: -74.0060,
  },
  interests: [
    {
      id: '1',
      name: 'Travel',
    },
    {
      id: '2',
      name: 'Music',
    },
    {
      id: '3',
      name: 'Sports',
    },
  ],
  smoke: {
    id: '1',
    name: 'Non-smoker',
  },
  alcohol: {
    id: '1',
    name: 'Social drinker',
  },
  work: {
    name: 'Software Engineer',
    description: 'Building mobile apps',
  },
  languges: [
    {
      id: '1',
      name: 'English',
    },
    {
      id: '2',
      name: 'Spanish',
    },
  ],
  socialNickname: {
    instagram: 'johndoe',
  },
  notificationSettings: {
    newMatches: true,
    messages: true,
    eventReminders: true,
  },
  joinEvents: 5,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  phoneNumber: '+1234567890',
};

export const mockGuestUserInfo = {
  ...mockUserInfo,
  uid: 'test-guest-123',
  name: 'Jane Smith',
  accountType: 'guest',
  gender: 'woman',
  photos: [
    {
      id: '1',
      url: 'https://example.com/guest-photo1.jpg',
    },
    {
      id: '2',
      url: 'https://example.com/guest-photo2.jpg',
    },
  ],
  bio: 'Guest user bio for testing',
};

export const mockHostUserInfo = {
  ...mockUserInfo,
  accountType: 'host',
};

export const mockUnverifiedUserInfo = {
  ...mockUserInfo,
  uid: 'unverified-user-123',
  accountConfirmed: false,
  accountReviewed: false,
};

export const mockPremiumUserInfo = {
  ...mockUserInfo,
  uid: 'premium-user-123',
  accountPremium: true,
};
