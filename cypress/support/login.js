//support command for login,kept for archiving purpose,login is currently being handled under Loginpage.js

Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})