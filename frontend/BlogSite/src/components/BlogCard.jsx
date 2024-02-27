

export default function BlogCard({ card }) {

  return (
    <div id={card.id} className="blog-card">

      <img src={`${card.url}`} className="blog-image"/>

      <div className="blog-title">
        <p>{card.title}</p>
      </div>

      <div className="blog-desc">
        <p>{card.desc}</p>
      </div>

      <div className="blog-date">
        <p>{card.date}</p>
      </div>
      
    </div>
  )
}