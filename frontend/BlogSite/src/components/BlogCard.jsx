import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useEffect, useState } from "react";

export default function BlogCard({ card }) {

  const [date, setDate ] = useState(null);

  const navigate = useNavigate();


  //select one blog
  function handleSelectBlog() {
    navigate(`/blogs/${card._id}`);
  }

  //Date
  useEffect(() => {
    if(card.createdAt) {
      setDate(formatDistanceToNow(new Date(card.createdAt), { addSuffix: true }));
    }
  }, [card.createdAt])


  return (
    <div className="blog-card" onClick={() => handleSelectBlog()}>

      <img src={`http://localhost:4500/blogImages/${card.img}`} className="blog-image" />

      <div className="blog-title">
        <p>{card.title}</p>
      </div>

      <div className="blog-desc">
        <p>{card.desc}</p>
      </div>

      <div className="blog-date">
        <p>{date}</p>
      </div>
      
    </div>
  )
}