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
        cy.contains('Record Trip').click()
        cy.get('select').eq(0).select(3)
        cy.get('select').eq(1).select(0)
        cy.get('select').eq(2).select(2)
        cy.get('button').contains(/^Record$/).click()
        cy.wait(5000)
        cy.contains('Successfully Recorded')  
      
    })
  })