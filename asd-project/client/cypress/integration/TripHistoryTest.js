// RecordTripTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Trip History Page', () => {
    it('visits', () => {
      cy.visit('http://localhost:3000/')
      cy.get('input:first').type('jacky@gmail.com')
      cy.get('input').eq(1).type('jacky123')
      cy.get('button:first').click()
      cy.contains('Trip History').click()
      cy.get('select').select('2173964')
      cy.contains('View History').click()
      cy.get('tbody').find('tr').its('length').should('be.gt', 0)
    })
  })