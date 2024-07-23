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
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blocklist: null,
      allowlist: null,
      blacklist: null, // DEPRECATED
      whitelist: null, // DEPRECATED
      safe: false,
      allowUndefined: true,
      verbose: false
    }]
  ],
};
