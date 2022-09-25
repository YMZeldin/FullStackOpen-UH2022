describe('Blog app', function() {
  
  // clear test database =======================================================
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // add test user
    const user = {
      name: 'Yury Zeldin',
      username: 'ymzeldin',
      password: 'YMZeldin_Passw'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  // ===========================================================================
  it('front page can be opened', function() {
    cy.contains('blog list')
    cy.contains('login, please')
  })

  // ===========================================================================
  it('login form is shown', function() {
    cy.contains('login, please').click()

    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login', function() {
    
    it('succeeds with correct credentials', function() {
      cy.contains('login, please').click()
      cy.get('#username').type('ymzeldin')
      cy.get('#password').type('YMZeldin_Passw')
      cy.get('#login-button').click()
  
      cy.contains('Yury Zeldin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login, please').click()
      cy.get('#username').type('ymzeldin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      // component with CSS class 'error'
      // cy.get('.error').contains('Login error: wrong credentials')
      cy.get('#notification')
        .should('contain', 'Login error: wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
  
      // cy.get('html') accesses the whole visible content of the application
      cy.get('html').should('not.contain', 'Yury Zeldin logged in')
    })
  })

  describe('when logged in', function() {
    
    beforeEach(function() {
      // login bypassing UI, using cypress custom commands cypress/support/commands.js
      cy.login({ username: 'ymzeldin', password: 'YMZeldin_Passw' })
    })

    it('new blog can be created', function() {
      cy.get('button[id="create new blog"]').click()
      cy.get('#title').type('new blog created for test')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://www.cypress,io')

      cy.get('#create').click()
      cy.contains('new blog created for test by cypress')
    })
  })

})