import { useEffect, useState } from "react"

import useAuthContext from "../hooks/useAuthContext";
import useBlogsContext from "../hooks/useBlogsContext";


export default function BlogForms({ onClose }) {

  const { user } = useAuthContext();
  const { dispatch } = useBlogsContext();

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setAuthor(user.userName);
  }, [author])
  
  //Submit form
  async function handleSubmit(e) {
    e.preventDefault();
    
    const blog = { author, title, desc, content };

    console.log(blog);

    const response = await fetch('http://localhost:4500/api/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);  
    }

    if (response.ok) {
      setTitle('');
      setContent('');
      setDesc('');

      dispatch({type: 'CREATE_BLOG', payload: json})

      console.log("New blog added", json);
    }

    onClose();
  }

  return (
    <div>
      <div className="blog-container">
        <form className='post-blog-form' onSubmit={handleSubmit}>
          <button className="close-form" onClick={() => onClose()}>X</button>

          <h3>Post New Blog</h3>
          <br></br>

          <div>
            <label>Title</label>
            <input 
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              className="desc-input"
              rows={4}
              onChange={e => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          
          <div>
            <label>Content</label>
            <textarea
              className="content-input"
              rows={12}
              onChange={e => setContent(e.target.value)}
              value={content}
            />
          </div>
          
          <div className="blogControls">
            <button>Post</button>
          </div>

        </form>
      </div>

    </div>
  )
}