const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// Force App.tsx as entry point
config.resolver.entryFile = './App.tsx';

// Add support for .env files
config.resolver.sourceExts.push('env', 'cjs');

module.exports = config;