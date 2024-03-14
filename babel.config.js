module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          screens: './src/screens',
          assets: './src/assets',
          navigator: './src/navigator',
          constants: './src/constants',
          typescript: './src/typescript',
          components: './src/components',
          hooks: './src/hooks',
          helpers: './src/helpers',
          api: './src/api',
          contexts: './src/contexts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
