// No es necesario importar estos elementos, Cypress los proporciona globalmente
// import { describe, it } from 'mocha'
// import { expect } from 'chai'
// import cy from 'cypress'

describe('UserPutController', () => {
  it('should create a user successfully', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    }

    cy.request('PUT', '/user/1', user).then(response => {
      expect(response.status).to.eq(201)
    })
  })

  it('should return an error for invalid input', () => {
    const invalidUser = {
      id: '1',
      name: '',
      email: 'invalid-email',
      password: 'short'
    }

    cy.request({
      method: 'PUT',
      url: '/user/1',
      body: invalidUser,
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(400)
    })
  })
})
