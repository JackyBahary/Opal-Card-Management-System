// DeactivateCardTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Deactivate Card Page', () => {
    it('visits', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input:first').type('jackyadmin@gmail.com')
        cy.get('input').eq(1).type('admin123')
        cy.get('button').contains(/^Admin Login$/).click()
        cy.contains('Deactivate Card').click()
        cy.get('select').select('123456')
        cy.get('button').contains(/^Deactivate$/).click()
        cy.wait(5000)
        cy.contains('Successfully Deactivated')  
    })
  })