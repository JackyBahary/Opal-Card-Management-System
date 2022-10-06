// LoginAccountTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Login Page', () => {
    it('visits', () => {
      cy.visit('http://localhost:3000/')
      cy.get('input:first').type('new@gmail.com')
      cy.get('input').eq(1).type('new123')
      cy.get('button').eq(0).click()
    })
  })