const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: {sourceExts, assetExts},
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: {
      'rn-tinder-card-bn-digital': path.resolve(__dirname, 'rn-tinder-card')
    },
  },
  watchFolders: ['./rn-tinder-card'],
};

module.exports = mergeConfig(defaultConfig, config);
