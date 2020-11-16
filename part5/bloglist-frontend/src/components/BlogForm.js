import React from 'react'

const BlogForm = ({render}) => {
    const {addBlog, newBlog, setNewBlog} = render
    return(
      <form onSubmit={addBlog}>
        <h2>Create Blog</h2>
        <div>
        title:
        <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={(event) => setNewBlog({...newBlog, title: event.target.value})}
        />
      </div>
      <div>
        author:
        <input
        type="text"
        value={newBlog.author}
        name="author"
        onChange={(event) => setNewBlog({...newBlog, author: event.target.value})}
        />
      </div>
      <div>
        url:
        <input
        type="text"
        value={newBlog.url}
        name="url"
        onChange={(event) => setNewBlog({...newBlog, url: event.target.value})}
        />
      </div>
      <button type="submit">create</button>
      </form>
    )
  }

export default BlogForm
