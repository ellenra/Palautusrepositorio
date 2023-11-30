describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ellen',
      username: 'ellenr',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ellenr')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Ellen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ellenr')
      cy.get('#password').type('wrongsalasana')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password!')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('ellenr')
        cy.get('#password').type('salasana')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.contains('new note').click()
        cy.get('#title').type('testiotsikko')
        cy.get('#author').type('testikirjoittaja')
        cy.get('#url').type('testiurl.com')
        cy.get('#newblog-button').click()
        cy.contains('testiotsikko')
      })

      it('A blog can be liked', function() {
        cy.contains('new note').click()
        cy.get('#title').type('testiotsikko')
        cy.get('#author').type('testikirjoittaja')
        cy.get('#url').type('testiurl.com')
        cy.get('#newblog-button').click()
        cy.contains('view').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
      })

      it('A blog can be deleted', function() {
        cy.contains('new note').click()
        cy.get('#title').type('testiotsikko')
        cy.get('#author').type('testikirjoittaja')
        cy.get('#url').type('testiurl.com')
        cy.get('#newblog-button').click()
        cy.contains('view').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
        cy.on('window:confirm', () => true);
        cy.contains('delete').click()
        cy.contains('testiotsikko').should('not.exist')
      })

      it('Delete button can only be seen by user who added the blog', function() {
        cy.contains('new note').click()
        cy.get('#title').type('testiotsikko')
        cy.get('#author').type('testikirjoittaja')
        cy.get('#url').type('testiurl.com')
        cy.get('#newblog-button').click()
        const user = {
          name: 'testi',
          username: 'test',
          password: 'testii'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.get('#logout-button').click()
        cy.get('#username').type('test')
        cy.get('#password').type('testii')
        cy.get('#login-button').click()
        cy.contains('testi logged in')
        cy.contains('view').click()
        cy.contains('delete').should('not.exist')
      })

      it('Blogs are sorted by likes', function() {
        cy.contains('new note').click()
        cy.get('#title').type('keskimmäinen')
        cy.get('#author').type('kolmas')
        cy.get('#url').type('kolmas.com')
        cy.get('#newblog-button').click()

        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.contains('new note').click()
        cy.get('#title').type('eitykätyin')
        cy.get('#author').type('tokabloggaaja')
        cy.get('#url').type('tokablogi.com')
        cy.get('#newblog-button').click()

        cy.contains('new note').click()
        cy.get('#title').type('tykätyin')
        cy.get('#author').type('testikirjoittaja')
        cy.get('#url').type('testiurl.com')
        cy.get('#newblog-button').click()

        cy.get('button:contains("view")').eq(2).click()
        cy.get('button:contains("like")').eq(2).click()
        cy.contains('1')
        cy.get('button:contains("like")').eq(1).click()
        cy.contains('2')
        cy.get('button:contains("like")').eq(0).click()

        cy.get('.blog').eq(0).should('contain', 'tykätyin')
        cy.get('.blog').eq(1).should('contain', 'keskimmäinen')
        cy.get('.blog').eq(2).should('contain', 'eitykätyin')

    })
  })
  })
})