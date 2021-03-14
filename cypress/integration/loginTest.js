import signInPage from '../Locators/signIn';
import homePage from '../Locators/home';

describe('My first test suite', function () {

    beforeEach(() => {
        cy.visit("");
        cy.fixture("testData").as("testData");
    })

    it('Verify login functionality with valid user credentials', function () {
        cy.login(this.testData.validUser.email, this.testData.validUser.password);
        cy.get(homePage.userName).contains('bolia15');
    })

    it('Verify the error message when user tries to login with invalid credentials', function () {
        cy.login(this.testData.validUser.email, 'Dec@2015');
        cy.get(signInPage.errorMessage).contains('email or password is invalid');
    })
})