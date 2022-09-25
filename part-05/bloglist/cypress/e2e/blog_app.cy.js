describe('Blog app', function() {
  
  // clear test database =======================================================
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  // ===========================================================================
  it('Login form is shown', function() {
    cy.contains('blog list')
    cy.contains('login, please')
  })
})