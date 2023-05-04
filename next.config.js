module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(glsl|frag)$/i,
      loader: "raw-loader",
    });
    return config;
  },
}