import signInPage from '../Locators/signIn';
import homePage from '../Locators/home';
import settingsPage from '../Locators/settings'

Cypress.Commands.add('login', (email, password) => {
    cy.url().then(url => {
        if (!url.includes('/login')) {
            cy.get(homePage.signInLink).click();
        }
    })
    cy.get(signInPage.emailField).type(email);
    cy.get(signInPage.passWordField).type(password);
    cy.get(signInPage.signInButton).click();
})

Cypress.Commands.add('logout', () => {
    cy.url().then(url => {
        if (!url.includes('/settings')) {
            cy.get(settingsPage.settingsLink).click();
        }
    })
    cy.get(settingsPage.logoutButton).click();
})