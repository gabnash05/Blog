import { useState } from "react"


export default function Home() {

  const [author, setAuthor] = useState('kimgab');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user_id, setUser_Id] = useState('65db6d7c796a0a77db2dcd65');


  async function handleSubmit(e) {
    e.preventDefault();

    const blog = { author, title, content, user_id }

    const response = await fetch('http://localhost:4500/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRjYTc5ZDM5YTQwMzZkMTg3Y2UwZjkiLCJpYXQiOjE3MDg5NjEzMzMsImV4cCI6MTcwOTIyMDUzM30.JPAfAefwJx5FwuvBxELaR4Zd4X2Oybe21upISKHhQWk`
      }
    })

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      setTitle('');
      setContent('');

      console.log("New blog added", json);
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Post New Blog</h3>

        <label>Title</label>
        <input 
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
        />

        <label>Content</label>
        <input 
          type="text"
          onChange={e => setContent(e.target.value)}
          value={content}
        />

        <button>Post</button>
      </form>
    </div>
  )
}