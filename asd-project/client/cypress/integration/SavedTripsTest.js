// SavedTripsTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Saved Trips Page', () => {
    it('visits', () => {
      cy.visit('http://localhost:3000/')
      cy.get('input:first').type('jacky@gmail.com')
      cy.get('input').eq(1).type('jacky123')
      cy.get('button:first').click()
      cy.contains('Saved Trips').click()
      cy.get('select').select('123456')
      cy.contains('View Saved Trip').click()
      cy.get('tbody').find('tr').its('length').should('be.gt', 0)
    })
  })