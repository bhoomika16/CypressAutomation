import signInPage from '../Locators/signIn';
import homePage from '../Locators/home';
import settingsPage from '../Locators/settings';
import { generateRandomUserName } from '../util/utility';

describe('My first test suite', function () {
    beforeEach(() => {
        cy.visit("/login");
        cy.createUser().as('userCredential').then(userCredentials => {
            cy.login(userCredentials.email, userCredentials.password);
            cy.get(settingsPage.settingsLink).click();
        });
        cy.fixture("testData").as("testData");
    })

    it('Verify that all the fields are present in the settings page', function () {
        cy.get(settingsPage.profilePictureUrl).should('be.visible');
        cy.get(settingsPage.userName).should('be.visible');
        cy.get(settingsPage.bio).should('be.visible');
        cy.get(settingsPage.email).should('be.visible');
        cy.get(settingsPage.newPassword).should('be.visible');
        cy.get(settingsPage.updateSettings).should('be.visible');
        cy.get(settingsPage.logoutButton).should('be.visible');
    })

    it('Verify that the user is able to update the username field from the settings page', function () {
        const newUsername = generateRandomUserName();
        cy.updateInfo(settingsPage.userName, newUsername);
        cy.url().should('include', newUsername);
    })

    it('Verify that the user is able to update the emailid field from the settings page', function () {
        const newUsername = generateRandomUserName();
        const newEmailid = `${newUsername}@testuser.com`;
        cy.updateInfo(settingsPage.email, newEmailid); 
        cy.url().should('include', this.userCredential.username)
        cy.logout();
        cy.login(newEmailid, this.userCredential.password);
        cy.get(homePage.userName).contains(this.userCredential.username);
    })

    it('Verify that the user is able to update the bio field from the settings page', function () {
       
        cy.intercept('PUT', 'https://conduit.productionready.io/api/user').as('updateDetailsCall');
        cy.updateInfo(settingsPage.bio, 'updated bio');
        cy.url().should('include', this.userCredential.username);
        cy.wait('@updateDetailsCall').then(interception => {
            expect(interception.response.statusCode).to.equal(200);
            expect(interception.response.body.user.bio).to.equal('updated bio');
        })
    })

    it('Verify that the user is able to update the password field from the settings page', function () {
        cy.updateInfo(settingsPage.newPassword, 'July@2020');
        cy.url().should('include', this.userCredential.username);
        cy.logout();
        cy.login(this.userCredential.email, 'July@2020');
        cy.get(homePage.userName).contains(this.userCredential.username);
    })

    it('Verify that the user is able to update the profile pic from the settings page', function () {
        cy.updateInfo(settingsPage.profilePictureUrl, 'https://randomuser.me/api/portraits/women/36.jpg');
        cy.url().should('include', this.userCredential.username);
        cy.get(homePage.profilrPic).should('have.attr', 'src', 'https://randomuser.me/api/portraits/women/36.jpg');
    })

    it('Verify the validation message when the email id field is updated with an existing email id', function () {
        const existingEmail = this.testData.validUser.email;
        cy.updateInfo(settingsPage.email, existingEmail);
        cy.get(signInPage.errorMessage).contains('email has already been taken');
    })

    it('Verify the validation message when the email id field is updated with a blank email id', function () {
        cy.updateInfo(settingsPage.email, '');
        cy.get(signInPage.errorMessage).contains('email can\'t be blank');
    })

    it('Verify the validation message when the username field is updated with an existing username', function () {
        const existingUsername = this.testData.validUser.username;
        cy.updateInfo(settingsPage.userName, existingUsername);
        cy.get(signInPage.errorMessage).contains('username has already been taken');
    })

    it('Verify the validation message when the username field is updated with a blank username', function () {
        cy.updateInfo(settingsPage.userName, '');
        cy.get(signInPage.errorMessage).contains('username can\'t be blank');
        cy.get(signInPage.errorMessage).contains('username is too short (minimum is 1 character)');
    })

    it('Verify the validation message when the password field is updated with an invalid password', function () {
        const invalidPassword = 'pass';
        cy.updateInfo(settingsPage.newPassword, invalidPassword);
        cy.get(signInPage.errorMessage).contains('password is too short (minimum is 8 characters)');
    })
})