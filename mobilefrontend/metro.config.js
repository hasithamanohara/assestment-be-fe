const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.entryFile = './App.tsx';

config.resolver.sourceExts.push('env', 'cjs');

module.exports = config;