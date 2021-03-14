import settingsPage from '../Locators/settings';

Cypress.Commands.add('updateInfo', (fieldToUpdate, value) => {
    value === '' ? cy.get(fieldToUpdate).clear() : cy.get(fieldToUpdate).clear().type(value);
    cy.get(settingsPage.updateSettings).click();
})