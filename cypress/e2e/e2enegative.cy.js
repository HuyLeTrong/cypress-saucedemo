describe('Saucedemo E2E flow', () => {
  
    it('saucedemo-place-order', () => {

        cy.visit('/')
        //login
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('eq', Cypress.config().baseUrl + '/inventory.html')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]', { timeout: 10000 }).click()
        cy.get('[data-test="shopping-cart-link"]').click()

        //confirm item in checkout
        cy.contains('[data-test="inventory-item"]', 'Sauce Labs Backpack')
            .within(() => {
                cy.get('[data-test="item-quantity"]').should('have.text', '1')
                cy.get('[data-test="inventory-item-name"]')
                    .should('have.text', 'Sauce Labs Backpack')
                cy.get('[data-test="inventory-item-price"]')
                    .should('have.text', '$29.99')
            })
        cy.get('[data-test="checkout"]').click();

        // assert error messages when checkout with empty fields
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required')
        cy.get('[data-test="firstName"]').type('Test')

        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('have.text', 'Error: Last Name is required')
        cy.get('[data-test="lastName"]').type('User')

        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="error"]').should('have.text', 'Error: Postal Code is required')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()

        //cancel order at confirm page
        cy.get('[data-test="cancel"]').click()

        //log out
        cy.get('[id="react-burger-menu-btn"]').click()
        cy.get('[data-test="logout-sidebar-link"]').click()

        //assert user are on login page after logout
        cy.url().should('eq', Cypress.config().baseUrl + '/')

         //Press back to go back to inventory page after logout, should be redirected to login page with error message
        cy.go('back')
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: You can only access \'/inventory.html\' when you are logged in.')

         //Press back to go back to checkout/cart, should be redirected to login page with error message
        cy.go('back')
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: You can only access \'/checkout-step-two.html\' when you are logged in.')

        cy.go('back')
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: You can only access \'/checkout-step-one.html\' when you are logged in.')

        cy.go('back')
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: You can only access \'/cart.html\' when you are logged in.')
    })
})