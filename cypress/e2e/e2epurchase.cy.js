describe('Saucedemo E2E flow', () => {

    beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    })
  
    it('saucedemo-place-order', () => {

        cy.visit('/')
        //login
        cy.login(Cypress.env('username'), Cypress.env('password'))

        //add to cart and checkout
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

        // Fill in checkout form
        cy.get('[data-test="firstName"]', { timeout: 10000 }).type('Test')
        cy.get('[data-test="lastName"]').type('User')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="continue"]').click()

        //finish order
        cy.get('[data-test="finish"]', { timeout: 10000 }).click()

        //confirm user is on order confirmed page
        cy.url().should('eq', Cypress.config().baseUrl + '/checkout-complete.html')
        cy.get('[data-test="complete-header"]').should('have.text', "Thank you for your order!")
        cy.get('[data-test="complete-text"]').should('have.text', "Your order has been dispatched, and will arrive just as fast as the pony can get there!")

        //log out
        cy.get('[id="react-burger-menu-btn"]').click()
        cy.get('[data-test="logout-sidebar-link"]').click()

        //assert user are on login page after logout
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')
    })
})