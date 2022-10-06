// LostStolenManagerTest.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Visiting Lost Stolen Manager Page', () => {
    it('visits', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input:first').type('jackyadmin@gmail.com')
        cy.get('input').eq(1).type('admin123')
        cy.get('button').contains(/^Admin Login$/).click()
        cy.contains('Lost/Stolen Manager').click()
        cy.get('select').select('123456')
        cy.get('button').contains(/^Lost Stolen$/).click()
        cy.wait(5000)
        cy.contains('Successfully Tagged')  
    })
  })