describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
          name: 'Hugh Jackman',
          username: 'alex',
          password: 'gretchen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      const user1 = {
            name: 'Kamla Harris',
            username: 'Kamla',
            password: 'Harris'
          }
      cy.request('POST', 'http://localhost:3003/api/users/', user1) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.get("input[name='Username']")
        cy.get("input[name='Password']")
    })

    describe('Login', function() {
      it('A blog succeeds with correct credentials', function() {
        cy.get("input[name='Username']").type('Kamla')
        cy.get("input[name='Password']").type('Harris')
        cy.contains('Submit').click()
        cy.contains('Kamla logged in')
      })

      it('fails with wrong credentials', function() {
        cy.get("input[name='Username']").type('Joe')
        cy.get("input[name='Password']").type('Biden')
        cy.contains('Submit').click()
        cy.contains('wrong user name or password')
        .should('have.class', 'error')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
       cy.login({username: 'Kamla', password: 'Harris'})
      })
  
      it('A blog can be created', function() {
        cy.contains('create blog', { timeout: 10000 }).click()
        cy.get("input[name='title']").type('Steve Jobs')
        cy.get("input[name='author']").type('Walter Issiacson')
        cy.get("input[name='url']").type('apple.com')
        cy.get('.submit').click()
        cy.contains('a new blog Steve Jobs by Walter Issiacson added')

      })

    describe('blog already exists', function() {
        beforeEach(function() {
          cy.login({username: 'Kamla', password: 'Harris'})
          cy.createBlog({title: 'The hunger games', author: 'Suzanne Collins', url: 'https://en.wikipedia.org/wiki/The_Hunger_Games'})
          cy.createBlog({title: 'Harry Potter', author: 'JK Rowling', url: 'harrypotter.com'})
        })
        it('A blog can be liked', function() {
          cy.contains('view').click()
          cy.contains('Like+').click()
          cy.contains('1')
          cy.contains('hide').click()
        })

        it('A blog can be deleted by the user who created it', function() {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.contains('The hunger games Suzane Collins').should('not.exist')
        })
      })

      describe('and multiple blogs exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Cypress creating a new blog',
            author: 'Cypress',
            url: 'https://www.cypress.io/',
            likes: 15,
          })
          cy.createBlog({
            title: 'Second blog created',
            author: 'Cypress',
            url: 'https://www.cypress.io/',
            likes: 0,
          })
          cy.createBlog({
            title: 'Third blog created',
            author: 'Cypress',
            url: 'https://www.cypress.io/',
            likes: 2,
          })
        })
  
        it('Blogs are ordered based on number of likes, in descending order (from most likes till least likes)', function () {
          cy.get('.Blog').then(($blog) => {
            expect($blog).to.have.length(3)
  
            for (let i = 0; i < $blog.length; i++) {
              // Check if the number of likes of current blog is higher than or equal to that of next blog
              if (i < $blog.length - 1) {
                expect(
                  Number($blog.find('[data-cy="likes"]')[i].innerText),
                ).to.be.least(
                  Number($blog.find('[data-cy="likes"]')[i + 1].innerText),
                )
                // Check if number of likes of last blog is lower than or equal to that of first blog
              } else {
                expect(
                  Number($blog.find('[data-cy="likes"]')[i].innerText),
                ).to.be.most(Number($blog.find('[data-cy="likes"]')[0].innerText))
              }
            }
          })
        })
      })

    

    })


})

  