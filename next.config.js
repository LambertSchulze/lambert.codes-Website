const basePath = process.env.NODE_ENV === 'production' ? '/lambert.codes-Website' : '';

module.exports = {
  basePath,
  assetPrefix: `${basePath}/`
};
