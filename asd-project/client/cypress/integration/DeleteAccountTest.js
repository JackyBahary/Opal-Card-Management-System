// DeleteAccountTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Your Account Page', () => {
    it('visits', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input:first').type('jacky@gmail.com')
        cy.get('input').eq(1).type('jacky123')
        cy.get('button:first').click()
        cy.contains('Your Account').click()
        cy.get('button').contains(/^Delete Account$/).click()
        cy.wait(5000)
        cy.contains('Successfully Deleted')  
    })
  })