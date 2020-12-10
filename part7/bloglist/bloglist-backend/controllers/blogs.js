const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    
        response.json(blogs)
      //  logger.info(blogs)
      
  })
  
blogsRouter.post('/', async (request, response) => {
    const body =  request.body
    const decodedTokenUser = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedTokenUser.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedTokenUser.id)

    
    const blog = new Blog({
      
        likes: body.likes,
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id
    
    })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog.id)
     await user.save()

      console.log(savedBlog)
      response.status(201).json(savedBlog.toJSON())
      logger.info(savedBlog.toJSON())
      
  })



blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // check for valid token
  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)

  const user = await User.findById(decodedToken.id)
  console.log(blog)
  console.log(user)
  // Check if creator of blog is user trying to delete it.
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'You are not authorized to delete this blog' })
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }  

  const updatedPerson = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedPerson)

})


  module.exports = blogsRouter;