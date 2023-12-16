// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

// initialize configuration
const config = getDefaultConfig(__dirname);
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;