module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest/jest.setup.ts', './node_modules/react-native-gesture-handler/jestSetup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.svg$': './jest/jest-svg-transformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native-reanimated|react-native-svg|@react-native|react-native|@react-navigation|react-native-gesture-handler|react-native-linear-gradient|@bang88/react-native-ultimate-listview|@rneui/themed|@rneui/base)|@react-native-firebase/analytics/)',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
