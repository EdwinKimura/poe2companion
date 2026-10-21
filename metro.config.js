
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer/expo'
);

config.resolver.assetExts = [
  ...config.resolver.assetExts.filter(
    (ext) => ext !== 'svg' && ext !== 'json'
  ),
  'json',
];

config.resolver.sourceExts = [
  ...config.resolver.sourceExts.filter(
    (ext) => ext !== 'json'
  ),
  'svg',
];

module.exports = config;
