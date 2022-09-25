describe('Blog app', function() {
  
  // clear test database =======================================================
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // add test user
    cy.addUser({
      name: 'Yury Zeldin', 
      username: 'ymzeldin', 
      password: 'YMZeldin_Passw' })
    
    cy.addUser({
      name: 'Matti Luukkainen', 
      username: 'mluukkai', 
      password: 'MLuukkai_Passw' })

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
      cy.get('#url').type('https://www.cypress.io')

      cy.get('#create').click()
      cy.contains('new blog created for test by cypress')

      cy.get('#notification')
        .should('contain', 'new blog created for test was added to blog list')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
 
    it('like blog by user who create it', function() {
      cy.createBlog({
        title: 'new blog created for test',
        author: 'cypress',
        url: 'https://www.cypress.io'
      })
      cy.contains('new blog created for test').parent().find('button').as('viewButton')
      cy.get('@viewButton').click()
      cy.get('@viewButton').should('contain', 'hide')

      cy.contains('new blog created for test').parent().find('button[id="like"]').as('likeButton')
      cy.get('@likeButton').click()

      cy.get('#notification')
        .should('contain', 'User who created blog cannot like it')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
    
    it('like blog by user who not create it', function() {
      cy.createBlog({
        title: 'new blog created for test',
        author: 'cypress',
        url: 'https://www.cypress.io'
      })
      
      // login as another user
      cy.contains('logout').click()
      cy.login({ username: 'mluukkai', password: 'MLuukkai_Passw' })

      // open blog details
      cy.contains('new blog created for test').parent().find('button').as('viewButton')
      cy.get('@viewButton').click()
      
      cy.contains('new blog created for test').parent().find('button[id="like"]').as('likeButton')
      cy.get('@likeButton').click()
      cy.contains('likes 1')
    })

    it('user who created blog can delete it', function() {
      // ymzeldin logged in
      cy.createBlog({
        title: 'new blog created for test',
        author: 'cypress',
        url: 'https://www.cypress1.io'
      })
      cy.contains('new blog created for test by cypress')
      // open blog details
      cy.contains('new blog created for test').parent().find('button').as('viewButton')
      cy.get('@viewButton').click()
      // component with CSS class '.actionButton'
      cy.get('.actionButton').should('contain', 'remove')
      cy.get('.actionButton').click()
      // check notification
      cy.get('#notification')
        .should('contain', 'new blog created for test was deleted from the database')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      // cy.get('html') accesses the whole visible content of the application
      cy.get('html').should('not.contain', 'new blog created for test by cypress')
    })

    it('user who not created blog cannot delete it', function() {
      // ymzeldin logged in
      cy.createBlog({
        title: 'new blog created for test',
        author: 'cypress',
        url: 'https://www.cypress1.io'
      })
      cy.contains('new blog created for test by cypress')
            
      // login as another user
      cy.contains('logout').click()
      cy.login({ username: 'mluukkai', password: 'MLuukkai_Passw' })
      // open blog details
      cy.contains('new blog created for test').parent().find('button').as('viewButton')
      cy.get('@viewButton').click()
      // no remove button on page
      cy.get('.actionButton').should('not.exist')
    })
   
    it('blogs are ordered according to likes', function() {
      // ymzeldin logged in
      cy.createBlog({
        title: 'new blog 1 created for test',
        author: 'cypress',
        url: 'https://www.cypress1.io'
      })
      cy.createBlog({
        title: 'new blog 2 created for test',
        author: 'cypress',
        url: 'https://www.cypress1.io'
      })
      cy.createBlog({
        title: 'new blog 3 created for test',
        author: 'cypress',
        url: 'https://www.cypress1.io'
      })
      
      // login as another user (to can like blogs)
      cy.contains('logout').click()
      cy.login({ username: 'mluukkai', password: 'MLuukkai_Passw' })
      // open blog details for blog 3
      cy.contains('new blog 3 created for test').parent().find('button').as('viewButton3')
      cy.get('@viewButton3').click()
      cy.contains('new blog 3 created for test').parent().find('button[id="like"]').as('likeButton3')
      cy.get('@likeButton3').click()
      // wait for changing the number of likes before next click
      cy.contains('likes 1')
      cy.get('@likeButton3').click()
      cy.contains('likes 2')
      // open blog details for blog 2
      cy.contains('new blog 2 created for test').parent().find('button').as('viewButton2')
      cy.get('@viewButton2').click()
      cy.contains('new blog 2 created for test').parent().find('button[id="like"]').as('likeButton2')
      cy.get('@likeButton2').click()
      // wait for changing the number of likes before next click
      cy.contains('likes 1')

      // check blogs order
      cy.get('[data-cy="blog"]').eq(0).should('contain', 'new blog 3 created for test')
      cy.get('[data-cy="blog"]').eq(1).should('contain', 'new blog 2 created for test')
      cy.get('[data-cy="blog"]').eq(2).should('contain', 'new blog 1 created for test')
    })
  })
})