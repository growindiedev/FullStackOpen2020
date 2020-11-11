const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const { deleteOne } = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const initialBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
  })


describe('when there are some blogs save initially', () => {

  

test('blogs are returned as json',
    async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }
)


test('blogs should contain id property (not _id)', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })


 
  


})

describe('addition of new blog', () => {
  let token = null

  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'jane', passwordHash })

    await user.save()

    // Login user to get token
    const response = await api
      .post('/api/login')
      .send({ username: 'jane', password: 'password' })
        
      token = response.body.token
    

  })

  test('a valid blog can be added',
    async () => {
        const newBlog = {
            title: "goosebumps",
            author: "R.L Stine",
            likes: 200,
            url: "https://en.wikipedia.org/wiki/R._L._Stine"
        }
     
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)    
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain("goosebumps")
    }
)

test('a valid blog with likes can be added',
    async () => {
        const newBlog = {
            title: "Principles",
            author: "Ray Dalio",
            url: "principles.com"
        }
    
        

    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)    
        
     const response = await api.get('/api/blogs')
    expect(response.body[initialBlogs.length].likes).toBe(0)
    
    })

    test('a blog without url and title would not be added', 
    async () => {

const newBlog = {
  
  likes: 84787
}

await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
     
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)


})

test('unauthorized user cannot create a blog',
    async () => {
        const newBlog = {
            title: "goosebumps",
            author: "R.L Stine",
            likes: 200,
            url: "https://en.wikipedia.org/wiki/R._L._Stine"
        }

    token = null;
     
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)    
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(initialBlogs.length)
    
    }
)



  

})

  


describe('deletion of blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'jane', passwordHash })

    await user.save()

    // Login user to get token
    await api
      .post('/api/login')
      .send({ username: 'jane', password: 'password' })
      .then((res) => {
        return (token = res.body.token)
      })

    const newBlog = {
      title: 'Another blog',
      author: 'Jane Doe',
      url: 'http://dummyurl.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    return token
  })

  test('succeeds with status 402 if id is valid', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({}).populate('user')

    expect(blogsAtStart).toHaveLength(1)
    expect(blogsAtEnd).toHaveLength(0)
    expect(blogsAtEnd).toEqual([])
  })

  test('fails when user is not authorized', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')

    const blogToDelete = blogsAtStart[0]

    token = null

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await Blog.find({}).populate('user')

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtStart).toEqual(blogsAtEnd)
  })
})






afterAll(() => {
    mongoose.connection.close()
    //done();
})