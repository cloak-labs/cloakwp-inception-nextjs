const { setCloakConfig, createWPInstance } = require('cloakwp');

module.exports = setCloakConfig({
  wpInstances: [
    createWPInstance({
      url: process.env.NEXT_PUBLIC_WP_URL,
      jwt: process.env.WP_JWT,
      adminPath: 'wp/wp-admin',
      contentPath: 'app',
    }),
  ],
});
