import {ReactNode} from 'react';

jest.mock('react-native-gesture-handler', () => ({
  gestureHandlerRootHOC: jest.fn(component => component),
  GestureHandlerRootView: jest.fn(),
  ScrollView: jest.fn().mockImplementation(({children}) => children),
  GestureDetector: ({children}: {children: ReactNode}) => children,
  Gesture: {
    Pan: jest.fn(() => ({
      onBegin: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      runOnJS: jest.fn().mockReturnThis(),
    })),
  },
}));
