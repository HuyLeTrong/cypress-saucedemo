[![Cypress E2E Tests](https://github.com/HuyLeTrong/cypress-saucedemo/actions/workflows/saucedemo-cypress.yaml/badge.svg)](https://github.com/HuyLeTrong/cypress-saucedemo/actions/workflows/saucedemo-cypress.yaml)

### SauceDemo Cypress testing

This is a sample project for automation testing the SauceDemo website using Cypress

## Test Scenarios Covered

### Login Tests (login.cy.js)
- Page load verification
- Successful login with valid credentials
- Empty username/password error handling
- Invalid credentials error handling
- Locked out user handling
- Performance glitch user timing assertion
- Visual defect detection via visual_user

### E2E Order Flow (e2epurschase.cy.js)
- Complete purchase journey from login to logout
- Cart item verification
- Checkout form submission
- Order confirmation
- Session logout verification

### E2E Negative Flow (e2enegative.cy.js)
- Checkout form negative case testing
- Session logout verification
- Check auto redirect to login page when trying to access page that can only be viewed after logging in.
