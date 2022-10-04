// RecordTripTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Record Trips Page', () => {
    it('visits', () => {
      cy.visit('http://localhost:3000/')
      cy.get('input:first').type('jacky@gmail.com')
      cy.get('input').eq(1).type('jacky123')
      cy.get('button:first').click()
      cy.contains('Trip History').click()
      cy.get('select').select(2)
      cy.contains('View History').click()
      cy.get('tbody').find('tr').should('have.length', 8)
    })
  })