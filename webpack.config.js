const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
    process: require.resolve('process/browser'),
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
  };

  // Needed for some packages that expect `process` and `Buffer` to be global
  config.plugins = config.plugins || [];
  const webpack = require('webpack');
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
