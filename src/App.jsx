
import { useState } from 'react'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'My First Blog',
      category: 'Technology',
      content: 'Welcome to my blog application! Here I share ideas, experiences and knowledge.',
      author: 'Admin'
    },
    {
      id: 2,
      title: 'Why Learn Web Development?',
      category: 'Learning',
      content: 'Web development helps you build useful websites and create exciting projects.',
      author: 'Admin'
    }
  ])

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Technology')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')

  function addBlog(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('Please enter a title and blog content.')
      return
    }

    setBlogs([
      {
        id: Date.now(),
        title,
        category,
        content,
        author: 'You'
      },
      ...blogs
    ])

    setTitle('')
    setContent('')
  }

  function deleteBlog(id) {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const filteredBlogs = blogs.filter(blog =>
    (blog.title + ' ' + blog.category + ' ' + blog.content)
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#">BlogSpace<span>.</span></a>
        <a href="#write" className="nav-button">Write a Blog +</a>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">YOUR IDEAS, YOUR SPACE</p>
          <h1>Stories worth <span>sharing.</span></h1>
          <p className="subtitle">
            Discover ideas, share your experiences, and inspire others.
          </p>
          <a href="#blogs" className="explore">Explore Stories ↓</a>
        </section>

        <section id="write" className="write-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CREATE SOMETHING NEW</p>
              <h2>Write your story</h2>
            </div>
          </div>

          <form className="blog-form" onSubmit={addBlog}>
            <input
              type="text"
              placeholder="Give your blog a title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option>Technology</option>
              <option>Learning</option>
              <option>Lifestyle</option>
              <option>Travel</option>
              <option>Personal</option>
            </select>

            <textarea
              placeholder="Write your thoughts here..."
              rows="5"
              value={content}
              onChange={e => setContent(e.target.value)}
            />

            <button type="submit" className="publish">
              Publish Blog ↗
            </button>
          </form>
        </section>

        <section id="blogs" className="blogs-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE LATEST</p>
              <h2>Explore stories</h2>
            </div>
            <span className="count">{filteredBlogs.length} posts</span>
          </div>

          <input
            className="search"
            type="search"
            placeholder="Search blogs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="blog-grid">
            {filteredBlogs.map((blog, index) => (
              <article className="blog-card" key={blog.id}>
                <div className={`card-art art-${index % 3}`}>
                  <span>{blog.category}</span>
                  <span className="art-icon">✳</span>
                </div>
                <div className="card-body">
                  <p className="card-author">BY {blog.author.toUpperCase()}</p>
                  <h3>{blog.title}</h3>
                  <p className="card-content">{blog.content}</p>
                  <button
                    className="delete"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Delete post ×
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <p className="empty">No blogs found. Try another search!</p>
          )}
        </section>
      </main>

      <footer>
        <a className="logo" href="#">BlogSpace<span>.</span></a>
        <p>Share your thoughts. Inspire the world.</p>
        <p>© 2026 BlogSpace — Student Project</p>
      </footer>
    </div>
  )
}

export default App