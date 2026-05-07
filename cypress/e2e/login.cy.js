describe('Saucedemo Login', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should load the login page', () => {
        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')
    })
  
    it('saucedemo-login-test', () => {
        cy.get('[data-test="username"]').click();
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').click();
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/inventory.html')
    })

    it('saucedemo-empty-username', () => {
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')
    })

    it('saucedemo-empty-password', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required')
    })

    it('saucedemo-invalid-username', () => {
        cy.get('[data-test="username"]').type('invalid_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('saucedemo-invalid-password', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('invalid_password');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('saucedemo-locked-out-user', () => {
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('saucedemo-performance-glitch-user', () => {
        const startTime = Date.now()
        cy.get('[data-test="username"]').type('performance_glitch_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/inventory.html').then(() => {
            const duration = Date.now() - startTime
            cy.log(`Glitch user login: ${duration}ms`)
            // Assert it completes but takes longer than standard
            expect(duration).to.be.greaterThan(3000)
            expect(duration).to.be.lessThan(15000) // test to confirm performance glitch exist as designed
        })
    })

    it('saucedemo-verify-specific-item-details', () => {
    const src1 = '/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg';
    cy.get('[data-test="username"]').click();
    cy.get('[data-test="username"]').type('visual_user');
    cy.get('[data-test="password"]').click();
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.contains('.inventory_item', 'Sauce Labs Backpack')
        .within(() => {
            // Check name
            cy.get('.inventory_item_name')
                .should('have.text', 'Sauce Labs Backpack')
            
            // Check price, $29.99 is the correct price, so we check not equal to confirm price is wrong
            cy.get('.inventory_item_price').then(($price) => {
                const priceText = $price.text().trim();
                expect(priceText).to.not.equal('$29.99')
            })


            // Check image has correct src
            cy.get('.inventory_item_img img').invoke('attr', 'src').then((nextSrc) => {
                expect(nextSrc).to.not.equal(src1)
            }) //src1 is the correct image, compare to not equal to confirm the image is wrong
        })
    });

    // it('saucedemo-verify-specific-item-details (wrong case for screenshot)', () => {
    // const src1 = '/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg';
    // cy.get('[data-test="username"]').click();
    // cy.get('[data-test="username"]').type('visual_user');
    // cy.get('[data-test="password"]').click();
    // cy.get('[data-test="password"]').type('secret_sauce');
    // cy.get('[data-test="login-button"]').click();
    // cy.contains('.inventory_item', 'Sauce Labs Backpack')
    //     .within(() => {
    //         // Check name
    //         cy.get('.inventory_item_name')
    //             .should('have.text', 'Sauce Labs Backpack')
            
    //         // Check price, $29.99 is the correct price, so we check not equal to confirm price is wrong
    //         cy.get('.inventory_item_price').then(($price) => {
    //             const priceText = $price.text().trim();
    //             expect(priceText).to.equal('$29.99')
    //         })


    //         // Check image has correct src
    //         cy.get('.inventory_item_img img').invoke('attr', 'src').then((nextSrc) => {
    //             expect(nextSrc).to.not.equal(src1)
    //         }) //src1 is the correct image, compare to not equal to confirm the image is wrong
    //     })
    // });
});

