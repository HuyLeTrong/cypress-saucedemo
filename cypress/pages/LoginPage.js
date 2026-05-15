class LoginPage {
    visit() {
       return cy.visit('/')
    }

    enterUsername(username){
        return cy.get('input[data-test="username"]').type(username)
    }

    enterPassword(password){
        return cy.get('input[data-test="password"]').type(password)
    }

    clickLogin(){
        return cy.get('[data-test="login-button"]').click()
    }

    errorMessage(){
        return cy.get('[data-test="error"]')
    }

    verifyLoginPage(){
        cy.url().should('eq', Cypress.config().baseUrl + '/')
        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')
    }

    login(username, password){
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLogin()
    }
}

export default new LoginPage()
