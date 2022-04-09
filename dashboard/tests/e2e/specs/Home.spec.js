const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Home', () => {
    it('should render create account modal whe clicking on cta create account button', () => {
        cy.visit(APP_URL)

        cy.get('#cta-create-account-button').click()

        cy.get('#modal-create-account')
    })

    it('should render create account modal whe clicking on header create account button', () => {
        cy.visit(APP_URL)

        cy.get('#header-create-account-button').click()

        cy.get('#modal-create-account')
    })

    it('should render login modal whe clicking on header login button', () => {
        cy.visit(APP_URL)

        cy.get('#header-login-button').click()

        cy.get('#modal-login')
    })

    it('should login with an email and password', () => {

        cy.visit(APP_URL)

        cy.get('#header-login-button').click()

        cy.get('#modal-login')

        cy.get('#email-field').type('isadora@gmail.com')
        cy.get('#password-field').type('567015')
        cy.get('#submit-button').click()

        cy.url().should('include', '/feedbacks')

    })

    it('should show error with an invalid email', () => {

        cy.visit(APP_URL)

        cy.get('#header-login-button').click()

        cy.get('#modal-login')

        cy.get('#email-field').type('testezitoisagameplaysgmail.com')
        cy.get('#password-field').type('123456')
        cy.get('#submit-button').click()

        cy.get('#email-error')
    })

    it('should show error with an invalid password', () => {

        cy.visit(APP_URL)

        cy.get('#header-login-button').click()

        cy.get('#modal-login')

        cy.get('#email-field').type('testezitoisagameplays@email.com')
        cy.get('#password-field').type('11')
        cy.get('#submit-button').click()

        cy.get('#password-error')
    })

    it('should logout correctly', () => {

        cy.visit(APP_URL)

        cy.get('#header-login-button').click()

        cy.get('#modal-login')

        cy.get('#email-field').type('isadora@gmail.com')
        cy.get('#password-field').type('567015')
        cy.get('#submit-button').click()

        cy.url().should('include', '/feedbacks')
        
        cy.get('#logout-button').click()
        
        cy.url().should('include', '/')

    })


})