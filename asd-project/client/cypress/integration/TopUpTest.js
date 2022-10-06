// TopUpTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Top Up Page', () => {
    it('visits', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input:first').type('jacky@gmail.com')
        cy.get('input').eq(1).type('jacky123')
        cy.get('button:first').click()
        cy.contains('Top Up').click()
        cy.get('input').type(10)
        cy.get('button').contains(/^Top Up$/).click()
        cy.wait(5000)
        cy.contains('Successfully Topped Up')  
    })
  })