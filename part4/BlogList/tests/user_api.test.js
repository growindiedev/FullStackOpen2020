const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')





describe('whent there is only one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await User.find({})
    
        const newUser = {
            username: 'Abhishek',
            name: 'Abhishek Ranjan',
            password: 'laden',
          }
        
        await api
          .post('/api/users')
          .send(newUser)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
          const usersAtEnd = await User.find({})
          expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

          const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)


    
    
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await User.find({})
    
        const newUser = {
            username: 'root',
            name: 'Abhishek Ranjan',
            password: 'laden',
          }
        
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
          
          expect(result.body.error).toContain('`username` to be unique')
          const usersAtEnd = await User.find({})
          expect(usersAtEnd).toHaveLength(usersAtStart.length)

          
    
    
    })

    
})

