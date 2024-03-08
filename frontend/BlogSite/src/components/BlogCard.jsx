import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow"

export default function BlogCard({ card }) {

  const navigate = useNavigate();


  //select one blog
  function handleSelectBlog() {
    navigate(`/blogs/${card._id}`);
  }

  //Date
  const date = formatDistanceToNow(new Date(card.createdAt), { addSuffix: true});


  return (
    <div className="blog-card" onClick={() => handleSelectBlog()}>

      <img src={`${card.img}`} className="blog-image"/>

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