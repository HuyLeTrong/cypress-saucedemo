const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,  // explicit is better than relying on Cypress default (4000ms)
    retries: {
      runMode: 1,              // retry once on CI failure to reduce flakiness noise
      openMode: 0              // no retries when running locally
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
