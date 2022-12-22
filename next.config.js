module.exports = {
  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty',
  //       module: 'empty',
  //     }
  //   }

  //   return config
  // }
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(glsl|frag)$/i,
      loader: "raw-loader",
    });

    // Important: return the modified config
    return config;
  },
}