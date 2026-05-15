[![Cypress E2E Tests](https://github.com/HuyLeTrong/cypress-saucedemo/actions/workflows/saucedemo-cypress.yaml/badge.svg)](https://github.com/HuyLeTrong/cypress-saucedemo/actions/workflows/saucedemo-cypress.yaml)

### SauceDemo Cypress testing
SauceDemo is a deliberately buggy demo e-commerce site by Sauce Labs, designed for testing practice — it includes users with built-in defects like session locking, performance degradation, and visual bugs, making it ideal for demonstrating different types of test scenarios.

This is a sample project for automated E2E testing of the SauceDemo website using Cypress
For this test project cypress.env.json is intentionally committed for demo purposes only. The file contains working credentials and can be used directly to run the tests. In a production project, this file should be listed in .gitignore in order to keep login credentials private. 

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation
npm install

### Running Tests
- Navigate to the project root in your terminal
- run npx cypress open for UI mode
- run npx cypress run for headless mode

## Test Scenarios Covered

### Login Tests (login.cy.js)
- Page load verification
- Successful login with valid credentials
- Empty username/password error handling
- Invalid credentials error handling
- Locked out user handling
- Performance glitch user timing assertion
- Visual defect detection via visual_user

### E2E Order Flow (e2epurchase.cy.js)
- Complete purchase journey from login to logout
- Cart item verification
- Checkout form submission
- Order confirmation
- Session logout verification

### E2E Negative Flow (e2enegative.cy.js)
- Checkout form negative case testing
- Session logout verification
- Verifies automatic redirection to login page when trying to access page that can only be viewed after logging in.
