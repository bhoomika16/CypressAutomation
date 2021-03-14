import {generateRandomUserName} from '../util/utility'

Cypress.Commands.add('createUser', () => {
    const randomUserName = generateRandomUserName();
    const randomEmail = `${randomUserName}@testuser.com`
    const userCredentials = { "user": { "username": randomUserName, "email": randomEmail, "password": "password123" } }
    cy.request('POST', 'https://conduit.productionready.io/api/users', userCredentials).then(response => {
        expect(response.status).to.equal(200);
        return userCredentials.user;
    })
})


