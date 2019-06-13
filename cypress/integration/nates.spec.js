/// <reference types="Cypress" />

context('Nates 5 E2E tests.', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/#/dashboard')
    })
    it('Open Advanced Search', () => {
        cy.get('.adv-search-toggle').click()
    })
    it('Open burgerMenu', () => {
        cy.get('.bm-toggle').click()
    })
    it('Navigate to Picklist', () => {
        cy.get('.picklist-div').click()
    })
    it('Use keyword search', () => {
        cy.get('.keyword-search-input').type('sample')
    })
    it('Navigate from homepage to register and back', () => {
      cy.visit('http://localhost:3000/#/')
      cy.get('.loginRegister').click()
    })
})